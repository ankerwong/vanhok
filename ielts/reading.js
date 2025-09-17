// Reading Test Module for IELTS Platform
class ReadingTest {
    constructor() {
        this.currentPassage = 1;
        this.currentQuestions = [];
        this.passages = [];
        this.userAnswers = {};
        this.totalPassages = 3;
        this.initialize();
    }

    initialize() {
        console.log('📖 Reading test module initialized');
    }

    async loadReadingTest() {
        try {
            await this.loadPassages();
            await this.loadQuestions();
            this.renderReading();
            
            console.log('📖 Reading test loaded successfully');
        } catch (error) {
            console.error('Failed to load reading test:', error);
            showError(ERROR_MESSAGES.TEST.LOAD_FAILED);
        }
    }

    async loadPassages() {
        try {
            // Try to load from Supabase first
            const { data, error } = await supabase
                .from(TABLES.READING_QUESTIONS)
                .select('passage_id, passage_title, passage_text')
                .eq('passage_id', `P00${this.currentPassage}`)
                .limit(1);

            if (error || !data || data.length === 0) {
                console.warn('Database load failed, using sample data:', error);
                this.loadSamplePassages();
                return;
            }

            this.passages = data;
        } catch (error) {
            console.error('Passage loading error:', error);
            this.loadSamplePassages();
        }
    }

    loadSamplePassages() {
        this.passages = [{
            passage_id: 'P001',
            passage_title: 'The Impact of Climate Change on Marine Ecosystems',
            passage_text: `
                Marine ecosystems around the world are facing unprecedented challenges due to climate change. Rising sea temperatures, ocean acidification, and changing weather patterns are disrupting the delicate balance that has existed for millennia. 

                Coral reefs, often referred to as the "rainforests of the sea," are particularly vulnerable to these changes. When water temperatures rise even slightly above normal levels, corals expel the symbiotic algae living in their tissues, causing them to turn white or "bleach." This phenomenon has become increasingly common, with major bleaching events occurring more frequently than ever before.

                The Great Barrier Reef, stretching over 2,300 kilometers along Australia's northeast coast, has experienced several mass bleaching events in recent years. Scientists estimate that approximately 50% of shallow-water corals have died since the 1990s. This loss is not just aesthetic; coral reefs support about 25% of all marine species despite covering less than 1% of the ocean floor.

                Ocean acidification, caused by the absorption of excess carbon dioxide from the atmosphere, presents another significant threat. As seawater becomes more acidic, it becomes increasingly difficult for marine organisms with calcium carbonate shells or skeletons, such as shellfish, sea urchins, and some plankton, to build and maintain their protective structures.

                The consequences extend far beyond the immediate marine environment. Coastal communities that depend on fishing and tourism are experiencing economic hardship as fish populations decline and coral reefs lose their appeal to divers and snorkelers. Small island nations face the additional threat of rising sea levels, which could render their territories uninhabitable.

                However, conservation efforts are showing promise in some areas. Marine protected areas, where fishing and other human activities are restricted, have demonstrated remarkable recovery rates. In addition, coral restoration projects using heat-resistant coral varieties are being developed to help reefs adapt to changing conditions.

                Furthermore, international cooperation through agreements like the Paris Climate Accord aims to limit global temperature rise and reduce carbon emissions. While the challenges are significant, many scientists remain optimistic that with continued research and global action, it may be possible to preserve these vital ecosystems for future generations.

                The urgency of addressing climate change cannot be overstated. Marine ecosystems serve as crucial indicators of planetary health, and their continued degradation serves as a warning that immediate action is required to prevent irreversible damage to our planet's biodiversity.
            `
        }];
    }

    async loadQuestions() {
        try {
            // Try to load from Supabase first
            const { data, error } = await supabase
                .from(TABLES.READING_QUESTIONS)
                .select('*')
                .eq('passage_id', `P00${this.currentPassage}`)
                .order('question_number');

            if (error || !data || data.length === 0) {
                console.warn('Database load failed, using sample questions:', error);
                this.loadSampleQuestions();
                return;
            }

            this.currentQuestions = data;
        } catch (error) {
            console.error('Question loading error:', error);
            this.loadSampleQuestions();
        }
    }

    loadSampleQuestions() {
        this.currentQuestions = [
            {
                id: 'R001',
                passage_id: 'P001',
                question_number: 1,
                question_type: 'true_false_not_given',
                question_text: 'Coral reefs cover more than 1% of the ocean floor.',
                correct_answer: 'FALSE',
                options: ['TRUE', 'FALSE', 'NOT GIVEN']
            },
            {
                id: 'R002',
                passage_id: 'P001',
                question_number: 2,
                question_type: 'true_false_not_given',
                question_text: 'The Great Barrier Reef has lost approximately half of its shallow-water corals since the 1990s.',
                correct_answer: 'TRUE',
                options: ['TRUE', 'FALSE', 'NOT GIVEN']
            },
            {
                id: 'R003',
                passage_id: 'P001',
                question_number: 3,
                question_type: 'multiple_choice',
                question_text: 'What causes coral bleaching?',
                correct_answer: 'B',
                options: [
                    'A) Ocean acidification',
                    'B) Rising water temperatures', 
                    'C) Overfishing',
                    'D) Pollution'
                ]
            },
            {
                id: 'R004',
                passage_id: 'P001',
                question_number: 4,
                question_type: 'fill_blank',
                question_text: 'Ocean acidification makes it difficult for marine organisms to build _______ structures.',
                correct_answer: 'calcium carbonate'
            },
            {
                id: 'R005',
                passage_id: 'P001',
                question_number: 5,
                question_type: 'true_false_not_given',
                question_text: 'All coral restoration projects have been successful.',
                correct_answer: 'NOT GIVEN',
                options: ['TRUE', 'FALSE', 'NOT GIVEN']
            },
            {
                id: 'R006',
                passage_id: 'P001',
                question_number: 6,
                question_type: 'multiple_choice',
                question_text: 'According to the passage, what percentage of marine species do coral reefs support?',
                correct_answer: 'C',
                options: [
                    'A) 1%',
                    'B) 15%',
                    'C) 25%',
                    'D) 50%'
                ]
            },
            {
                id: 'R007',
                passage_id: 'P001',
                question_number: 7,
                question_type: 'fill_blank',
                question_text: 'The Great Barrier Reef stretches over _______ kilometers.',
                correct_answer: '2,300'
            },
            {
                id: 'R008',
                passage_id: 'P001',
                question_number: 8,
                question_type: 'true_false_not_given',
                question_text: 'Marine protected areas have shown remarkable recovery rates.',
                correct_answer: 'TRUE',
                options: ['TRUE', 'FALSE', 'NOT GIVEN']
            },
            {
                id: 'R009',
                passage_id: 'P001',
                question_number: 9,
                question_type: 'multiple_choice',
                question_text: 'What is the main purpose of the Paris Climate Accord mentioned in the passage?',
                correct_answer: 'A',
                options: [
                    'A) To limit global temperature rise',
                    'B) To establish marine protected areas',
                    'C) To fund coral restoration projects',
                    'D) To relocate island populations'
                ]
            },
            {
                id: 'R010',
                passage_id: 'P001',
                question_number: 10,
                question_type: 'fill_blank',
                question_text: 'Corals are often called the "_______ of the sea".',
                correct_answer: 'rainforests'
            },
            {
                id: 'R011',
                passage_id: 'P001',
                question_number: 11,
                question_type: 'true_false_not_given',
                question_text: 'Small island nations only face threats from rising sea levels.',
                correct_answer: 'FALSE',
                options: ['TRUE', 'FALSE', 'NOT GIVEN']
            },
            {
                id: 'R012',
                passage_id: 'P001',
                question_number: 12,
                question_type: 'multiple_choice',
                question_text: 'According to the passage, marine ecosystems serve as:',
                correct_answer: 'D',
                options: [
                    'A) Sources of renewable energy',
                    'B) Tourism attractions only',
                    'C) Carbon storage facilities',
                    'D) Indicators of planetary health'
                ]
            },
            {
                id: 'R013',
                passage_id: 'P001',
                question_number: 13,
                question_text: 'What relationship exists between corals and algae?',
                question_type: 'fill_blank',
                correct_answer: 'symbiotic'
            }
        ];
    }

    renderReading() {
        const passageContainer = document.getElementById('reading-text');
        const questionsContainer = document.getElementById('reading-questions-container');

        if (passageContainer && this.passages.length > 0) {
            const passage = this.passages[0];
            passageContainer.innerHTML = `
                <div class="passage-header">
                    <h3>Passage ${this.currentPassage}</h3>
                    <h4>${passage.passage_title}</h4>
                </div>
                <div class="passage-content">
                    ${this.formatPassageText(passage.passage_text)}
                </div>
            `;
        }

        if (questionsContainer) {
            const questionsHTML = this.currentQuestions.map(question => {
                const questionId = `question_${question.id}`;
                let inputHTML = '';

                switch (question.question_type) {
                    case 'true_false_not_given':
                    case 'yes_no_not_given':
                        const options = question.options || ['TRUE', 'FALSE', 'NOT GIVEN'];
                        inputHTML = this.renderMultipleChoice(questionId, options);
                        break;
                    
                    case 'multiple_choice':
                        inputHTML = this.renderMultipleChoice(questionId, question.options);
                        break;
                    
                    case 'fill_blank':
                    case 'sentence_completion':
                        inputHTML = `
                            <div class="question-input">
                                <input type="text" id="${questionId}" name="${questionId}" 
                                       placeholder="请输入答案" autocomplete="off">
                            </div>
                        `;
                        break;
                }

                return `
                    <div class="question-item" data-question-id="${question.id}">
                        <div class="question-number">问题 ${question.question_number}</div>
                        <div class="question-text">${question.question_text}</div>
                        ${inputHTML}
                    </div>
                `;
            }).join('');

            questionsContainer.innerHTML = `
                <div class="questions-header">
                    <h3>Questions ${this.getQuestionRange()}</h3>
                    <p>根据文章内容回答下列问题</p>
                </div>
                ${questionsHTML}
            `;

            this.setupAnswerListeners();
        }
    }

    renderMultipleChoice(questionId, options) {
        const optionsHTML = options.map((option, index) => {
            const optionId = `${questionId}_${index}`;
            const optionValue = option.includes(')') ? option.charAt(0) : option;
            return `
                <div class="option">
                    <input type="radio" id="${optionId}" name="${questionId}" value="${optionValue}">
                    <label for="${optionId}">${option}</label>
                </div>
            `;
        }).join('');
        
        return `
            <div class="question-input">
                <div class="options">${optionsHTML}</div>
            </div>
        `;
    }

    formatPassageText(text) {
        // Split text into paragraphs and format
        return text.trim().split('\n\n').map((paragraph, index) => {
            if (paragraph.trim()) {
                return `<p class="paragraph" data-paragraph="${index + 1}">${paragraph.trim()}</p>`;
            }
            return '';
        }).join('');
    }

    getQuestionRange() {
        const start = (this.currentPassage - 1) * 13 + 1;
        const end = Math.min(this.currentPassage * 13, 40);
        return `${start}-${end}`;
    }

    setupAnswerListeners() {
        this.currentQuestions.forEach(question => {
            const questionId = `question_${question.id}`;
            
            if (question.question_type === 'fill_blank' || question.question_type === 'sentence_completion') {
                const input = document.getElementById(questionId);
                if (input) {
                    input.addEventListener('input', (e) => {
                        this.userAnswers[question.id] = e.target.value.trim();
                        this.saveAnswer(question.id, e.target.value.trim());
                    });
                }
            } else {
                // Multiple choice questions
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
        try {
            if (app?.currentTest && auth?.isLoggedIn()) {
                const { error } = await supabase
                    .from(TABLES.USER_ANSWERS)
                    .upsert([
                        {
                            session_id: app.currentTest.id,
                            question_id: questionId,
                            question_type: 'reading',
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

    async submitReading() {
        if (!this.validateAnswers()) {
            const confirmed = confirm('还有题目未完成，确定要提交吗？');
            if (!confirmed) return;
        }

        try {
            const results = await this.calculateScore();
            await this.saveResults(results);
            
            showSuccess(`阅读测试完成！得分: ${results.bandScore}`);
            
            // If this is part of a full test, move to next section
            if (app?.currentTest?.test_type === 'full') {
                setTimeout(() => {
                    app.showSection('writing');
                    app.startTestTimer(TEST_CONFIG.WRITING.duration);
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

    validateAnswers() {
        let answeredCount = 0;
        this.currentQuestions.forEach(question => {
            if (this.userAnswers[question.id]) {
                answeredCount++;
            }
        });
        
        return answeredCount >= this.currentQuestions.length * 0.7; // At least 70% answered
    }

    async calculateScore() {
        let correctAnswers = 0;
        const detailedResults = [];

        this.currentQuestions.forEach(question => {
            const userAnswer = this.userAnswers[question.id]?.toString().toLowerCase().trim() || '';
            const correctAnswer = question.correct_answer.toString().toLowerCase().trim();
            
            let isCorrect = false;
            
            // Handle different answer formats
            if (question.question_type === 'fill_blank' || question.question_type === 'sentence_completion') {
                // Allow for slight variations in fill-in-the-blank answers
                isCorrect = userAnswer === correctAnswer || 
                           userAnswer.includes(correctAnswer) || 
                           correctAnswer.includes(userAnswer);
            } else {
                // Exact match for multiple choice
                isCorrect = userAnswer === correctAnswer;
            }
            
            if (isCorrect) correctAnswers++;
            
            detailedResults.push({
                question_id: question.id,
                question_number: question.question_number,
                user_answer: this.userAnswers[question.id] || '',
                correct_answer: question.correct_answer,
                is_correct: isCorrect
            });
        });

        const bandScore = calculateBandScore(correctAnswers, 'READING');
        
        return {
            section: 'reading',
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
            const { error: sessionError } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .update({
                    reading_score: results.bandScore,
                    reading_correct: results.correctAnswers,
                    reading_total: results.totalQuestions
                })
                .eq('id', app.currentTest.id);

            if (sessionError) {
                console.error('Session update error:', sessionError);
            }

            const answerRecords = results.detailedResults.map(result => ({
                session_id: app.currentTest.id,
                question_id: result.question_id,
                question_type: 'reading',
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

// Initialize reading test
let readingTest = null;

// Global functions for reading test
async function loadReadingTest() {
    if (!readingTest) {
        readingTest = new ReadingTest();
    }
    await readingTest.loadReadingTest();
}

async function submitReading() {
    if (readingTest) {
        await readingTest.submitReading();
    }
}

// Add to app loading
if (typeof app !== 'undefined') {
    const originalLoadSectionData = app.loadSectionData;
    app.loadSectionData = async function(sectionName) {
        if (sectionName === 'reading') {
            await loadReadingTest();
        } else {
            return originalLoadSectionData.call(this, sectionName);
        }
    };
}

console.log('📖 Reading test module loaded successfully');