const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const Database = require('./models/database');
const { sampleQuestions, scoringCriteria } = require('../data/questions/sample_questions');
const AIGradingService = require('./utils/aiGrading');

const app = express();
const PORT = process.env.PORT || 3001;

// 初始化数据库和AI批改服务
const db = new Database();
const aiGrading = new AIGradingService();

// 中间件
app.use(helmet({
    contentSecurityPolicy: false // 允许内联脚本，用于开发环境
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use('/static', express.static(path.join(__dirname, '../frontend')));
app.use('/audio', express.static(path.join(__dirname, '../data/audio')));

// 初始化题库数据
async function initializeQuestions() {
    try {
        // 检查是否已有数据
        const existingListening = await db.query('SELECT COUNT(*) as count FROM listening_questions');
        if (existingListening[0].count === 0) {
            console.log('Initializing question database...');
            
            // 插入听力题目
            for (const q of sampleQuestions.listening) {
                await db.run(`
                    INSERT INTO listening_questions 
                    (id, section, question_number, question_type, question_text, audio_file, correct_answer, options, difficulty)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [q.id, q.section, q.question_number, q.question_type, q.question_text, q.audio_file, q.correct_answer, q.options, q.difficulty]);
            }

            // 插入阅读题目
            for (const q of sampleQuestions.reading) {
                await db.run(`
                    INSERT INTO reading_questions 
                    (id, passage_id, passage_title, passage_text, question_number, question_type, question_text, correct_answer, options, difficulty)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [q.id, q.passage_id, q.passage_title, q.passage_text, q.question_number, q.question_type, q.question_text, q.correct_answer, q.options, q.difficulty]);
            }

            // 插入写作题目
            for (const q of sampleQuestions.writing) {
                await db.run(`
                    INSERT INTO writing_questions 
                    (id, task_number, question_type, question_text, prompt_image, word_limit, time_limit, difficulty)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `, [q.id, q.task_number, q.question_type, q.question_text, q.prompt_image, q.word_limit, q.time_limit, q.difficulty]);
            }

            // 插入口语题目
            for (const q of sampleQuestions.speaking) {
                await db.run(`
                    INSERT INTO speaking_questions 
                    (id, part, question_type, question_text, follow_up_questions, difficulty)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [q.id, q.part, q.question_type, q.question_text, q.follow_up_questions, q.difficulty]);
            }

            console.log('Question database initialized successfully!');
        }
    } catch (error) {
        console.error('Error initializing questions:', error);
    }
}

// API 路由

// 获取考试题目
app.get('/api/test/:section', async (req, res) => {
    try {
        const { section } = req.params;
        let questions = [];

        switch (section) {
            case 'listening':
                questions = await db.query('SELECT * FROM listening_questions ORDER BY section, question_number');
                break;
            case 'reading':
                questions = await db.query('SELECT * FROM reading_questions ORDER BY passage_id, question_number');
                break;
            case 'writing':
                questions = await db.query('SELECT * FROM writing_questions ORDER BY task_number');
                break;
            case 'speaking':
                questions = await db.query('SELECT * FROM speaking_questions ORDER BY part');
                break;
            default:
                return res.status(400).json({ error: 'Invalid section' });
        }

        res.json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 创建考试会话
app.post('/api/test/session', async (req, res) => {
    try {
        const { testType = 'full', userId = 'anonymous' } = req.body;
        const sessionId = require('uuid').v4();

        await db.run(`
            INSERT INTO test_sessions (id, user_id, test_type, status)
            VALUES (?, ?, ?, 'in_progress')
        `, [sessionId, userId, testType]);

        res.json({ sessionId, message: 'Test session created successfully' });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create test session' });
    }
});

// 提交答案
app.post('/api/test/submit-answer', async (req, res) => {
    try {
        const { sessionId, questionId, questionType, userAnswer, timeSpent } = req.body;
        const answerId = require('uuid').v4();

        // 获取正确答案
        let correctAnswer = '';
        let question = null;

        switch (questionType.split('_')[0]) {
            case 'listening':
                question = await db.query('SELECT correct_answer FROM listening_questions WHERE id = ?', [questionId]);
                break;
            case 'reading':
                question = await db.query('SELECT correct_answer FROM reading_questions WHERE id = ?', [questionId]);
                break;
        }

        if (question && question.length > 0) {
            correctAnswer = question[0].correct_answer;
        }

        // 判断答案是否正确
        let isCorrect = false;
        let score = 0;

        if (questionType.includes('listening') || questionType.includes('reading')) {
            isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
            score = isCorrect ? 1 : 0;
        }

        // 保存用户答案
        await db.run(`
            INSERT INTO user_answers (id, session_id, question_id, question_type, user_answer, is_correct, score, time_spent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [answerId, sessionId, questionId, questionType, userAnswer, isCorrect, score, timeSpent]);

        res.json({ 
            success: true, 
            isCorrect,
            correctAnswer: isCorrect ? null : correctAnswer // 只在错误时返回正确答案
        });
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: 'Failed to submit answer' });
    }
});

// 完成考试并计算分数
app.post('/api/test/complete', async (req, res) => {
    try {
        const { sessionId } = req.body;

        // 计算听力和阅读分数
        const listeningAnswers = await db.query(`
            SELECT COUNT(*) as total, SUM(score) as correct 
            FROM user_answers 
            WHERE session_id = ? AND question_type LIKE 'listening%'
        `, [sessionId]);

        const readingAnswers = await db.query(`
            SELECT COUNT(*) as total, SUM(score) as correct 
            FROM user_answers 
            WHERE session_id = ? AND question_type LIKE 'reading%'
        `, [sessionId]);

        // 转换为IELTS分数
        const listeningScore = convertToIELTSScore('listening', listeningAnswers[0].correct || 0);
        const readingScore = convertToIELTSScore('reading', readingAnswers[0].correct || 0);

        // 写作和口语分数（暂时给予默认分数，实际应由AI批改）
        const writingScore = 6.5;
        const speakingScore = 6.5;

        // 计算总分
        const overallScore = ((listeningScore + readingScore + writingScore + speakingScore) / 4).toFixed(1);

        // 更新考试会话
        await db.run(`
            UPDATE test_sessions 
            SET status = 'completed', completed_at = CURRENT_TIMESTAMP,
                listening_score = ?, reading_score = ?, writing_score = ?, speaking_score = ?, overall_score = ?
            WHERE id = ?
        `, [listeningScore, readingScore, writingScore, speakingScore, overallScore, sessionId]);

        res.json({
            sessionId,
            scores: {
                listening: listeningScore,
                reading: readingScore,
                writing: writingScore,
                speaking: speakingScore,
                overall: parseFloat(overallScore)
            },
            message: 'Test completed successfully'
        });
    } catch (error) {
        console.error('Error completing test:', error);
        res.status(500).json({ error: 'Failed to complete test' });
    }
});

// 写作AI批改
app.post('/api/writing/grade', async (req, res) => {
    try {
        const { sessionId, taskNumber, essay, questionPrompt } = req.body;
        
        if (!essay || essay.trim().length === 0) {
            return res.status(400).json({ error: 'Essay content is required' });
        }
        
        // 使用AI批改服务
        const gradingResult = await aiGrading.gradeWritingTask(essay, taskNumber, questionPrompt);
        const feedbackId = require('uuid').v4();

        await db.run(`
            INSERT INTO writing_feedback 
            (id, session_id, task_number, user_essay, ai_feedback, task_achievement, coherence_cohesion, lexical_resource, grammar_accuracy, overall_score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            feedbackId, sessionId, taskNumber, essay, 
            JSON.stringify(gradingResult.feedback),
            gradingResult.scores.task_achievement,
            gradingResult.scores.coherence_cohesion,
            gradingResult.scores.lexical_resource,
            gradingResult.scores.grammar_accuracy,
            gradingResult.overallBand
        ]);

        res.json({
            feedback: gradingResult.feedback,
            scores: gradingResult.scores,
            overallBand: gradingResult.overallBand,
            analysis: gradingResult.analysis
        });
    } catch (error) {
        console.error('Error grading writing:', error);
        res.status(500).json({ error: 'Failed to grade writing' });
    }
});

// 获取考试结果
app.get('/api/test/results/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await db.query('SELECT * FROM test_sessions WHERE id = ?', [sessionId]);
        const answers = await db.query('SELECT * FROM user_answers WHERE session_id = ?', [sessionId]);
        const writingFeedback = await db.query('SELECT * FROM writing_feedback WHERE session_id = ?', [sessionId]);

        if (session.length === 0) {
            return res.status(404).json({ error: 'Test session not found' });
        }

        res.json({
            session: session[0],
            answers,
            writingFeedback
        });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

// 辅助函数
function convertToIELTSScore(section, correctAnswers) {
    const scoreTable = scoringCriteria.listening.scoreTable;
    if (section === 'reading') {
        return scoringCriteria.reading.academic[correctAnswers] || 0;
    }
    return scoreTable[correctAnswers] || 0;
}



// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 提供前端页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 启动服务器
async function startServer() {
    try {
        await initializeQuestions();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`IELTS Mock Test Server running on http://0.0.0.0:${PORT}`);
            console.log('Frontend available at: http://0.0.0.0:' + PORT);
            console.log('API endpoints available at: http://0.0.0.0:' + PORT + '/api');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// 优雅关闭
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    await db.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT, shutting down gracefully...');
    await db.close();
    process.exit(0);
});

startServer();