// Writing Test Module for IELTS Platform
class WritingTest {
    constructor() {
        this.currentTask = 1;
        this.task1Text = '';
        this.task2Text = '';
        this.task1WordCount = 0;
        this.task2WordCount = 0;
        this.task1Timer = null;
        this.task2Timer = null;
        this.initialize();
    }

    initialize() {
        this.setupWordCounters();
        this.setupTaskSwitching();
        console.log('✍️ Writing test module initialized');
    }

    setupWordCounters() {
        // Setup word counting for both tasks
        const task1TextArea = document.getElementById('task1-text');
        const task2TextArea = document.getElementById('task2-text');

        if (task1TextArea) {
            task1TextArea.addEventListener('input', (e) => {
                this.task1Text = e.target.value;
                this.updateWordCount(1, this.task1Text);
                this.saveProgress('task1', this.task1Text);
            });
        }

        if (task2TextArea) {
            task2TextArea.addEventListener('input', (e) => {
                this.task2Text = e.target.value;
                this.updateWordCount(2, this.task2Text);
                this.saveProgress('task2', this.task2Text);
            });
        }
    }

    updateWordCount(taskNumber, text) {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        
        if (taskNumber === 1) {
            this.task1WordCount = wordCount;
            const counter = document.getElementById('task1-count');
            if (counter) {
                counter.textContent = wordCount;
                counter.style.color = wordCount >= 150 ? '#10B981' : '#EF4444';
            }
        } else {
            this.task2WordCount = wordCount;
            const counter = document.getElementById('task2-count');
            if (counter) {
                counter.textContent = wordCount;
                counter.style.color = wordCount >= 250 ? '#10B981' : '#EF4444';
            }
        }
    }

    setupTaskSwitching() {
        // Task navigation buttons
        const navTask1 = document.getElementById('nav-task1');
        const navTask2 = document.getElementById('nav-task2');

        if (navTask1) {
            navTask1.addEventListener('click', () => this.switchTask(1));
        }
        if (navTask2) {
            navTask2.addEventListener('click', () => this.switchTask(2));
        }

        // Auto-save when switching tasks
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.ctrlKey) {
                e.preventDefault();
                this.switchTask(this.currentTask === 1 ? 2 : 1);
            }
        });
    }

    switchTask(taskNumber) {
        // Hide all tasks
        document.querySelectorAll('.writing-task').forEach(task => {
            task.classList.remove('active');
        });
        
        // Show target task
        const targetTask = document.getElementById(`task${taskNumber}`);
        if (targetTask) {
            targetTask.classList.add('active');
        }

        // Update navigation buttons
        document.querySelectorAll('.task-nav-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const navButton = document.getElementById(`nav-task${taskNumber}`);
        if (navButton) {
            navButton.classList.add('active');
        }

        this.currentTask = taskNumber;
        
        // Focus on the textarea
        setTimeout(() => {
            const textarea = document.getElementById(`task${taskNumber}-text`);
            if (textarea) {
                textarea.focus();
            }
        }, 100);

        console.log(`✍️ Switched to Task ${taskNumber}`);
    }

    async loadWritingTest() {
        try {
            await this.loadTasks();
            this.renderWriting();
            
            console.log('✍️ Writing test loaded successfully');
        } catch (error) {
            console.error('Failed to load writing test:', error);
            showError(ERROR_MESSAGES.TEST.LOAD_FAILED);
        }
    }

    async loadTasks() {
        try {
            // Try to load from Supabase first
            const { data, error } = await supabase
                .from(TABLES.WRITING_QUESTIONS)
                .select('*')
                .order('task_number');

            if (error || !data || data.length === 0) {
                console.warn('Database load failed, using sample tasks:', error);
                this.loadSampleTasks();
                return;
            }

            this.tasks = data;
        } catch (error) {
            console.error('Task loading error:', error);
            this.loadSampleTasks();
        }
    }

    loadSampleTasks() {
        this.tasks = [
            {
                id: 'W001',
                task_number: 1,
                question_type: 'task1_chart',
                question_text: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
                prompt_image: null,
                word_limit: 150,
                time_limit: 20,
                additional_info: 'You should write at least 150 words. You should spend about 20 minutes on this task.'
            },
            {
                id: 'W002',
                task_number: 2,
                question_type: 'task2_opinion',
                question_text: 'Some people believe that technology has made our lives easier and more convenient. Others argue that technology has made our lives more complicated and stressed. Discuss both views and give your own opinion.',
                word_limit: 250,
                time_limit: 40,
                additional_info: 'You should write at least 250 words. You should spend about 40 minutes on this task.'
            }
        ];
    }

    renderWriting() {
        // Tasks are already in HTML, just update with dynamic content if needed
        this.updateTaskContent();
        
        // Setup initial state
        this.switchTask(1);
        this.updateWordCount(1, '');
        this.updateWordCount(2, '');
    }

    updateTaskContent() {
        if (this.tasks && this.tasks.length >= 2) {
            // Update Task 1
            const task1Element = document.querySelector('#task1 .task-prompt p');
            if (task1Element && this.tasks[0]) {
                task1Element.textContent = this.tasks[0].question_text;
            }

            // Update Task 2  
            const task2Element = document.querySelector('#task2 .task-prompt p');
            if (task2Element && this.tasks[1]) {
                task2Element.textContent = this.tasks[1].question_text;
            }

            // Add chart placeholder for Task 1 if it's a chart task
            if (this.tasks[0] && this.tasks[0].question_type === 'task1_chart') {
                const chartContainer = document.querySelector('#task1 .chart-container');
                if (chartContainer) {
                    chartContainer.innerHTML = `
                        <div class="chart-placeholder">
                            <p>📊 图表将在此处显示</p>
                            <p style="font-size: 0.9rem; color: #6B7280;">
                                实际考试中，这里会显示需要描述的图表、表格或图形
                            </p>
                        </div>
                    `;
                }
            }
        }
    }

    async saveProgress(taskType, text) {
        if (!app?.currentTest || !auth?.isLoggedIn()) {
            return;
        }

        try {
            // Save writing progress to database
            const { error } = await supabase
                .from(TABLES.USER_ANSWERS)
                .upsert([
                    {
                        session_id: app.currentTest.id,
                        question_id: taskType,
                        question_type: 'writing',
                        user_answer: text,
                        answered_at: new Date().toISOString()
                    }
                ]);

            if (error) {
                console.error('Progress save error:', error);
            }
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }

    validateWriting() {
        const issues = [];

        if (this.task1WordCount < 150) {
            issues.push(`Task 1 需要至少150词 (当前: ${this.task1WordCount}词)`);
        }

        if (this.task2WordCount < 250) {
            issues.push(`Task 2 需要至少250词 (当前: ${this.task2WordCount}词)`);
        }

        if (this.task1Text.trim() === '') {
            issues.push('Task 1 不能为空');
        }

        if (this.task2Text.trim() === '') {
            issues.push('Task 2 不能为空');
        }

        return issues;
    }

    async submitWriting() {
        const validationIssues = this.validateWriting();
        
        if (validationIssues.length > 0) {
            const message = '发现以下问题：\n' + validationIssues.join('\n') + '\n\n确定要提交吗？';
            const confirmed = confirm(message);
            if (!confirmed) return;
        }

        try {
            const results = await this.calculateScore();
            await this.saveResults(results);
            
            showSuccess(`写作测试完成！预估得分: ${results.estimatedBand}`);
            
            // If this is part of a full test, show completion message
            if (app?.currentTest?.test_type === 'full') {
                setTimeout(() => {
                    this.showTestComplete();
                }, 2000);
            } else {
                setTimeout(() => {
                    app.showSection('practice');
                }, 2000);
            }
            
        } catch (error) {
            console.error('Submit error:', error);
            showError(ERROR_MESSAGES.TEST.SUBMIT_FAILED);
        }
    }

    async calculateScore() {
        // Basic scoring algorithm for writing
        // In a real system, this would use AI or human evaluation
        
        const task1Score = this.calculateTaskScore(1, this.task1Text, this.task1WordCount);
        const task2Score = this.calculateTaskScore(2, this.task2Text, this.task2WordCount);
        
        // Task 2 is weighted twice as much as Task 1
        const overallScore = (task1Score + task2Score * 2) / 3;
        const estimatedBand = this.convertScoreToBand(overallScore);

        return {
            section: 'writing',
            task1Score,
            task2Score,
            overallScore,
            estimatedBand,
            task1WordCount: this.task1WordCount,
            task2WordCount: this.task2WordCount,
            task1Text: this.task1Text,
            task2Text: this.task2Text
        };
    }

    calculateTaskScore(taskNumber, text, wordCount) {
        let score = 0;
        
        // Word count scoring
        const minWords = taskNumber === 1 ? 150 : 250;
        const optimalWords = taskNumber === 1 ? 180 : 300;
        
        if (wordCount >= minWords) {
            score += 2; // Base score for meeting word count
            if (wordCount >= optimalWords) {
                score += 1; // Bonus for optimal word count
            }
        } else {
            score -= 2; // Penalty for insufficient words
        }

        // Basic content analysis
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgWordsPerSentence = wordCount / sentences.length;
        
        // Sentence variety scoring
        if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 25) {
            score += 2; // Good sentence length variety
        } else if (avgWordsPerSentence >= 10) {
            score += 1; // Acceptable sentence length
        }

        // Paragraph structure (basic check for line breaks)
        const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
        if (paragraphs.length >= 3) {
            score += 2; // Good paragraph structure
        } else if (paragraphs.length >= 2) {
            score += 1; // Basic paragraph structure
        }

        // Vocabulary diversity (basic check)
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const uniqueWords = new Set(words);
        const vocabularyRatio = uniqueWords.size / words.length;
        
        if (vocabularyRatio >= 0.7) {
            score += 3; // High vocabulary diversity
        } else if (vocabularyRatio >= 0.5) {
            score += 2; // Good vocabulary diversity
        } else if (vocabularyRatio >= 0.3) {
            score += 1; // Acceptable vocabulary diversity
        }

        // Task-specific scoring
        if (taskNumber === 1) {
            // Task 1: Check for descriptive language
            const descriptiveWords = ['increase', 'decrease', 'rise', 'fall', 'peak', 'low', 'high', 'trend', 'pattern', 'significant', 'gradual', 'sharp', 'steady'];
            const foundDescriptive = descriptiveWords.some(word => text.toLowerCase().includes(word));
            if (foundDescriptive) {
                score += 2;
            }
        } else {
            // Task 2: Check for opinion and discussion words
            const discussionWords = ['however', 'although', 'furthermore', 'moreover', 'opinion', 'believe', 'argue', 'discuss', 'view', 'perspective', 'advantage', 'disadvantage'];
            const foundDiscussion = discussionWords.some(word => text.toLowerCase().includes(word));
            if (foundDiscussion) {
                score += 2;
            }
        }

        return Math.max(0, Math.min(10, score)); // Clamp between 0-10
    }

    convertScoreToBand(score) {
        // Convert 0-10 score to IELTS band (0-9)
        if (score >= 9) return 9.0;
        if (score >= 8.5) return 8.5;
        if (score >= 8) return 8.0;
        if (score >= 7.5) return 7.5;
        if (score >= 7) return 7.0;
        if (score >= 6.5) return 6.5;
        if (score >= 6) return 6.0;
        if (score >= 5.5) return 5.5;
        if (score >= 5) return 5.0;
        if (score >= 4.5) return 4.5;
        if (score >= 4) return 4.0;
        if (score >= 3.5) return 3.5;
        if (score >= 3) return 3.0;
        if (score >= 2.5) return 2.5;
        if (score >= 2) return 2.0;
        if (score >= 1.5) return 1.5;
        if (score >= 1) return 1.0;
        return 0.0;
    }

    async saveResults(results) {
        if (!app?.currentTest || !auth?.isLoggedIn()) {
            return;
        }

        try {
            // Update test session with writing score
            const { error: sessionError } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .update({
                    writing_score: results.estimatedBand,
                    writing_task1_score: results.task1Score,
                    writing_task2_score: results.task2Score
                })
                .eq('id', app.currentTest.id);

            if (sessionError) {
                console.error('Session update error:', sessionError);
            }

            // Save detailed writing responses
            const writingRecords = [
                {
                    session_id: app.currentTest.id,
                    question_id: 'task1',
                    question_type: 'writing',
                    user_answer: results.task1Text,
                    score: results.task1Score,
                    word_count: results.task1WordCount
                },
                {
                    session_id: app.currentTest.id,
                    question_id: 'task2',
                    question_type: 'writing',
                    user_answer: results.task2Text,
                    score: results.task2Score,
                    word_count: results.task2WordCount
                }
            ];

            const { error: answersError } = await supabase
                .from(TABLES.USER_ANSWERS)
                .upsert(writingRecords);

            if (answersError) {
                console.error('Writing save error:', answersError);
            }

        } catch (error) {
            console.error('Results save error:', error);
        }
    }

    showTestComplete() {
        // Show test completion message for full test
        const completionHTML = `
            <div class="test-complete">
                <div class="completion-content">
                    <h2>🎉 恭喜完成IELTS模拟测试！</h2>
                    <p>您已完成所有测试部分，正在计算最终成绩...</p>
                    <div class="completion-actions">
                        <button onclick="showSection('progress')" class="cta-primary">查看成绩</button>
                        <button onclick="showSection('home')" class="cta-secondary">返回首页</button>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('#writing-section').innerHTML = completionHTML;
        
        // Calculate and update final test results
        setTimeout(() => {
            this.calculateFinalResults();
        }, 2000);
    }

    async calculateFinalResults() {
        if (!app?.currentTest || !auth?.isLoggedIn()) {
            return;
        }

        try {
            // Get current test session data
            const { data: session, error } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .select('*')
                .eq('id', app.currentTest.id)
                .single();

            if (error || !session) {
                console.error('Failed to get session data:', error);
                return;
            }

            // Calculate overall score (average of all sections)
            const scores = [
                session.listening_score || 0,
                session.reading_score || 0,
                session.writing_score || 0,
                session.speaking_score || 0  // Will be 0 for now
            ].filter(score => score > 0);

            const overallScore = scores.length > 0 ? 
                Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10 : 0;

            // Update session with final results
            const { error: updateError } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .update({
                    overall_score: overallScore,
                    completed_at: new Date().toISOString(),
                    status: 'completed'
                })
                .eq('id', app.currentTest.id);

            if (updateError) {
                console.error('Failed to update final results:', updateError);
            }

            // Update user's best scores if applicable
            await this.updateUserBestScores(session, overallScore);
            
            app.isTestInProgress = false;
            app.currentTest = null;

        } catch (error) {
            console.error('Final results calculation error:', error);
        }
    }

    async updateUserBestScores(session, overallScore) {
        try {
            const userProfile = await auth.getUserProfile();
            if (!userProfile) return;

            const updates = {
                total_tests: (userProfile.total_tests || 0) + 1
            };

            if (overallScore > (userProfile.best_overall_score || 0)) {
                updates.best_overall_score = overallScore;
            }
            if ((session.listening_score || 0) > (userProfile.best_listening_score || 0)) {
                updates.best_listening_score = session.listening_score;
            }
            if ((session.reading_score || 0) > (userProfile.best_reading_score || 0)) {
                updates.best_reading_score = session.reading_score;
            }
            if ((session.writing_score || 0) > (userProfile.best_writing_score || 0)) {
                updates.best_writing_score = session.writing_score;
            }

            await auth.updateUserProfile(updates);
        } catch (error) {
            console.error('Failed to update user best scores:', error);
        }
    }
}

// Initialize writing test
let writingTest = null;

// Global functions for writing test
async function loadWritingTest() {
    if (!writingTest) {
        writingTest = new WritingTest();
    }
    await writingTest.loadWritingTest();
}

function switchTask(taskNumber) {
    if (writingTest) {
        writingTest.switchTask(taskNumber);
    }
}

async function submitWriting() {
    if (writingTest) {
        await writingTest.submitWriting();
    }
}

// Add to app loading
if (typeof app !== 'undefined') {
    const originalLoadSectionData = app.loadSectionData;
    app.loadSectionData = async function(sectionName) {
        if (sectionName === 'writing') {
            await loadWritingTest();
        } else {
            return originalLoadSectionData.call(this, sectionName);
        }
    };
}

console.log('✍️ Writing test module loaded successfully');