// Listening Test Module for IELTS Platform
class ListeningTest {
    constructor() {
        this.currentQuestions = [];
        this.userAnswers = {};
        this.audioPlayed = false;
        this.audioElement = null;
        this.currentSection = 1;
        this.totalSections = 4;
        this.initialize();
    }

    initialize() {
        this.setupAudioPlayer();
        console.log('🎧 Listening test module initialized');
    }

    setupAudioPlayer() {
        this.audioElement = document.getElementById('listening-audio');
        if (this.audioElement) {
            this.audioElement.addEventListener('loadstart', () => {
                this.updateAudioStatus('正在加载音频...');
            });

            this.audioElement.addEventListener('canplay', () => {
                this.updateAudioStatus('音频已准备就绪');
                document.getElementById('play-audio').disabled = false;
            });

            this.audioElement.addEventListener('play', () => {
                this.updateAudioStatus('音频播放中...');
                this.audioPlayed = true;
                document.getElementById('play-audio').disabled = true;
                document.getElementById('play-audio').textContent = '🔇 音频播放中';
            });

            this.audioElement.addEventListener('ended', () => {
                this.updateAudioStatus('音频播放完毕');
                document.getElementById('play-audio').textContent = '✅ 播放完毕';
            });

            this.audioElement.addEventListener('timeupdate', () => {
                this.updateAudioProgress();
            });

            this.audioElement.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                this.updateAudioStatus('音频加载失败');
                showError(ERROR_MESSAGES.TEST.AUDIO_LOAD_FAILED);
            });
        }
    }

    updateAudioStatus(status) {
        const statusElement = document.getElementById('audio-status');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    updateAudioProgress() {
        if (!this.audioElement) return;

        const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        const progressBar = document.getElementById('audio-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    async loadListeningTest() {
        try {
            // Load questions for current section
            await this.loadQuestions();
            
            // Load audio file
            await this.loadAudio();
            
            console.log('🎧 Listening test loaded successfully');
        } catch (error) {
            console.error('Failed to load listening test:', error);
            showError(ERROR_MESSAGES.TEST.LOAD_FAILED);
        }
    }

    async loadQuestions() {
        try {
            // Try to load from Supabase first
            const { data, error } = await supabase
                .from(TABLES.LISTENING_QUESTIONS)
                .select('*')
                .eq('section', this.currentSection)
                .order('question_number');

            if (error) {
                console.warn('Database load failed, using sample data:', error);
                this.loadSampleQuestions();
                return;
            }

            if (data && data.length > 0) {
                this.currentQuestions = data;
            } else {
                // No data in database, use sample questions
                this.loadSampleQuestions();
            }

            this.renderQuestions();
        } catch (error) {
            console.error('Question loading error:', error);
            this.loadSampleQuestions();
        }
    }

    loadSampleQuestions() {
        // Load sample questions for demonstration
        this.currentQuestions = [
            {
                id: 'L001',
                section: 1,
                question_number: 1,
                question_type: 'fill_blank',
                question_text: 'The customer wants to book accommodation for _______ people.',
                correct_answer: 'two',
                audio_start_time: 15,
                audio_end_time: 45
            },
            {
                id: 'L002',
                section: 1,
                question_number: 2,
                question_type: 'fill_blank',
                question_text: 'The preferred check-in date is _______ 15th.',
                correct_answer: 'October',
                audio_start_time: 45,
                audio_end_time: 75
            },
            {
                id: 'L003',
                section: 1,
                question_number: 3,
                question_type: 'multiple_choice',
                question_text: 'What type of room does the customer prefer?',
                options: ['A) Single room with garden view', 'B) Double room with sea view', 'C) Twin room with city view'],
                correct_answer: 'B',
                audio_start_time: 75,
                audio_end_time: 105
            },
            {
                id: 'L004',
                section: 1,
                question_number: 4,
                question_type: 'fill_blank',
                question_text: 'The total cost per night is £ _______.',
                correct_answer: '85',
                audio_start_time: 105,
                audio_end_time: 135
            },
            {
                id: 'L005',
                section: 1,
                question_number: 5,
                question_type: 'fill_blank',
                question_text: 'The customer\'s surname is _______.',
                correct_answer: 'Johnson',
                audio_start_time: 135,
                audio_end_time: 165
            },
            {
                id: 'L006',
                section: 1,
                question_number: 6,
                question_type: 'multiple_choice',
                question_text: 'What time is breakfast served?',
                options: ['A) 7:00 - 9:00', 'B) 7:30 - 9:30', 'C) 8:00 - 10:00'],
                correct_answer: 'B',
                audio_start_time: 165,
                audio_end_time: 195
            },
            {
                id: 'L007',
                section: 1,
                question_number: 7,
                question_type: 'fill_blank',
                question_text: 'The hotel provides free _______ service.',
                correct_answer: 'shuttle',
                audio_start_time: 195,
                audio_end_time: 225
            },
            {
                id: 'L008',
                section: 1,
                question_number: 8,
                question_type: 'fill_blank',
                question_text: 'The nearest train station is _______ minutes away.',
                correct_answer: 'fifteen',
                audio_start_time: 225,
                audio_end_time: 255
            },
            {
                id: 'L009',
                section: 1,
                question_number: 9,
                question_type: 'multiple_choice',
                question_text: 'What additional service is available?',
                options: ['A) Laundry service', 'B) Car rental', 'C) Tour booking'],
                correct_answer: 'C',
                audio_start_time: 255,
                audio_end_time: 285
            },
            {
                id: 'L010',
                section: 1,
                question_number: 10,
                question_type: 'fill_blank',
                question_text: 'The confirmation number is _______.',
                correct_answer: 'HB2759',
                audio_start_time: 285,
                audio_end_time: 315
            }
        ];

        this.renderQuestions();
    }

    renderQuestions() {
        const container = document.getElementById('listening-questions');
        if (!container) return;

        const questionsHTML = this.currentQuestions.map(question => {
            const questionId = `question_${question.id}`;
            
            let inputHTML = '';
            if (question.question_type === 'fill_blank') {
                inputHTML = `
                    <div class="question-input">
                        <input type="text" id="${questionId}" name="${questionId}" 
                               placeholder="请输入答案" autocomplete="off">
                    </div>
                `;
            } else if (question.question_type === 'multiple_choice' && question.options) {
                const optionsHTML = question.options.map((option, index) => {
                    const optionId = `${questionId}_${index}`;
                    const optionValue = option.charAt(0); // A, B, C, etc.
                    return `
                        <div class="option">
                            <input type="radio" id="${optionId}" name="${questionId}" value="${optionValue}">
                            <label for="${optionId}">${option}</label>
                        </div>
                    `;
                }).join('');
                
                inputHTML = `
                    <div class="question-input">
                        <div class="options">${optionsHTML}</div>
                    </div>
                `;
            }

            return `
                <div class="question-item" data-question-id="${question.id}">
                    <div class="question-number">问题 ${question.question_number}</div>
                    <div class="question-text">${question.question_text}</div>
                    ${inputHTML}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="section-header">
                <h3>Section ${this.currentSection} - Questions ${this.getQuestionRange()}</h3>
                <p>听音频并完成下列问题。每个问题只能听一次。</p>
            </div>
            ${questionsHTML}
        `;

        // Setup answer change listeners
        this.setupAnswerListeners();
    }

    getQuestionRange() {
        const start = (this.currentSection - 1) * 10 + 1;
        const end = this.currentSection * 10;
        return `${start}-${end}`;
    }

    setupAnswerListeners() {
        // Add listeners for answer inputs
        this.currentQuestions.forEach(question => {
            const questionId = `question_${question.id}`;
            
            if (question.question_type === 'fill_blank') {
                const input = document.getElementById(questionId);
                if (input) {
                    input.addEventListener('input', (e) => {
                        this.userAnswers[question.id] = e.target.value.trim();
                        this.saveAnswer(question.id, e.target.value.trim());
                    });
                }
            } else if (question.question_type === 'multiple_choice') {
                const radios = document.querySelectorAll(`input[name="${questionId}"]`);
                radios.forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        if (e.target.checked) {
                            this.userAnswers[question.id] = e.target.value;
                            this.saveAnswer(question.id, e.target.value);
                        }
                    });
                });
            }
        });
    }

    async saveAnswer(questionId, answer) {
        // Save answer to local storage or database
        try {
            if (app?.currentTest && auth?.isLoggedIn()) {
                // Save to database
                const { error } = await supabase
                    .from(TABLES.USER_ANSWERS)
                    .upsert([
                        {
                            session_id: app.currentTest.id,
                            question_id: questionId,
                            question_type: 'listening',
                            user_answer: answer,
                            answered_at: new Date().toISOString()
                        }
                    ]);

                if (error) {
                    console.error('Answer save error:', error);
                }
            }
        } catch (error) {
            console.error('Failed to save answer:', error);
        }
    }

    async loadAudio() {
        if (!this.audioElement) return;

        // For demo purposes, use a placeholder audio URL
        // In production, this would load from Supabase Storage
        const audioUrl = this.getAudioUrl();
        
        if (audioUrl) {
            this.audioElement.src = audioUrl;
            this.updateAudioStatus('准备播放音频...');
        } else {
            this.updateAudioStatus('音频文件不可用（演示模式）');
            // Enable questions without audio for demo
            document.getElementById('play-audio').disabled = false;
            document.getElementById('play-audio').textContent = '📝 开始答题（演示模式）';
        }
    }

    getAudioUrl() {
        // In production, this would get the actual audio file URL from Supabase Storage
        // For now, return null to indicate demo mode
        return null;
        
        // Example of how this would work with real audio:
        // const fileName = `listening_section_${this.currentSection}.mp3`;
        // return supabase.storage.from(STORAGE_BUCKETS.AUDIO_FILES).getPublicUrl(fileName).publicURL;
    }

    playListeningAudio() {
        if (this.audioPlayed) {
            showError('音频只能播放一次！');
            return;
        }

        if (this.audioElement && this.audioElement.src) {
            this.audioElement.play().catch(error => {
                console.error('Audio play error:', error);
                showError(ERROR_MESSAGES.TEST.AUDIO_LOAD_FAILED);
            });
        } else {
            // Demo mode - just enable questions
            this.audioPlayed = true;
            this.updateAudioStatus('演示模式 - 可以开始答题');
            document.getElementById('play-audio').disabled = true;
            document.getElementById('play-audio').textContent = '📝 演示模式';
            showSuccess('演示模式：请直接完成下面的练习题目');
        }
    }

    async submitListening() {
        if (!this.validateAnswers()) {
            const confirmed = confirm('还有题目未完成，确定要提交吗？');
            if (!confirmed) return;
        }

        try {
            const results = await this.calculateScore();
            await this.saveResults(results);
            
            showSuccess(`听力测试完成！得分: ${results.bandScore}`);
            
            // If this is part of a full test, move to next section
            if (app?.currentTest?.test_type === 'full') {
                setTimeout(() => {
                    app.showSection('reading');
                    app.startTestTimer(TEST_CONFIG.READING.duration);
                }, 2000);
            } else {
                // Return to practice section
                setTimeout(() => {
                    app.showSection('practice');
                }, 2000);
            }
            
        } catch (error) {
            console.error('Submit error:', error);
            showError(ERROR_MESSAGES.TEST.SUBMIT_FAILED);
        }
    }

    validateAnswers() {
        let answeredCount = 0;
        this.currentQuestions.forEach(question => {
            if (this.userAnswers[question.id]) {
                answeredCount++;
            }
        });
        
        return answeredCount >= this.currentQuestions.length * 0.8; // At least 80% answered
    }

    async calculateScore() {
        let correctAnswers = 0;
        const detailedResults = [];

        this.currentQuestions.forEach(question => {
            const userAnswer = this.userAnswers[question.id]?.toLowerCase().trim() || '';
            const correctAnswer = question.correct_answer.toLowerCase().trim();
            const isCorrect = userAnswer === correctAnswer;
            
            if (isCorrect) correctAnswers++;
            
            detailedResults.push({
                question_id: question.id,
                question_number: question.question_number,
                user_answer: this.userAnswers[question.id] || '',
                correct_answer: question.correct_answer,
                is_correct: isCorrect
            });
        });

        const bandScore = calculateBandScore(correctAnswers, 'LISTENING');
        
        return {
            section: 'listening',
            correctAnswers,
            totalQuestions: this.currentQuestions.length,
            accuracy: (correctAnswers / this.currentQuestions.length) * 100,
            bandScore,
            detailedResults
        };
    }

    async saveResults(results) {
        if (!app?.currentTest || !auth?.isLoggedIn()) {
            return;
        }

        try {
            // Update test session with listening score
            const { error: sessionError } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .update({
                    listening_score: results.bandScore,
                    listening_correct: results.correctAnswers,
                    listening_total: results.totalQuestions
                })
                .eq('id', app.currentTest.id);

            if (sessionError) {
                console.error('Session update error:', sessionError);
            }

            // Save detailed results
            const answerRecords = results.detailedResults.map(result => ({
                session_id: app.currentTest.id,
                question_id: result.question_id,
                question_type: 'listening',
                user_answer: result.user_answer,
                is_correct: result.is_correct,
                score: result.is_correct ? 1 : 0
            }));

            const { error: answersError } = await supabase
                .from(TABLES.USER_ANSWERS)
                .upsert(answerRecords);

            if (answersError) {
                console.error('Answers save error:', answersError);
            }

        } catch (error) {
            console.error('Results save error:', error);
        }
    }
}

// Initialize listening test
let listeningTest = null;

// Global functions for listening test
async function loadListeningTest() {
    if (!listeningTest) {
        listeningTest = new ListeningTest();
    }
    await listeningTest.loadListeningTest();
}

function playListeningAudio() {
    if (listeningTest) {
        listeningTest.playListeningAudio();
    }
}

async function submitListening() {
    if (listeningTest) {
        await listeningTest.submitListening();
    }
}

// Add to app loading
if (typeof app !== 'undefined') {
    const originalLoadSectionData = app.loadSectionData;
    app.loadSectionData = async function(sectionName) {
        if (sectionName === 'listening') {
            await loadListeningTest();
        } else {
            return originalLoadSectionData.call(this, sectionName);
        }
    };
}

console.log('🎧 Listening test module loaded successfully');