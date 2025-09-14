// Vanhok IELTS Mock Test Platform - Main JavaScript

class IELTSMockTest {
    constructor() {
        this.API_BASE = window.location.origin + '/api';
        this.currentSession = null;
        this.currentSection = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.userAnswers = {};
        this.sectionTimer = null;
        this.testStartTime = null;
        
        this.init();
    }

    init() {
        this.initEventListeners();
        this.initNavigation();
        this.initResponsiveFeatures();
    }

    initEventListeners() {
        // Navigation toggle for mobile
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Section test buttons
        document.querySelectorAll('.section-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.closest('[onclick]')?.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
                if (section) {
                    this.startSectionTest(section);
                }
            });
        });
    }

    initNavigation() {
        // Update active nav link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initResponsiveFeatures() {
        // Handle window resize for responsive design
        window.addEventListener('resize', () => {
            this.handleResponsiveChanges();
        });
    }

    handleResponsiveChanges() {
        // Adjust layouts based on screen size
        const isMobile = window.innerWidth <= 768;
        
        // Close mobile menu on resize to desktop
        if (!isMobile) {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    }

    // Test Management Functions
    async startFullTest() {
        this.showLoading('Initializing full IELTS mock test...');
        
        try {
            // Create test session
            const session = await this.createTestSession('full');
            this.currentSession = session.sessionId;
            
            // Load all sections
            await this.loadAllSections();
            
            this.hideLoading();
            this.showTestInterface('listening');
            
        } catch (error) {
            console.error('Error starting full test:', error);
            this.hideLoading();
            this.showError('Failed to start test. Please try again.');
        }
    }

    async startSectionTest(section) {
        this.showLoading(`Preparing ${section} test section...`);
        
        try {
            // Create test session for specific section
            const session = await this.createTestSession(section);
            this.currentSession = session.sessionId;
            this.currentSection = section;
            
            // Load questions for this section
            await this.loadSectionQuestions(section);
            
            this.hideLoading();
            this.showTestInterface(section);
            
        } catch (error) {
            console.error(`Error starting ${section} test:`, error);
            this.hideLoading();
            this.showError(`Failed to start ${section} test. Please try again.`);
        }
    }

    async createTestSession(testType) {
        const response = await fetch(`${this.API_BASE}/test/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ testType })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create test session');
        }
        
        return await response.json();
    }

    async loadSectionQuestions(section) {
        const response = await fetch(`${this.API_BASE}/test/${section}`);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${section} questions`);
        }
        
        const data = await response.json();
        this.questions = data.questions;
        this.currentQuestionIndex = 0;
    }

    async loadAllSections() {
        const sections = ['listening', 'reading', 'writing', 'speaking'];
        const allQuestions = {};
        
        for (const section of sections) {
            const response = await fetch(`${this.API_BASE}/test/${section}`);
            if (response.ok) {
                const data = await response.json();
                allQuestions[section] = data.questions;
            }
        }
        
        this.questions = allQuestions;
    }

    showTestInterface(section) {
        // Hide main content and show test interface
        document.querySelector('main').style.display = 'none';
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';
        
        // Create and show test interface
        this.createTestInterface(section);
    }

    createTestInterface(section) {
        const testContainer = document.createElement('div');
        testContainer.className = 'test-container';
        testContainer.innerHTML = this.getTestInterfaceHTML(section);
        
        document.body.appendChild(testContainer);
        
        // Initialize test interface functionality
        this.initTestInterface(section);
    }

    getTestInterfaceHTML(section) {
        return `
            <div class="test-interface">
                <header class="test-header">
                    <div class="test-brand">
                        <span class="vanhok-logo">Vanhok</span>
                        <span class="test-title">IELTS ${section.charAt(0).toUpperCase() + section.slice(1)} Test</span>
                    </div>
                    <div class="test-timer">
                        <i class="fas fa-clock"></i>
                        <span id="timer-display">00:00</span>
                    </div>
                    <div class="test-progress">
                        <span id="progress-display">Question 1 of ${this.questions.length || 40}</span>
                    </div>
                </header>
                
                <main class="test-main">
                    <div class="test-content">
                        <div class="question-panel">
                            <div id="question-content">
                                <!-- Question content will be loaded here -->
                            </div>
                        </div>
                        
                        <div class="answer-panel">
                            <div id="answer-area">
                                <!-- Answer interface will be loaded here -->
                            </div>
                            
                            <div class="test-controls">
                                <button id="prev-btn" class="control-btn" disabled>
                                    <i class="fas fa-chevron-left"></i>
                                    Previous
                                </button>
                                <button id="flag-btn" class="control-btn flag-btn">
                                    <i class="fas fa-flag"></i>
                                    Flag for Review
                                </button>
                                <button id="next-btn" class="control-btn primary">
                                    Next
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="question-navigator">
                        <h3>Question Navigator</h3>
                        <div class="question-grid" id="question-grid">
                            <!-- Question numbers will be populated here -->
                        </div>
                        <div class="navigator-legend">
                            <div class="legend-item">
                                <span class="legend-color answered"></span>
                                <span>Answered</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color flagged"></span>
                                <span>Flagged</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color current"></span>
                                <span>Current</span>
                            </div>
                        </div>
                        
                        <button id="finish-test-btn" class="finish-btn">
                            <i class="fas fa-check-circle"></i>
                            Finish Test
                        </button>
                    </div>
                </main>
                
                <div id="test-modal" class="test-modal hidden">
                    <div class="modal-content">
                        <div id="modal-body">
                            <!-- Modal content -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initTestInterface(section) {
        // Load first question
        this.loadQuestion(this.currentQuestionIndex);
        
        // Initialize timer based on section
        this.startSectionTimer(section);
        
        // Initialize question navigator
        this.initQuestionNavigator();
        
        // Add event listeners
        this.addTestEventListeners();
    }

    loadQuestion(index) {
        if (!this.questions || !this.questions[index]) {
            return;
        }
        
        const question = this.questions[index];
        const questionContent = document.getElementById('question-content');
        const answerArea = document.getElementById('answer-area');
        
        // Update progress display
        document.getElementById('progress-display').textContent = 
            `Question ${index + 1} of ${this.questions.length}`;
        
        // Load question content based on type
        questionContent.innerHTML = this.getQuestionHTML(question);
        answerArea.innerHTML = this.getAnswerHTML(question);
        
        // Update navigation buttons
        this.updateNavigationButtons(index);
        
        // Update question navigator
        this.updateQuestionNavigator(index);
    }

    getQuestionHTML(question) {
        let html = `<div class="question-header">
            <h3>Question ${question.question_number || this.currentQuestionIndex + 1}</h3>
        </div>`;
        
        if (question.passage_text && question.passage_text.trim()) {
            html += `
                <div class="passage-container">
                    <h4>${question.passage_title || 'Reading Passage'}</h4>
                    <div class="passage-text">${question.passage_text}</div>
                </div>
            `;
        }
        
        if (question.audio_file) {
            html += `
                <div class="audio-container">
                    <audio controls class="audio-player">
                        <source src="/audio/${question.audio_file}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p class="audio-note">You will hear the audio only once.</p>
                </div>
            `;
        }
        
        html += `<div class="question-text">${question.question_text}</div>`;
        
        return html;
    }

    getAnswerHTML(question) {
        switch (question.question_type) {
            case 'multiple_choice':
                return this.getMultipleChoiceHTML(question);
            case 'fill_blank':
                return this.getFillBlankHTML(question);
            case 'true_false_not_given':
                return this.getTrueFalseHTML(question);
            case 'matching':
                return this.getMatchingHTML(question);
            default:
                return this.getTextAreaHTML(question);
        }
    }

    getMultipleChoiceHTML(question) {
        let options = [];
        try {
            options = JSON.parse(question.options || '[]');
        } catch (e) {
            console.error('Error parsing options:', e);
        }
        
        let html = '<div class="multiple-choice">';
        options.forEach((option, index) => {
            const letter = String.fromCharCode(65 + index);
            html += `
                <label class="option-label">
                    <input type="radio" name="answer" value="${letter}" 
                           onchange="ieltsTest.handleAnswerChange('${letter}')">
                    <span class="option-text">${option}</span>
                </label>
            `;
        });
        html += '</div>';
        
        return html;
    }

    getFillBlankHTML(question) {
        return `
            <div class="fill-blank">
                <input type="text" class="answer-input" placeholder="Enter your answer..." 
                       oninput="ieltsTest.handleAnswerChange(this.value)">
            </div>
        `;
    }

    getTrueFalseHTML(question) {
        return `
            <div class="true-false">
                <label class="option-label">
                    <input type="radio" name="answer" value="TRUE" 
                           onchange="ieltsTest.handleAnswerChange('TRUE')">
                    <span class="option-text">TRUE</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="answer" value="FALSE" 
                           onchange="ieltsTest.handleAnswerChange('FALSE')">
                    <span class="option-text">FALSE</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="answer" value="NOT GIVEN" 
                           onchange="ieltsTest.handleAnswerChange('NOT GIVEN')">
                    <span class="option-text">NOT GIVEN</span>
                </label>
            </div>
        `;
    }

    getMatchingHTML(question) {
        return `
            <div class="matching">
                <textarea class="answer-textarea" placeholder="Enter your matching answers (e.g., 1-A, 2-B, 3-C)..."
                          oninput="ieltsTest.handleAnswerChange(this.value)"></textarea>
            </div>
        `;
    }

    getTextAreaHTML(question) {
        const isWriting = question.task_number !== undefined;
        const placeholder = isWriting ? 
            `Write your ${question.task_number === 1 ? 'report' : 'essay'} here...` :
            'Enter your answer...';
        const wordLimit = question.word_limit || 250;
        
        return `
            <div class="text-area-container">
                <textarea class="answer-textarea writing-area" 
                          placeholder="${placeholder}"
                          oninput="ieltsTest.handleAnswerChange(this.value); ieltsTest.updateWordCount(this.value)"></textarea>
                ${isWriting ? `
                    <div class="word-count">
                        <span id="current-words">0</span> / ${wordLimit} words
                    </div>
                ` : ''}
            </div>
        `;
    }

    handleAnswerChange(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion) {
            this.userAnswers[currentQuestion.id] = {
                answer: answer,
                questionType: currentQuestion.question_type,
                timestamp: Date.now()
            };
            
            // Mark question as answered in navigator
            this.markQuestionAnswered(this.currentQuestionIndex);
        }
    }

    updateWordCount(text) {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        const currentWordsElement = document.getElementById('current-words');
        
        if (currentWordsElement) {
            currentWordsElement.textContent = wordCount;
        }
    }

    startSectionTimer(section) {
        // Timer durations in minutes
        const durations = {
            listening: 30,
            reading: 60,
            writing: 60,
            speaking: 15,
            full: 165 // 2 hours 45 minutes
        };
        
        let timeLeft = (durations[section] || 60) * 60; // Convert to seconds
        this.testStartTime = Date.now();
        
        this.sectionTimer = setInterval(() => {
            timeLeft--;
            
            if (timeLeft <= 0) {
                this.handleTimeUp();
                return;
            }
            
            this.updateTimerDisplay(timeLeft);
        }, 1000);
        
        this.updateTimerDisplay(timeLeft);
    }

    updateTimerDisplay(timeLeft) {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        const display = hours > 0 ? 
            `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` :
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('timer-display').textContent = display;
        
        // Change color when time is running low (last 5 minutes)
        const timerElement = document.getElementById('timer-display');
        if (timeLeft <= 300) {
            timerElement.style.color = '#E74C3C';
        } else {
            timerElement.style.color = '';
        }
    }

    handleTimeUp() {
        clearInterval(this.sectionTimer);
        this.showModal('Time Up!', 'Your test time has expired. Submitting your answers now.', () => {
            this.finishTest();
        });
    }

    // Additional utility functions
    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loading-overlay');
        const text = document.querySelector('.loading-text');
        
        if (overlay && text) {
            text.textContent = message;
            overlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    showError(message) {
        alert(message); // Temporary - should be replaced with a proper modal
    }

    showDemo() {
        alert('Demo feature coming soon!');
    }

    // Navigation and control functions would continue here...
    // This is a substantial foundation for the IELTS test platform
}

// Global functions that are called from HTML
function startTest() {
    window.ieltsTest.startFullTest();
}

function startFullTest() {
    window.ieltsTest.startFullTest();
}

function startSectionTest(section) {
    window.ieltsTest.startSectionTest(section);
}

function showDemo() {
    window.ieltsTest.showDemo();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.ieltsTest = new IELTSMockTest();
});

// Handle page visibility changes (for timer management)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Tab hidden - consider pausing timer');
    } else {
        console.log('Tab visible - resume normal operation');
    }
});