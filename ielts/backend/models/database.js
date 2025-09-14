const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, '../ielts_database.db'));
        this.init();
    }

    init() {
        // 用户表
        this.db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                password_hash TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 考试记录表
        this.db.run(`
            CREATE TABLE IF NOT EXISTS test_sessions (
                id TEXT PRIMARY KEY,
                user_id TEXT,
                test_type TEXT DEFAULT 'full', -- 'listening', 'reading', 'writing', 'speaking', 'full'
                status TEXT DEFAULT 'in_progress', -- 'completed', 'abandoned'
                started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                completed_at DATETIME,
                listening_score REAL,
                reading_score REAL,
                writing_score REAL,
                speaking_score REAL,
                overall_score REAL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        `);

        // 听力题库
        this.db.run(`
            CREATE TABLE IF NOT EXISTS listening_questions (
                id TEXT PRIMARY KEY,
                section INTEGER, -- 1-4
                question_number INTEGER,
                question_type TEXT, -- 'fill_blank', 'multiple_choice', 'matching', 'map_labeling'
                question_text TEXT,
                audio_file TEXT,
                correct_answer TEXT,
                options TEXT, -- JSON array for multiple choice
                difficulty TEXT DEFAULT 'medium'
            )
        `);

        // 阅读题库
        this.db.run(`
            CREATE TABLE IF NOT EXISTS reading_questions (
                id TEXT PRIMARY KEY,
                passage_id TEXT,
                passage_title TEXT,
                passage_text TEXT,
                question_number INTEGER,
                question_type TEXT, -- 'true_false_not_given', 'multiple_choice', 'matching', 'fill_blank'
                question_text TEXT,
                correct_answer TEXT,
                options TEXT, -- JSON array
                difficulty TEXT DEFAULT 'medium'
            )
        `);

        // 写作题库
        this.db.run(`
            CREATE TABLE IF NOT EXISTS writing_questions (
                id TEXT PRIMARY KEY,
                task_number INTEGER, -- 1 or 2
                question_type TEXT, -- 'chart_description', 'essay', 'letter'
                question_text TEXT,
                prompt_image TEXT,
                word_limit INTEGER,
                time_limit INTEGER, -- minutes
                difficulty TEXT DEFAULT 'medium'
            )
        `);

        // 口语题库
        this.db.run(`
            CREATE TABLE IF NOT EXISTS speaking_questions (
                id TEXT PRIMARY KEY,
                part INTEGER, -- 1, 2, 3
                question_type TEXT, -- 'personal_info', 'long_turn', 'discussion'
                question_text TEXT,
                follow_up_questions TEXT, -- JSON array
                difficulty TEXT DEFAULT 'medium'
            )
        `);

        // 用户答案记录
        this.db.run(`
            CREATE TABLE IF NOT EXISTS user_answers (
                id TEXT PRIMARY KEY,
                session_id TEXT,
                question_id TEXT,
                question_type TEXT,
                user_answer TEXT,
                is_correct BOOLEAN,
                score REAL,
                time_spent INTEGER, -- seconds
                FOREIGN KEY (session_id) REFERENCES test_sessions (id)
            )
        `);

        // 写作批改结果
        this.db.run(`
            CREATE TABLE IF NOT EXISTS writing_feedback (
                id TEXT PRIMARY KEY,
                session_id TEXT,
                task_number INTEGER,
                user_essay TEXT,
                ai_feedback TEXT,
                task_achievement REAL,
                coherence_cohesion REAL,
                lexical_resource REAL,
                grammar_accuracy REAL,
                overall_score REAL,
                FOREIGN KEY (session_id) REFERENCES test_sessions (id)
            )
        `);
    }

    // 通用查询方法
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // 通用插入/更新方法
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }

    // 关闭数据库连接
    close() {
        return new Promise((resolve) => {
            this.db.close(resolve);
        });
    }
}

module.exports = Database;