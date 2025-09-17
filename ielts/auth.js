// Authentication Module for IELTS Platform
class IELTSAuth {
    constructor() {
        this.currentUser = null;
        this.isAuthModalOpen = false;
        this.isRegistrationMode = false;
        this.initializeAuth();
    }

    async initializeAuth() {
        try {
            // Check if user is already logged in
            const { data: { session }, error } = await supabase.auth.getSession();
            
            if (error) {
                console.error('Session check error:', error);
                return;
            }

            if (session) {
                this.currentUser = session.user;
                this.updateUIForLoggedInUser();
                console.log('✅ User already logged in:', this.currentUser.email);
            } else {
                this.updateUIForLoggedOutUser();
            }

            // Listen for auth changes
            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN') {
                    this.currentUser = session.user;
                    this.updateUIForLoggedInUser();
                    this.closeAuthModal();
                    showSuccess(SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS);
                    console.log('✅ User signed in:', this.currentUser.email);
                } else if (event === 'SIGNED_OUT') {
                    this.currentUser = null;
                    this.updateUIForLoggedOutUser();
                    showSuccess(SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS);
                    console.log('👋 User signed out');
                }
            });

        } catch (error) {
            console.error('Auth initialization error:', error);
            showError(ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR);
        }
    }

    updateUIForLoggedInUser() {
        const authButton = document.getElementById('auth-button');
        const userProfile = document.getElementById('user-profile');
        const userEmail = document.getElementById('user-email');

        if (authButton) authButton.style.display = 'none';
        if (userProfile) {
            userProfile.style.display = 'flex';
            if (userEmail) userEmail.textContent = this.currentUser.email;
        }
    }

    updateUIForLoggedOutUser() {
        const authButton = document.getElementById('auth-button');
        const userProfile = document.getElementById('user-profile');

        if (authButton) authButton.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }

    showAuthModal(isRegistration = false) {
        this.isRegistrationMode = isRegistration;
        const modal = document.getElementById('auth-modal');
        const title = document.getElementById('auth-title');
        const submitButton = document.getElementById('auth-submit');
        const registerFields = document.getElementById('register-fields');
        const switchText = document.getElementById('switch-text');
        const switchButton = document.getElementById('switch-button');

        if (isRegistration) {
            title.textContent = '注册账户';
            submitButton.textContent = '注册';
            registerFields.style.display = 'block';
            switchText.textContent = '已有账户？';
            switchButton.textContent = '登录';
        } else {
            title.textContent = '登录账户';
            submitButton.textContent = '登录';
            registerFields.style.display = 'none';
            switchText.textContent = '还没有账户？';
            switchButton.textContent = '注册';
        }

        modal.style.display = 'flex';
        this.isAuthModalOpen = true;
        
        // Focus on email field
        setTimeout(() => {
            document.getElementById('email').focus();
        }, 100);
    }

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        modal.style.display = 'none';
        this.isAuthModalOpen = false;
        this.clearAuthForm();
    }

    toggleAuthMode() {
        this.showAuthModal(!this.isRegistrationMode);
    }

    clearAuthForm() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
        document.getElementById('full-name').value = '';
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateRegistrationForm(email, password, confirmPassword, fullName) {
        if (!this.validateEmail(email)) {
            showError(ERROR_MESSAGES.AUTH.INVALID_EMAIL);
            return false;
        }

        if (!this.validatePassword(password)) {
            showError(ERROR_MESSAGES.AUTH.WEAK_PASSWORD);
            return false;
        }

        if (password !== confirmPassword) {
            showError(ERROR_MESSAGES.AUTH.PASSWORD_MISMATCH);
            return false;
        }

        if (!fullName.trim()) {
            showError('请输入您的姓名');
            return false;
        }

        return true;
    }

    async handleAuth(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const submitButton = document.getElementById('auth-submit');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = this.isRegistrationMode ? '注册中...' : '登录中...';

        try {
            if (this.isRegistrationMode) {
                await this.handleRegistration(email, password);
            } else {
                await this.handleLogin(email, password);
            }
        } catch (error) {
            console.error('Auth error:', error);
            showError(this.isRegistrationMode ? 
                ERROR_MESSAGES.AUTH.REGISTRATION_FAILED : 
                ERROR_MESSAGES.AUTH.LOGIN_FAILED);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = this.isRegistrationMode ? '注册' : '登录';
        }
    }

    async handleLogin(email, password) {
        if (!this.validateEmail(email)) {
            showError(ERROR_MESSAGES.AUTH.INVALID_EMAIL);
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Login error:', error);
            showError(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
            return;
        }

        console.log('✅ Login successful:', data);
    }

    async handleRegistration(email, password) {
        const confirmPassword = document.getElementById('confirm-password').value;
        const fullName = document.getElementById('full-name').value.trim();

        if (!this.validateRegistrationForm(email, password, confirmPassword, fullName)) {
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    created_at: new Date().toISOString()
                }
            }
        });

        if (error) {
            console.error('Registration error:', error);
            showError(ERROR_MESSAGES.AUTH.REGISTRATION_FAILED);
            return;
        }

        console.log('✅ Registration successful:', data);
        
        // Create user profile in database
        await this.createUserProfile(data.user, fullName);
        
        showSuccess(SUCCESS_MESSAGES.AUTH.REGISTRATION_SUCCESS);
    }

    async createUserProfile(user, fullName) {
        try {
            const { error } = await supabase
                .from(TABLES.USERS)
                .insert([
                    {
                        id: user.id,
                        email: user.email,
                        full_name: fullName,
                        created_at: new Date().toISOString(),
                        total_tests: 0,
                        best_overall_score: 0,
                        best_listening_score: 0,
                        best_reading_score: 0,
                        best_writing_score: 0,
                        best_speaking_score: 0
                    }
                ]);

            if (error) {
                console.error('Profile creation error:', error);
                return;
            }

            console.log('✅ User profile created successfully');
        } catch (error) {
            console.error('Profile creation error:', error);
        }
    }

    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                console.error('Logout error:', error);
                showError('退出登录失败');
                return;
            }

            // Redirect to home section
            showSection('home');
            
        } catch (error) {
            console.error('Logout error:', error);
            showError(ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR);
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    async getUserProfile() {
        if (!this.isLoggedIn()) {
            return null;
        }

        try {
            const { data, error } = await supabase
                .from(TABLES.USERS)
                .select('*')
                .eq('id', this.currentUser.id)
                .single();

            if (error) {
                console.error('Profile fetch error:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            return null;
        }
    }

    async updateUserProfile(updates) {
        if (!this.isLoggedIn()) {
            return false;
        }

        try {
            const { error } = await supabase
                .from(TABLES.USERS)
                .update(updates)
                .eq('id', this.currentUser.id);

            if (error) {
                console.error('Profile update error:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Profile update error:', error);
            return false;
        }
    }

    // Method to check if user needs to be logged in for certain actions
    requireAuth(action) {
        if (!this.isLoggedIn()) {
            showError('请先登录后再进行此操作');
            this.showAuthModal();
            return false;
        }
        return true;
    }
}

// Initialize auth system
let auth = null;

// Global auth functions
function showAuthModal() {
    if (auth) {
        auth.showAuthModal();
    }
}

function closeAuthModal() {
    if (auth) {
        auth.closeAuthModal();
    }
}

function toggleAuthMode() {
    if (auth) {
        auth.toggleAuthMode();
    }
}

async function logout() {
    if (auth) {
        await auth.logout();
    }
}

// Initialize auth when supabase is ready
function initializeAuth() {
    auth = new IELTSAuth();
    
    // Setup auth form handler
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => auth.handleAuth(e));
    }

    // Setup auth button click handler
    const authButton = document.getElementById('auth-button');
    if (authButton) {
        authButton.addEventListener('click', () => auth.showAuthModal());
    }

    // Setup modal close handlers
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                auth.closeAuthModal();
            }
        });
    }

    // Setup escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && auth.isAuthModalOpen) {
            auth.closeAuthModal();
        }
    });

    console.log('🔐 Authentication system initialized');
}

// Export auth instance for use in other modules
window.IELTSAuth = auth;