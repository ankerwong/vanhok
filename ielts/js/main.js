// Vanhok IELTS Mock Test Platform - Main JavaScript

// Language configurations
const LANGUAGES = {
    en: {
        // Navigation & Header
        nav_home: 'Home',
        nav_about: 'About',
        nav_features: 'Features',
        nav_contact: 'Contact',
        
        // Hero Section
        hero_title: 'Master Your <span class="highlight">IELTS</span> Success',
        hero_description: 'Experience authentic IELTS practice with our comprehensive mock test platform. Get instant AI-powered feedback and detailed performance analysis.',
        
        // Buttons
        btn_start_test: 'Start Mock Test',
        btn_view_demo: 'View Demo',
        btn_full_test: 'Start Full Test',
        
        // Test Sections
        test_listening: 'Listening',
        test_reading: 'Reading', 
        test_writing: 'Writing',
        test_speaking: 'Speaking',
        
        // Loading Messages
        loading_demo_test: 'Loading IELTS demo test...',
        loading_full_test: 'Initializing full IELTS mock test...',
        
        // Error Messages
        error_start_test: 'Failed to start test. Please try again.',
        
        // Status Messages
        demo_mode_title: '🎯 IELTS Demo Mode',
        demo_mode_text: 'You\'re viewing the demo version. For full functionality with AI grading, visit the complete platform.',
        
        // Test Interface
        question_navigator: 'Question Navigator',
        finish_test: 'Finish Test',
        next_question: 'Next',
        prev_question: 'Previous',
        flag_review: 'Flag for Review'
    },
    zh: {
        // Navigation & Header  
        nav_home: '首页',
        nav_about: '关于我们',
        nav_features: '功能特色',
        nav_contact: '联系我们',
        
        // Hero Section
        hero_title: '掌握您的<span class="highlight">雅思</span>成功',
        hero_description: '通过我们全面的模拟考试平台体验真实的雅思练习。获得即时AI反馈和详细的表现分析。',
        
        // Buttons
        btn_start_test: '开始模拟考试',
        btn_view_demo: '查看演示',
        btn_full_test: '开始完整测试',
        
        // Test Sections
        test_listening: '听力',
        test_reading: '阅读',
        test_writing: '写作', 
        test_speaking: '口语',
        
        // Loading Messages
        loading_demo_test: '正在加载雅思演示测试...',
        loading_full_test: '正在初始化完整雅思模拟考试...',
        
        // Error Messages
        error_start_test: '启动测试失败，请重试。',
        
        // Status Messages
        demo_mode_title: '🎯 雅思演示模式',
        demo_mode_text: '您正在查看演示版本。如需AI批改等完整功能，请访问完整平台。',
        
        // Test Interface
        question_navigator: '题目导航',
        finish_test: '完成测试',
        next_question: '下一题',
        prev_question: '上一题',
        flag_review: '标记复习'
    }
};

// Demo questions data for offline mode
const DEMO_QUESTIONS = {
    listening: [
        {
            id: 'demo_l_001',
            section: 1,
            question_number: 1,
            question_type: 'fill_blank',
            question_text: 'Name: Sarah ____',
            correct_answer: 'Thompson',
            difficulty: 'easy'
        },
        {
            id: 'demo_l_002', 
            section: 1,
            question_number: 2,
            question_type: 'multiple_choice',
            question_text: 'What type of accommodation is Sarah looking for?',
            correct_answer: 'B',
            options: ['A) Hotel', 'B) Shared apartment', 'C) Studio flat'],
            difficulty: 'easy'
        }
    ],
    reading: [
        {
            id: 'demo_r_001',
            passage_title: 'The History of Chocolate',
            passage_text: 'Chocolate has a rich and fascinating history that spans thousands of years. The ancient Mayans and Aztecs were among the first civilizations to cultivate cacao beans...',
            question_number: 1,
            question_type: 'true_false_not_given',
            question_text: 'The Mayans used chocolate primarily for trade purposes.',
            correct_answer: 'FALSE',
            difficulty: 'medium'
        }
    ],
    writing: [
        {
            id: 'demo_w_001',
            task_number: 1,
            question_type: 'chart_description',
            question_text: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.',
            word_limit: 150,
            time_limit: 20,
            difficulty: 'medium'
        }
    ],
    speaking: [
        {
            id: 'demo_s_001',
            part: 1,
            question_type: 'personal_info',
            question_text: 'Could you tell me your full name, please?',
            difficulty: 'easy'
        }
    ]
};

class IELTSMockTest {
    constructor() {
        // Language support
        this.currentLang = localStorage.getItem('ielts_language') || 'en';
        
        // Detect if running on GitHub Pages or local server
        const isGitHubPages = window.location.hostname === 'ankerwong.github.io';
        this.API_BASE = isGitHubPages ? 
            'https://3001-ikyp6x1d3mbzuq3x8kgwq-6532622b.e2b.dev/api' : 
            window.location.origin + '/api';
        this.isStaticMode = isGitHubPages;
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
        this.initLanguage();
        this.initEventListeners();
        this.initNavigation();
        this.initResponsiveFeatures();
        
        // Show notification if running in static mode
        if (this.isStaticMode) {
            this.showStaticModeNotification();
        }
    }

    initLanguage() {
        // Create language switcher
        this.createLanguageSwitcher();
        // Apply initial language
        this.updatePageLanguage();
    }

    createLanguageSwitcher() {
        const navbar = document.querySelector('.nav-menu');
        if (navbar) {
            const langSwitcher = document.createElement('li');
            langSwitcher.className = 'nav-item lang-switcher';
            langSwitcher.innerHTML = `
                <div class="language-toggle">
                    <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                    <button class="lang-btn ${this.currentLang === 'zh' ? 'active' : ''}" data-lang="zh">中文</button>
                </div>
            `;
            navbar.appendChild(langSwitcher);

            // Add event listeners
            langSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.switchLanguage(e.target.dataset.lang);
                });
            });
        }
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        localStorage.setItem('ielts_language', lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update page content
        this.updatePageLanguage();
    }

    getText(key) {
        return LANGUAGES[this.currentLang][key] || LANGUAGES['en'][key] || key;
    }

    updatePageLanguage() {
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks.length >= 4) {
            navLinks[0].textContent = this.getText('nav_home');
            navLinks[1].textContent = this.getText('nav_about');  
            navLinks[2].textContent = this.getText('nav_features');
            navLinks[3].textContent = this.getText('nav_contact');
        }

        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = this.getText('hero_title');
        }

        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) {
            heroDesc.textContent = this.getText('hero_description');
        }

        // Update buttons
        const startBtns = document.querySelectorAll('[onclick*="startTest"], [onclick*="startFullTest"]');
        startBtns.forEach(btn => {
            if (btn.textContent.includes('Start') || btn.textContent.includes('开始')) {
                btn.innerHTML = `<i class="fas fa-play-circle"></i> ${this.getText('btn_start_test')}`;
            }
        });

        const demoBtns = document.querySelectorAll('[onclick*="showDemo"]');
        demoBtns.forEach(btn => {
            btn.innerHTML = `<i class="fas fa-eye"></i> ${this.getText('btn_view_demo')}`;
        });

        // Update test sections
        const sectionSpans = document.querySelectorAll('.section-card span:not(.duration)');
        const sectionMappings = ['test_listening', 'test_reading', 'test_writing', 'test_speaking'];
        sectionSpans.forEach((span, index) => {
            if (index < sectionMappings.length) {
                span.textContent = this.getText(sectionMappings[index]);
            }
        });
    }

    loadDemoQuestions() {
        // Load demo questions for static mode
        this.questions = DEMO_QUESTIONS;
        console.log('Loaded demo questions for static mode');
    }

    showStaticModeNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2C5AA0, #4A90E2);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 350px;
            font-family: 'Inter', sans-serif;
        `;
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px;">
                ${this.getText('demo_mode_title')}
            </div>
            <div style="font-size: 0.9em; line-height: 1.4;">
                ${this.getText('demo_mode_text')}
                <a href="https://3001-ikyp6x1d3mbzuq3x8kgwq-6532622b.e2b.dev" 
                   style="color: #F39C12; text-decoration: underline;"
                   target="_blank">${this.currentLang === 'zh' ? '完整平台' : 'complete platform'}</a>.
            </div>
            <button onclick="this.parentElement.remove()" 
                    style="position: absolute; top: 5px; right: 8px; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">×</button>
        `;
        document.body.appendChild(notification);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 8000);
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
        this.showLoading(this.isStaticMode ? 
            this.getText('loading_demo_test') : 
            this.getText('loading_full_test'));
        
        try {
            if (this.isStaticMode) {
                // Static mode - use offline demo data
                this.currentSession = 'demo-' + Date.now();
                this.loadDemoQuestions();
            } else {
                // Online mode - use backend API
                const session = await this.createTestSession('full');
                this.currentSession = session.sessionId;
                await this.loadAllSections();
            }
            
            this.hideLoading();
            this.showTestInterface('listening');
            
        } catch (error) {
            console.error('Error starting full test:', error);
            this.hideLoading();
            this.showError(this.getText('error_start_test'));
        }
    }

    async startSectionTest(section) {
        const sectionName = this.getText(`test_${section}`);
        this.showLoading(this.isStaticMode ? 
            `${this.getText('loading_demo_test')} - ${sectionName}` : 
            `Preparing ${sectionName} test section...`);
        
        try {
            if (this.isStaticMode) {
                // Static mode - use offline demo data
                this.currentSession = 'demo-' + Date.now();
                this.currentSection = section;
                this.loadDemoQuestions();
                this.questions = DEMO_QUESTIONS[section] || [];
            } else {
                // Online mode - use backend API
                const session = await this.createTestSession(section);
                this.currentSession = session.sessionId;
                this.currentSection = section;
                await this.loadSectionQuestions(section);
            }
            
            this.hideLoading();
            this.showTestInterface(section);
            
        } catch (error) {
            console.error(`Error starting ${section} test:`, error);
            this.hideLoading();
            this.showError(`${this.getText('error_start_test')} (${sectionName})`);
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
        const errorModal = document.createElement('div');
        errorModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            font-family: 'Inter', sans-serif;
        `;
        
        errorModal.innerHTML = `
            <div style="
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 16px 48px rgba(0,0,0,0.2);
            ">
                <div style="
                    color: #E74C3C;
                    font-size: 3rem;
                    margin-bottom: 15px;
                ">⚠️</div>
                <h3 style="
                    color: #2C3E50;
                    margin-bottom: 15px;
                    font-size: 1.3rem;
                ">${this.currentLang === 'zh' ? '错误' : 'Error'}</h3>
                <p style="
                    color: #6C757D;
                    margin-bottom: 25px;
                    line-height: 1.5;
                ">${message}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #E74C3C;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#C0392B'" 
                   onmouseout="this.style.background='#E74C3C'">
                    ${this.currentLang === 'zh' ? '确定' : 'OK'}
                </button>
            </div>
        `;
        
        document.body.appendChild(errorModal);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorModal.parentElement) {
                errorModal.remove();
            }
        }, 5000);
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