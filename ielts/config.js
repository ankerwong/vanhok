// Supabase Configuration
const SUPABASE_CONFIG = {
    url: 'https://xbznvwhoykiwtwiyipzp.supabase.co',
    anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhiem52d2hveWtpd3R3aXlpcHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0ODY2MTgsImV4cCI6MjA0MjA2MjYxOH0.VfvxhLdJ2ZQ16KSfKIFvf2nfHBsIVud02DIkmoRrV0U'
};

// Database Table Names
const TABLES = {
    USERS: 'users',
    TEST_SESSIONS: 'test_sessions',
    LISTENING_QUESTIONS: 'listening_questions',
    READING_QUESTIONS: 'reading_questions', 
    WRITING_QUESTIONS: 'writing_questions',
    SPEAKING_QUESTIONS: 'speaking_questions',
    USER_ANSWERS: 'user_answers',
    AUDIO_FILES: 'audio_files'
};

// Test Configuration
const TEST_CONFIG = {
    LISTENING: {
        duration: 30 * 60 * 1000, // 30 minutes in milliseconds
        sections: 4,
        questionsPerSection: 10,
        totalQuestions: 40
    },
    READING: {
        duration: 60 * 60 * 1000, // 60 minutes in milliseconds
        passages: 3,
        questionsPerPassage: 13,
        totalQuestions: 40
    },
    WRITING: {
        duration: 60 * 60 * 1000, // 60 minutes in milliseconds
        task1Duration: 20 * 60 * 1000, // 20 minutes
        task2Duration: 40 * 60 * 1000, // 40 minutes
        task1MinWords: 150,
        task2MinWords: 250
    },
    SPEAKING: {
        duration: 15 * 60 * 1000, // 15 minutes in milliseconds
        parts: 3
    }
};

// IELTS Band Scores
const BAND_SCORES = {
    LISTENING: {
        39: 9.0, 37: 8.5, 35: 8.0, 32: 7.5, 30: 7.0,
        26: 6.5, 23: 6.0, 18: 5.5, 16: 5.0, 13: 4.5,
        10: 4.0, 8: 3.5, 6: 3.0, 4: 2.5, 3: 2.0,
        2: 1.5, 1: 1.0, 0: 0.0
    },
    READING: {
        39: 9.0, 37: 8.5, 35: 8.0, 33: 7.5, 30: 7.0,
        27: 6.5, 23: 6.0, 19: 5.5, 15: 5.0, 13: 4.5,
        10: 4.0, 8: 3.5, 6: 3.0, 4: 2.5, 3: 2.0,
        2: 1.5, 1: 1.0, 0: 0.0
    }
};

// Question Types
const QUESTION_TYPES = {
    LISTENING: {
        FILL_BLANK: 'fill_blank',
        MULTIPLE_CHOICE: 'multiple_choice',
        MATCHING: 'matching',
        MAP_LABELING: 'map_labeling',
        FORM_COMPLETION: 'form_completion'
    },
    READING: {
        TRUE_FALSE_NOT_GIVEN: 'true_false_not_given',
        YES_NO_NOT_GIVEN: 'yes_no_not_given',
        MULTIPLE_CHOICE: 'multiple_choice',
        MATCHING: 'matching',
        FILL_BLANK: 'fill_blank',
        SENTENCE_COMPLETION: 'sentence_completion',
        SUMMARY_COMPLETION: 'summary_completion'
    },
    WRITING: {
        TASK1_CHART: 'task1_chart',
        TASK1_PROCESS: 'task1_process',
        TASK1_MAP: 'task1_map',
        TASK2_OPINION: 'task2_opinion',
        TASK2_DISCUSSION: 'task2_discussion',
        TASK2_PROBLEM_SOLUTION: 'task2_problem_solution'
    },
    SPEAKING: {
        PERSONAL_INFO: 'personal_info',
        LONG_TURN: 'long_turn',
        DISCUSSION: 'discussion'
    }
};

// Sample Test Data Structure
const SAMPLE_QUESTIONS = {
    listening: [
        {
            id: 'L001',
            section: 1,
            question_number: 1,
            question_type: QUESTION_TYPES.LISTENING.FILL_BLANK,
            question_text: 'The man wants to book a room for _______ nights.',
            audio_file: 'listening_section1.mp3',
            correct_answer: 'three',
            options: null,
            audio_start_time: 0,
            audio_end_time: 30
        },
        {
            id: 'L002', 
            section: 1,
            question_number: 2,
            question_type: QUESTION_TYPES.LISTENING.MULTIPLE_CHOICE,
            question_text: 'What type of room does the man prefer?',
            audio_file: 'listening_section1.mp3',
            correct_answer: 'B',
            options: ['A) Single room', 'B) Double room', 'C) Twin room', 'D) Suite'],
            audio_start_time: 30,
            audio_end_time: 60
        }
    ],
    reading: [
        {
            id: 'R001',
            passage_id: 'P001',
            passage_title: 'Climate Change and Coral Reefs',
            passage_text: `Coral reefs are among the most diverse ecosystems on Earth, supporting approximately 25% of all marine species. However, these vibrant underwater communities face unprecedented threats from climate change...`,
            question_number: 1,
            question_type: QUESTION_TYPES.READING.TRUE_FALSE_NOT_GIVEN,
            question_text: 'Coral reefs support more than 25% of marine species.',
            correct_answer: 'FALSE',
            options: ['TRUE', 'FALSE', 'NOT GIVEN']
        }
    ],
    writing: [
        {
            id: 'W001',
            task_number: 1,
            question_type: QUESTION_TYPES.WRITING.TASK1_CHART,
            question_text: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
            prompt_image: 'chart_housing_trends.png',
            word_limit: 150,
            time_limit: 20
        },
        {
            id: 'W002',
            task_number: 2, 
            question_type: QUESTION_TYPES.WRITING.TASK2_OPINION,
            question_text: 'Some people believe that technology has made our lives easier and more convenient. Others argue that technology has made our lives more complicated and stressful. Discuss both views and give your own opinion.',
            word_limit: 250,
            time_limit: 40
        }
    ]
};

// Error Messages
const ERROR_MESSAGES = {
    AUTH: {
        INVALID_EMAIL: '请输入有效的邮箱地址',
        WEAK_PASSWORD: '密码至少需要6个字符',
        PASSWORD_MISMATCH: '两次输入的密码不一致',
        LOGIN_FAILED: '邮箱或密码错误',
        REGISTRATION_FAILED: '注册失败，请稍后重试'
    },
    TEST: {
        LOAD_FAILED: '测试加载失败，请刷新页面重试',
        SUBMIT_FAILED: '提交失败，请检查网络连接',
        AUDIO_LOAD_FAILED: '音频加载失败，请检查网络连接',
        TIME_UP: '时间已到，系统将自动提交答案'
    },
    GENERAL: {
        NETWORK_ERROR: '网络连接错误，请检查网络设置',
        SERVER_ERROR: '服务器错误，请稍后重试',
        UNKNOWN_ERROR: '未知错误，请联系技术支持'
    }
};

// Success Messages
const SUCCESS_MESSAGES = {
    AUTH: {
        LOGIN_SUCCESS: '登录成功！',
        REGISTRATION_SUCCESS: '注册成功！请查收邮箱确认邮件',
        LOGOUT_SUCCESS: '已安全退出'
    },
    TEST: {
        SUBMIT_SUCCESS: '答案提交成功！',
        SAVE_SUCCESS: '进度已保存',
        AUDIO_READY: '音频已准备就绪'
    }
};

// API Endpoints (for external resources)
const API_ENDPOINTS = {
    CAMBRIDGE_IELTS: 'https://ieltstestsimulation.com/api/',
    BRITISH_COUNCIL: 'https://takeielts.britishcouncil.org/api/',
    AUDIO_CDN: 'https://cdn.ielts-audio.com/'
};

// Storage Buckets in Supabase
const STORAGE_BUCKETS = {
    AUDIO_FILES: 'ielts-audio',
    IMAGES: 'ielts-images',
    USER_RECORDINGS: 'user-recordings'
};

// Initialize Supabase Client
let supabase = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize Supabase client
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url, 
            SUPABASE_CONFIG.anon_key
        );
        
        console.log('✅ Supabase client initialized successfully');
        
        // Initialize the application
        initializeApp();
        
    } catch (error) {
        console.error('❌ Failed to initialize Supabase:', error);
        showError('初始化失败，请刷新页面重试');
    }
});

// Utility Functions
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function calculateBandScore(correctAnswers, section) {
    const bandMap = BAND_SCORES[section.toUpperCase()];
    if (!bandMap) return 0;
    
    // Find the highest score for the number of correct answers
    for (const [threshold, score] of Object.entries(bandMap)) {
        if (correctAnswers >= parseInt(threshold)) {
            return score;
        }
    }
    return 0;
}

function showError(message) {
    // Create and show error notification
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showSuccess(message) {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export configuration for use in other modules
window.IELTS_CONFIG = {
    SUPABASE_CONFIG,
    TABLES,
    TEST_CONFIG,
    BAND_SCORES,
    QUESTION_TYPES,
    SAMPLE_QUESTIONS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    API_ENDPOINTS,
    STORAGE_BUCKETS
};

console.log('📋 IELTS Configuration loaded successfully');