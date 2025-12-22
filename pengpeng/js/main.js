// ===============================================
// 全局变量
// ===============================================
let currentLanguage = 'cn'; // 当前语言 cn/en
let isPlaying = false; // 是否正在播放
let scrollSpeed = 1; // 滚动速度 0.5=慢, 1=中, 2=快
let scrollInterval = null; // 滚动定时器
let currentQuestionIndex = 0; // 当前问题索引
let fontSize = 'normal'; // 字体大小 normal/large/extra-large

// ===============================================
// 初始化
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    initQuestionList();
    initContent();
    initEventListeners();
    initKeyboardShortcuts();
    updateCurrentQuestion();
    
    // 显示快捷键提示3秒
    setTimeout(() => {
        document.getElementById('shortcutHint').classList.add('show');
        setTimeout(() => {
            document.getElementById('shortcutHint').classList.remove('show');
        }, 5000);
    }, 1000);
});

// ===============================================
// 初始化问题列表
// ===============================================
function initQuestionList() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    
    interviewData.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.dataset.index = index;
        
        questionItem.innerHTML = `
            <div class="question-number">${question.id}</div>
            <div class="question-title">${question.title}</div>
        `;
        
        questionItem.addEventListener('click', function() {
            scrollToQuestion(index);
        });
        
        questionList.appendChild(questionItem);
    });
}

// ===============================================
// 初始化内容
// ===============================================
function initContent() {
    const contentDisplay = document.getElementById('contentDisplay');
    contentDisplay.innerHTML = '';
    
    interviewData.forEach((question, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = `question-${index}`;
        
        questionBlock.innerHTML = `
            <h2>${question.id}. ${currentLanguage === 'cn' ? question.title : question.titleEn}</h2>
            <div class="content ${currentLanguage === 'en' ? 'en' : ''}">${currentLanguage === 'cn' ? question.contentCn : question.contentEn}</div>
        `;
        
        contentDisplay.appendChild(questionBlock);
    });
}

// ===============================================
// 更新内容（切换语言时）
// ===============================================
function updateContent() {
    const contentDisplay = document.getElementById('contentDisplay');
    const questionBlocks = contentDisplay.querySelectorAll('.question-block');
    
    questionBlocks.forEach((block, index) => {
        const question = interviewData[index];
        block.innerHTML = `
            <h2>${question.id}. ${currentLanguage === 'cn' ? question.title : question.titleEn}</h2>
            <div class="content ${currentLanguage === 'en' ? 'en' : ''}">${currentLanguage === 'cn' ? question.contentCn : question.contentEn}</div>
        `;
    });
}

// ===============================================
// 事件监听
// ===============================================
function initEventListeners() {
    // 播放/暂停按钮
    document.getElementById('playPauseBtn').addEventListener('click', togglePlay);
    
    // 速度控制按钮
    document.getElementById('speedSlowBtn').addEventListener('click', () => setSpeed(0.5));
    document.getElementById('speedMediumBtn').addEventListener('click', () => setSpeed(1));
    document.getElementById('speedFastBtn').addEventListener('click', () => setSpeed(2));
    
    // 语言切换按钮
    document.getElementById('langToggleBtn').addEventListener('click', toggleLanguage);
    
    // 主题切换按钮
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    
    // 字体大小切换按钮
    document.getElementById('fontSizeToggleBtn').addEventListener('click', toggleFontSize);
    
    // 滚动事件监听
    const contentScroll = document.querySelector('.content-scroll');
    contentScroll.addEventListener('scroll', handleScroll);
}

// ===============================================
// 键盘快捷键
// ===============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ': // 空格键：播放/暂停
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowUp': // 上箭头：加速
                e.preventDefault();
                if (scrollSpeed === 0.5) setSpeed(1);
                else if (scrollSpeed === 1) setSpeed(2);
                break;
            case 'ArrowDown': // 下箭头：减速
                e.preventDefault();
                if (scrollSpeed === 2) setSpeed(1);
                else if (scrollSpeed === 1) setSpeed(0.5);
                break;
            case 'ArrowLeft': // 左箭头：中文
                e.preventDefault();
                if (currentLanguage !== 'cn') toggleLanguage();
                break;
            case 'ArrowRight': // 右箭头：英文
                e.preventDefault();
                if (currentLanguage !== 'en') toggleLanguage();
                break;
            case 'r':
            case 'R': // R键：重置到顶部
                e.preventDefault();
                resetToTop();
                break;
            case 'f':
            case 'F': // F键：全屏
                e.preventDefault();
                toggleFullscreen();
                break;
            case '?': // ?键：显示快捷键提示
                e.preventDefault();
                showShortcutHint();
                break;
        }
    });
}

// ===============================================
// 播放/暂停控制
// ===============================================
function togglePlay() {
    isPlaying = !isPlaying;
    const playPauseBtn = document.getElementById('playPauseBtn');
    const icon = playPauseBtn.querySelector('i');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
        startAutoScroll();
    } else {
        icon.className = 'fas fa-play';
        stopAutoScroll();
    }
}

function startAutoScroll() {
    if (scrollInterval) clearInterval(scrollInterval);
    
    scrollInterval = setInterval(() => {
        const contentScroll = document.querySelector('.content-scroll');
        contentScroll.scrollTop += scrollSpeed;
        
        // 如果滚动到底部，自动停止
        if (contentScroll.scrollHeight - contentScroll.scrollTop <= contentScroll.clientHeight + 10) {
            togglePlay();
        }
    }, 20);
}

function stopAutoScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

// ===============================================
// 速度控制
// ===============================================
function setSpeed(speed) {
    scrollSpeed = speed;
    
    // 更新按钮状态
    document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
    
    if (speed === 0.5) {
        document.getElementById('speedSlowBtn').classList.add('active');
    } else if (speed === 1) {
        document.getElementById('speedMediumBtn').classList.add('active');
    } else if (speed === 2) {
        document.getElementById('speedFastBtn').classList.add('active');
    }
    
    // 如果正在播放，重新启动
    if (isPlaying) {
        stopAutoScroll();
        startAutoScroll();
    }
}

// ===============================================
// 语言切换
// ===============================================
function toggleLanguage() {
    currentLanguage = currentLanguage === 'cn' ? 'en' : 'cn';
    document.getElementById('currentLang').textContent = currentLanguage === 'cn' ? '中文' : 'English';
    
    // 保存当前滚动位置的百分比
    const contentScroll = document.querySelector('.content-scroll');
    const scrollPercentage = contentScroll.scrollTop / (contentScroll.scrollHeight - contentScroll.clientHeight);
    
    // 更新内容
    updateContent();
    
    // 恢复滚动位置
    setTimeout(() => {
        contentScroll.scrollTop = scrollPercentage * (contentScroll.scrollHeight - contentScroll.clientHeight);
    }, 50);
}

// ===============================================
// 主题切换
// ===============================================
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.dataset.theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.dataset.theme = newTheme;
    
    const icon = document.querySelector('#themeToggleBtn i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===============================================
// 字体大小切换
// ===============================================
function toggleFontSize() {
    const body = document.body;
    
    if (fontSize === 'normal') {
        fontSize = 'large';
        body.classList.add('large-font');
    } else if (fontSize === 'large') {
        fontSize = 'extra-large';
        body.classList.remove('large-font');
        body.classList.add('extra-large-font');
    } else {
        fontSize = 'normal';
        body.classList.remove('extra-large-font');
    }
}

// ===============================================
// 滚动到指定问题
// ===============================================
function scrollToQuestion(index) {
    const questionBlock = document.getElementById(`question-${index}`);
    if (questionBlock) {
        const contentScroll = document.querySelector('.content-scroll');
        const offsetTop = questionBlock.offsetTop - 20;
        
        contentScroll.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        currentQuestionIndex = index;
        updateCurrentQuestion();
    }
}

// ===============================================
// 处理滚动事件（更新当前问题）
// ===============================================
function handleScroll() {
    const contentScroll = document.querySelector('.content-scroll');
    const scrollTop = contentScroll.scrollTop;
    const scrollHeight = contentScroll.scrollHeight - contentScroll.clientHeight;
    
    // 更新进度条
    const progressPercent = Math.round((scrollTop / scrollHeight) * 100);
    document.getElementById('progressBar').style.width = `${progressPercent}%`;
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    
    // 找到当前显示的问题
    let newQuestionIndex = 0;
    const questionBlocks = document.querySelectorAll('.question-block');
    
    questionBlocks.forEach((block, index) => {
        const blockTop = block.offsetTop - contentScroll.offsetTop;
        if (scrollTop >= blockTop - 100) {
            newQuestionIndex = index;
        }
    });
    
    if (newQuestionIndex !== currentQuestionIndex) {
        currentQuestionIndex = newQuestionIndex;
        updateCurrentQuestion();
    }
}

// ===============================================
// 更新当前问题显示
// ===============================================
function updateCurrentQuestion() {
    // 更新左侧导航高亮
    document.querySelectorAll('.question-item').forEach((item, index) => {
        if (index === currentQuestionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // 更新底部标题
    const currentQuestion = interviewData[currentQuestionIndex];
    const titleText = currentLanguage === 'cn' ? currentQuestion.title : currentQuestion.titleEn;
    document.getElementById('currentQuestionTitle').textContent = `${currentQuestion.id}. ${titleText}`;
}

// ===============================================
// 重置到顶部
// ===============================================
function resetToTop() {
    const contentScroll = document.querySelector('.content-scroll');
    contentScroll.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    if (isPlaying) {
        togglePlay();
    }
}

// ===============================================
// 全屏切换
// ===============================================
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// ===============================================
// 显示快捷键提示
// ===============================================
function showShortcutHint() {
    const hint = document.getElementById('shortcutHint');
    hint.classList.add('show');
    
    setTimeout(() => {
        hint.classList.remove('show');
    }, 5000);
}

// ===============================================
// 工具函数：防抖
// ===============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===============================================
// 页面卸载时停止滚动
// ===============================================
window.addEventListener('beforeunload', function() {
    stopAutoScroll();
});
