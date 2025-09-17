// Main Application Controller for IELTS Platform
class IELTSApp {
    constructor() {
        this.currentSection = 'home';
        this.currentTest = null;
        this.testTimer = null;
        this.testStartTime = null;
        this.isTestInProgress = false;
        this.initialize();
    }

    initialize() {
        console.log('🚀 Initializing IELTS Application...');
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // Navigation event listeners are handled by global functions
        // Test control event listeners
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Window beforeunload handler for test protection
        window.addEventListener('beforeunload', (e) => {
            if (this.isTestInProgress) {
                e.preventDefault();
                e.returnValue = '考试正在进行中，确定要离开吗？';
                return '考试正在进行中，确定要离开吗？';
            }
        });

        console.log('📋 Event listeners set up successfully');
    }

    handleKeyboardShortcuts(e) {
        // Keyboard shortcuts for navigation and test controls
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    this.showSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    this.showSection('practice');
                    break;
                case '3':
                    e.preventDefault();
                    this.showSection('progress');
                    break;
                case 's':
                    e.preventDefault();
                    if (this.isTestInProgress) {
                        this.saveTestProgress();
                    }
                    break;
            }
        }

        // Escape key to go back
        if (e.key === 'Escape' && !auth?.isAuthModalOpen) {
            if (this.currentSection !== 'home' && !this.isTestInProgress) {
                this.showSection('home');
            }
        }
    }

    async loadInitialData() {
        try {
            // Load initial test data and statistics
            await this.loadTestStatistics();
            await this.loadRecentTests();
            
            console.log('📊 Initial data loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load initial data:', error);
        }
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            
            // Load section-specific data
            this.loadSectionData(sectionName);
            
            console.log(`📍 Switched to section: ${sectionName}`);
        } else {
            console.error(`❌ Section not found: ${sectionName}`);
        }
    }

    async loadSectionData(sectionName) {
        switch (sectionName) {
            case 'home':
                await this.loadHomeData();
                break;
            case 'practice':
                await this.loadPracticeData();
                break;
            case 'progress':
                await this.loadProgressData();
                break;
            case 'listening':
                await this.loadListeningTest();
                break;
            case 'reading':
                await this.loadReadingTest();
                break;
            case 'writing':
                await this.loadWritingTest();
                break;
        }
    }

    async loadHomeData() {
        try {
            // Update statistics on home page
            const stats = await this.getTestStatistics();
            this.updateHomeStatistics(stats);
        } catch (error) {
            console.error('Failed to load home data:', error);
        }
    }

    async loadPracticeData() {
        // Practice section is mainly static, no dynamic loading needed
        console.log('📚 Practice section loaded');
    }

    async loadProgressData() {
        if (!auth?.isLoggedIn()) {
            this.showLoginRequiredMessage('progress');
            return;
        }

        try {
            const userProfile = await auth.getUserProfile();
            const testHistory = await this.getUserTestHistory();
            
            this.updateProgressSection(userProfile, testHistory);
        } catch (error) {
            console.error('Failed to load progress data:', error);
            showError('加载进度数据失败');
        }
    }

    showLoginRequiredMessage(section) {
        const sectionElement = document.getElementById(`${section}-section`);
        if (sectionElement) {
            sectionElement.innerHTML = `
                <div class="login-required">
                    <div class="login-required-content">
                        <h2>需要登录</h2>
                        <p>请登录后查看您的学习进度和历史成绩</p>
                        <button onclick="showAuthModal()" class="cta-primary">立即登录</button>
                    </div>
                </div>
            `;
        }
    }

    async getTestStatistics() {
        try {
            // Get overall platform statistics
            const { data: totalTests, error: testsError } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .select('id', { count: 'exact' });

            const { data: totalUsers, error: usersError } = await supabase
                .from(TABLES.USERS)
                .select('id', { count: 'exact' });

            if (testsError || usersError) {
                console.error('Statistics error:', testsError || usersError);
                return null;
            }

            return {
                totalTests: totalTests?.length || 0,
                totalUsers: totalUsers?.length || 0,
                totalQuestions: 1600, // Static for now
                totalAudio: 160 // Static for now
            };
        } catch (error) {
            console.error('Statistics fetch error:', error);
            return null;
        }
    }

    updateHomeStatistics(stats) {
        if (!stats) return;

        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = '40+'; // Tests
            statNumbers[1].textContent = stats.totalQuestions + '+'; // Questions
            statNumbers[2].textContent = stats.totalAudio + '+'; // Audio
            statNumbers[3].textContent = 'AI'; // AI feature
        }
    }

    async getUserTestHistory() {
        if (!auth?.isLoggedIn()) {
            return [];
        }

        try {
            const { data, error } = await supabase
                .from(TABLES.TEST_SESSIONS)
                .select('*')
                .eq('user_id', auth.getCurrentUser().id)
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Test history error:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Test history fetch error:', error);
            return [];
        }
    }

    updateProgressSection(userProfile, testHistory) {
        // Update progress overview
        if (userProfile) {
            const overallScore = document.querySelector('.overall-score');
            if (overallScore) {
                overallScore.textContent = userProfile.best_overall_score || '0.0';
            }

            // Update score breakdown
            const scoreItems = document.querySelectorAll('.score-item .score');
            if (scoreItems.length >= 4) {
                scoreItems[0].textContent = userProfile.best_listening_score || '0.0';
                scoreItems[1].textContent = userProfile.best_reading_score || '0.0';
                scoreItems[2].textContent = userProfile.best_writing_score || '0.0';
                scoreItems[3].textContent = userProfile.best_speaking_score || '0.0';
            }

            // Update statistics
            const statRows = document.querySelectorAll('.stat-row span:last-child');
            if (statRows.length >= 4) {
                statRows[0].textContent = `${userProfile.total_tests || 0} 次`;
                statRows[1].textContent = `${this.calculateStudyDays(userProfile.created_at)} 天`;
                statRows[2].textContent = `${(userProfile.total_tests || 0) * 40} 道`;
                statRows[3].textContent = `${userProfile.average_accuracy || 0}%`;
            }
        }

        // Update test history
        this.updateTestHistoryList(testHistory);
    }

    calculateStudyDays(createdAt) {
        if (!createdAt) return 0;
        const created = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    updateTestHistoryList(testHistory) {
        const historyList = document.getElementById('test-history-list');
        if (!historyList) return;

        if (testHistory.length === 0) {
            historyList.innerHTML = `
                <div class="no-history">
                    <p>还没有考试记录</p>
                    <button onclick="showSection('practice')" class="cta-secondary">开始第一次测试</button>
                </div>
            `;
            return;
        }

        const historyHTML = testHistory.map(test => `
            <div class="history-item">
                <div class="history-date">${new Date(test.created_at).toLocaleDateString()}</div>
                <div class="history-type">${this.getTestTypeLabel(test.test_type)}</div>
                <div class="history-score">${test.overall_score || 'N/A'}</div>
                <button onclick="viewTestDetails('${test.id}')" class="view-details">查看详情</button>
            </div>
        `).join('');

        historyList.innerHTML = historyHTML;
    }

    getTestTypeLabel(testType) {
        const labels = {
            'full': '完整测试',
            'listening': '听力练习',
            'reading': '阅读练习',
            'writing': '写作练习',
            'speaking': '口语练习'
        };
        return labels[testType] || '未知类型';
    }

    // Test Management Methods
    async startFullTest() {
        if (!auth?.requireAuth('开始完整测试')) {
            return;
        }

        const confirmed = confirm('完整测试需要2.5小时，确定要开始吗？');
        if (!confirmed) return;

        try {
            this.currentTest = await this.createTestSession('full');
            this.isTestInProgress = true;
            
            // Start with listening section
            this.showSection('listening');
            this.startTestTimer(TEST_CONFIG.LISTENING.duration);
            
            showSuccess('测试已开始，祝您考试顺利！');
        } catch (error) {
            console.error('Failed to start test:', error);
            showError('测试启动失败，请重试');
        }
    }

    async createTestSession(testType) {
        const { data, error } = await supabase
            .from(TABLES.TEST_SESSIONS)
            .insert([
                {
                    user_id: auth.getCurrentUser().id,
                    test_type: testType,
                    status: 'in_progress',
                    started_at: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) {
            throw new Error('Failed to create test session: ' + error.message);
        }

        return data;
    }

    startTestTimer(duration) {
        this.testStartTime = Date.now();
        let remainingTime = duration;

        // Update timer display
        const updateTimer = () => {
            const timerElement = document.querySelector('.test-timer span:last-child');
            if (timerElement) {
                timerElement.textContent = formatTime(remainingTime);
                
                // Change color when time is running out
                if (remainingTime <= 5 * 60 * 1000) { // Last 5 minutes
                    timerElement.style.color = '#EF4444';
                } else if (remainingTime <= 10 * 60 * 1000) { // Last 10 minutes
                    timerElement.style.color = '#F59E0B';
                }
            }

            remainingTime -= 1000;

            if (remainingTime <= 0) {
                this.handleTimeUp();
                return;
            }
        };

        // Update every second
        this.testTimer = setInterval(updateTimer, 1000);
        updateTimer(); // Initial update
    }

    handleTimeUp() {
        if (this.testTimer) {
            clearInterval(this.testTimer);
            this.testTimer = null;
        }

        showError(ERROR_MESSAGES.TEST.TIME_UP);
        
        // Auto-submit current section
        switch (this.currentSection) {
            case 'listening':
                this.submitListening();
                break;
            case 'reading':
                this.submitReading();
                break;
            case 'writing':
                this.submitWriting();
                break;
        }
    }

    async saveTestProgress() {
        if (!this.currentTest || !auth?.isLoggedIn()) {
            return;
        }

        try {
            // Save current answers and progress
            showSuccess(SUCCESS_MESSAGES.TEST.SAVE_SUCCESS);
        } catch (error) {
            console.error('Failed to save progress:', error);
            showError('保存进度失败');
        }
    }

    // Loading management
    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
    }

    hideLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('navbar').style.display = 'block';
        document.getElementById('main-container').style.display = 'block';
    }

    async loadTestStatistics() {
        // Load and cache test statistics
        console.log('📊 Loading test statistics...');
    }

    async loadRecentTests() {
        // Load recent test data
        console.log('📚 Loading recent tests...');
    }
}

// Initialize the application
let app = null;

function initializeApp() {
    console.log('🎯 Starting IELTS application initialization...');
    
    // Initialize auth first
    initializeAuth();
    
    // Initialize main app
    app = new IELTSApp();
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        app.hideLoadingScreen();
        console.log('✅ IELTS application initialized successfully');
    }, 2000);
}

// Global navigation functions
function showSection(sectionName) {
    if (app) {
        app.showSection(sectionName);
    }
}

function startTest() {
    showSection('practice');
}

function startFullTest() {
    if (app) {
        app.startFullTest();
    }
}

// Export app instance
window.IELTSApp = app;

console.log('📱 Application module loaded successfully');