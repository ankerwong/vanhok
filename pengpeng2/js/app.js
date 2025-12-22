// ==================== 核心应用类 ====================
class InterviewPrompter {
    constructor() {
        this.content = null;
        this.questions = [];
        this.sentences = [];
        this.currentSentenceIndex = 0;
        this.isPlaying = false;
        this.playInterval = null;
        this.speed = 'medium';
        this.fontSize = 'normal';
        this.theme = 'light';
        this.language = 'both'; // both, chinese, english
        
        // 速度配置（毫秒）
        this.speedConfig = {
            slow: 5500,
            medium: 3500,
            fast: 2500
        };
        
        this.init();
    }
    
    init() {
        this.initElements();
        this.loadSavedContent();
        this.bindEvents();
        this.loadTheme();
    }
    
    // 初始化 DOM 元素
    initElements() {
        // 页面
        this.inputPage = document.getElementById('inputPage');
        this.prompterPage = document.getElementById('prompterPage');
        
        // 输入页面元素
        this.contentInput = document.getElementById('contentInput');
        this.charCount = document.getElementById('charCount');
        this.questionCount = document.getElementById('questionCount');
        this.startBtn = document.getElementById('startBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.loadExampleBtn = document.getElementById('loadExampleBtn');
        this.savedNotice = document.getElementById('savedContentNotice');
        this.clearSavedBtn = document.getElementById('clearSavedBtn');
        
        // 提词器页面元素
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.speedBtns = document.querySelectorAll('.speed-btn');
        this.fontSizeBtn = document.getElementById('fontSizeBtn');
        this.langToggleBtn = document.getElementById('langToggleBtn');
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.editBtn = document.getElementById('editBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        
        this.questionListContent = document.getElementById('questionListContent');
        this.sentenceContainer = document.getElementById('sentenceContainer');
        this.currentQuestionTitle = document.getElementById('currentQuestionTitle');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.progressFill = document.getElementById('progressFill');
        this.currentTime = document.getElementById('currentTime');
        this.totalTime = document.getElementById('totalTime');
    }
    
    // 绑定事件
    bindEvents() {
        // 输入页面事件
        this.contentInput.addEventListener('input', () => this.handleInputChange());
        this.startBtn.addEventListener('click', () => this.startPrompter());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.loadExampleBtn.addEventListener('click', () => this.loadExample());
        this.clearSavedBtn?.addEventListener('click', () => this.clearSaved());
        
        // 提词器控制事件
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.speedBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setSpeed(btn.dataset.speed));
        });
        this.fontSizeBtn.addEventListener('click', () => this.cycleFontSize());
        this.langToggleBtn.addEventListener('click', () => this.toggleLanguage());
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.editBtn.addEventListener('click', () => this.backToEdit());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // 滚动事件
        this.sentenceContainer.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > 0) {
                this.pause();
            }
        });
    }
    
    // ==================== 内容解析 ====================
    
    parseContent(text) {
        if (!text || text.trim().length === 0) {
            return null;
        }
        
        const lines = text.split('\n');
        const questions = [];
        let currentQuestion = null;
        
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            
            // 检测问题标题（支持多种格式：1、 1. 1） 1] 等）
            const questionMatch = line.match(/^(\d+)[、.\)）\]]\s*(.+)$/);
            
            if (questionMatch) {
                // 保存上一个问题
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                
                // 创建新问题
                currentQuestion = {
                    number: parseInt(questionMatch[1]),
                    title: questionMatch[2].trim(),
                    content: ''
                };
            } else if (currentQuestion) {
                // 添加到当前问题的内容
                currentQuestion.content += line + '\n';
            }
        }
        
        // 保存最后一个问题
        if (currentQuestion) {
            questions.push(currentQuestion);
        }
        
        // 处理每个问题，分离句子
        questions.forEach(q => {
            q.sentences = this.splitIntoSentences(q.content.trim());
        });
        
        return questions;
    }
    
    splitIntoSentences(text) {
        if (!text) return [];
        
        // 智能分句算法
        const sentences = [];
        let currentSentence = '';
        let inEnglish = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            currentSentence += char;
            
            // 检测英文环境（连续字母）
            if (/[a-zA-Z]/.test(char)) {
                inEnglish = true;
            } else if (/[\u4e00-\u9fa5]/.test(char)) {
                inEnglish = false;
            }
            
            // 句子结束标记
            const isEndMark = /[。！？!?]/.test(char);
            
            if (isEndMark) {
                // 检查是否为小数点或缩写
                const nextChar = text[i + 1];
                const prevChars = text.substring(Math.max(0, i - 5), i);
                
                // 排除小数点（如 3.61）
                if (char === '.' && /\d$/.test(prevChars) && /^\d/.test(nextChar)) {
                    continue;
                }
                
                // 排除英文缩写（如 Mr. Dr.）
                if (char === '.' && /[A-Z][a-z]*$/.test(prevChars)) {
                    continue;
                }
                
                // 确认句子结束
                const sentence = currentSentence.trim();
                if (sentence.length > 0) {
                    sentences.push(sentence);
                    currentSentence = '';
                }
            }
        }
        
        // 添加剩余内容
        if (currentSentence.trim().length > 0) {
            sentences.push(currentSentence.trim());
        }
        
        return sentences;
    }
    
    // ==================== 输入页面功能 ====================
    
    handleInputChange() {
        const text = this.contentInput.value;
        const charLength = text.length;
        
        // 更新字符计数
        this.charCount.textContent = `${charLength} 字符`;
        
        // 解析并计数问题
        const parsed = this.parseContent(text);
        const questionNum = parsed ? parsed.length : 0;
        this.questionCount.textContent = `${questionNum} 个问题`;
        
        // 启用/禁用开始按钮
        this.startBtn.disabled = questionNum === 0;
    }
    
    loadExample() {
        const example = `1、自我介绍
您好，我叫张三，来自北京。我毕业于某某大学市场营销专业，在校期间参与了多个商业案例分析项目。

Hello, my name is Zhang San from Beijing. I graduated from XX University majoring in Marketing and participated in several business case analysis projects during my studies.

2、为什么选择这个职位？
我对贵公司的企业文化和发展前景非常认同。我相信我的专业背景和实践经验能够为团队带来价值。

I am very impressed by your company's culture and development prospects. I believe my professional background and practical experience can bring value to the team.

3、你的优势是什么？
我的优势主要体现在数据分析能力和团队协作精神。在之前的实习中，我通过数据驱动决策帮助团队提升了20%的转化率。

My main strengths are data analysis skills and teamwork spirit. In my previous internship, I helped the team improve conversion rates by 20% through data-driven decision making.`;
        
        this.contentInput.value = example;
        this.handleInputChange();
    }
    
    clearInput() {
        this.contentInput.value = '';
        this.handleInputChange();
    }
    
    startPrompter() {
        const text = this.contentInput.value;
        const parsed = this.parseContent(text);
        
        if (!parsed || parsed.length === 0) {
            alert('请输入有效的面试内容');
            return;
        }
        
        // 保存内容
        this.saveContent(text);
        
        // 设置数据
        this.questions = parsed;
        this.buildSentenceList();
        
        // 切换页面
        this.inputPage.style.display = 'none';
        this.prompterPage.style.display = 'flex';
        
        // 渲染界面
        this.renderQuestionList();
        this.renderSentences();
        this.updateProgress();
        
        // 自动开始播放
        setTimeout(() => this.play(), 500);
    }
    
    // ==================== 数据处理 ====================
    
    buildSentenceList() {
        this.sentences = [];
        
        this.questions.forEach((question, qIndex) => {
            question.sentences.forEach((sentence, sIndex) => {
                this.sentences.push({
                    text: sentence,
                    questionIndex: qIndex,
                    questionTitle: question.title,
                    questionNumber: question.number,
                    sentenceIndex: sIndex,
                    isFirstInQuestion: sIndex === 0
                });
            });
        });
    }
    
    // ==================== 渲染功能 ====================
    
    renderQuestionList() {
        this.questionListContent.innerHTML = '';
        
        this.questions.forEach((q, index) => {
            const item = document.createElement('div');
            item.className = 'question-item';
            item.innerHTML = `<span class="question-number">${q.number}.</span>${q.title}`;
            item.addEventListener('click', () => this.jumpToQuestion(index));
            this.questionListContent.appendChild(item);
        });
    }
    
    renderSentences() {
        this.sentenceContainer.innerHTML = '';
        
        this.sentences.forEach((s, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            sentenceDiv.dataset.index = index;
            sentenceDiv.textContent = s.text;
            
            sentenceDiv.addEventListener('click', () => {
                this.pause();
                this.goToSentence(index);
            });
            
            this.sentenceContainer.appendChild(sentenceDiv);
        });
        
        this.updateFading();
    }
    
    // ==================== Fading 效果 ====================
    
    updateFading() {
        const sentenceDivs = this.sentenceContainer.querySelectorAll('.sentence');
        
        sentenceDivs.forEach((div, index) => {
            div.classList.remove('current', 'near', 'far', 'very-far');
            
            const distance = Math.abs(index - this.currentSentenceIndex);
            
            if (distance === 0) {
                div.classList.add('current');
            } else if (distance <= 2) {
                div.classList.add('near');
            } else if (distance <= 4) {
                div.classList.add('far');
            } else {
                div.classList.add('very-far');
            }
        });
        
        // 滚动到当前句子
        this.scrollToCurrentSentence();
        
        // 更新问题列表高亮
        this.updateQuestionListHighlight();
    }
    
    scrollToCurrentSentence() {
        const currentDiv = this.sentenceContainer.querySelector('.sentence.current');
        if (currentDiv) {
            currentDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    updateQuestionListHighlight() {
        const currentSentence = this.sentences[this.currentSentenceIndex];
        if (!currentSentence) return;
        
        const items = this.questionListContent.querySelectorAll('.question-item');
        items.forEach((item, index) => {
            if (index === currentSentence.questionIndex) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // ==================== 播放控制 ====================
    
    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.playPauseBtn.querySelector('i').className = 'fas fa-pause';
        
        this.playInterval = setInterval(() => {
            this.nextSentence();
        }, this.speedConfig[this.speed]);
    }
    
    pause() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        this.playPauseBtn.querySelector('i').className = 'fas fa-play';
        
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    nextSentence() {
        if (this.currentSentenceIndex < this.sentences.length - 1) {
            this.currentSentenceIndex++;
            this.updateFading();
            this.updateProgress();
        } else {
            this.pause();
        }
    }
    
    prevSentence() {
        if (this.currentSentenceIndex > 0) {
            this.currentSentenceIndex--;
            this.updateFading();
            this.updateProgress();
        }
    }
    
    goToSentence(index) {
        if (index >= 0 && index < this.sentences.length) {
            this.currentSentenceIndex = index;
            this.updateFading();
            this.updateProgress();
        }
    }
    
    jumpToQuestion(questionIndex) {
        this.pause();
        
        // 找到该问题的第一个句子
        const sentenceIndex = this.sentences.findIndex(s => s.questionIndex === questionIndex);
        if (sentenceIndex !== -1) {
            this.goToSentence(sentenceIndex);
        }
    }
    
    reset() {
        this.pause();
        this.currentSentenceIndex = 0;
        this.updateFading();
        this.updateProgress();
    }
    
    // ==================== 进度更新 ====================
    
    updateProgress() {
        const current = this.sentences[this.currentSentenceIndex];
        if (!current) return;
        
        // 更新标题
        this.currentQuestionTitle.textContent = `${current.questionNumber}. ${current.questionTitle}`;
        
        // 更新百分比
        const percentage = ((this.currentSentenceIndex + 1) / this.sentences.length * 100).toFixed(1);
        this.progressPercentage.textContent = `${percentage}%`;
        this.progressFill.style.width = `${percentage}%`;
        
        // 更新时间（估算）
        const currentSeconds = Math.floor(this.currentSentenceIndex * this.speedConfig[this.speed] / 1000);
        const totalSeconds = Math.floor(this.sentences.length * this.speedConfig[this.speed] / 1000);
        
        this.currentTime.textContent = this.formatTime(currentSeconds);
        this.totalTime.textContent = this.formatTime(totalSeconds);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // ==================== 控制功能 ====================
    
    setSpeed(speed) {
        this.speed = speed;
        
        // 更新按钮状态
        this.speedBtns.forEach(btn => {
            if (btn.dataset.speed === speed) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 重启播放
        if (this.isPlaying) {
            this.pause();
            this.play();
        }
    }
    
    cycleFontSize() {
        const sizes = ['normal', 'large', 'xlarge'];
        const currentIndex = sizes.indexOf(this.fontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        this.fontSize = sizes[nextIndex];
        
        // 更新 body class
        document.body.classList.remove('font-normal', 'font-large', 'font-xlarge');
        document.body.classList.add(`font-${this.fontSize}`);
        
        // 更新按钮文本
        const labels = { normal: '正常', large: '大', xlarge: '超大' };
        this.fontSizeBtn.querySelector('.btn-label').textContent = labels[this.fontSize];
    }
    
    toggleLanguage() {
        // 功能占位 - 可以扩展为过滤中文/英文句子
        const languages = ['both', 'chinese', 'english'];
        const currentIndex = languages.indexOf(this.language);
        const nextIndex = (currentIndex + 1) % languages.length;
        this.language = languages[nextIndex];
        
        const labels = { both: '中英', chinese: '中文', english: 'EN' };
        this.langToggleBtn.querySelector('.btn-label').textContent = labels[this.language];
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.dataset.theme = this.theme;
        localStorage.setItem('prompter-theme', this.theme);
        
        // 更新图标
        const icon = this.themeToggleBtn.querySelector('i');
        icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('prompter-theme') || 'light';
        this.theme = savedTheme;
        document.body.dataset.theme = this.theme;
        
        if (this.themeToggleBtn) {
            const icon = this.themeToggleBtn.querySelector('i');
            icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.fullscreenBtn.querySelector('i').className = 'fas fa-compress';
            document.body.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            this.fullscreenBtn.querySelector('i').className = 'fas fa-expand';
            document.body.classList.remove('fullscreen');
        }
    }
    
    backToEdit() {
        this.pause();
        this.prompterPage.style.display = 'none';
        this.inputPage.style.display = 'flex';
    }
    
    // ==================== 键盘快捷键 ====================
    
    handleKeyboard(e) {
        // 在输入页面时忽略快捷键（除了部分）
        if (this.inputPage.style.display !== 'none' && 
            !['F11'].includes(e.key)) {
            return;
        }
        
        switch(e.key) {
            case ' ':
            case 'Spacebar':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.prevSentence();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.nextSentence();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.toggleLanguage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.toggleLanguage();
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                this.reset();
                break;
            case 'f':
            case 'F':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
                break;
            case 'e':
            case 'E':
                e.preventDefault();
                this.backToEdit();
                break;
            case '+':
            case '=':
                e.preventDefault();
                this.cycleFontSize();
                break;
            case '-':
            case '_':
                e.preventDefault();
                this.cycleFontSize();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
            default:
                // 数字键跳转问题
                if (e.key >= '1' && e.key <= '9') {
                    const questionIndex = parseInt(e.key) - 1;
                    if (questionIndex < this.questions.length) {
                        this.jumpToQuestion(questionIndex);
                    }
                }
        }
    }
    
    // ==================== 本地存储 ====================
    
    saveContent(text) {
        localStorage.setItem('prompter-content', text);
        localStorage.setItem('prompter-save-time', new Date().toISOString());
    }
    
    loadSavedContent() {
        const savedContent = localStorage.getItem('prompter-content');
        const saveTime = localStorage.getItem('prompter-save-time');
        
        if (savedContent && savedContent.trim().length > 0) {
            this.contentInput.value = savedContent;
            this.handleInputChange();
            
            // 显示恢复提示
            if (this.savedNotice) {
                this.savedNotice.style.display = 'flex';
                
                // 显示保存时间
                if (saveTime) {
                    const date = new Date(saveTime);
                    const timeStr = date.toLocaleString('zh-CN');
                    this.savedNotice.querySelector('span').textContent = 
                        `已恢复上次保存的内容 (${timeStr})`;
                }
            }
        }
    }
    
    clearSaved() {
        localStorage.removeItem('prompter-content');
        localStorage.removeItem('prompter-save-time');
        this.clearInput();
        if (this.savedNotice) {
            this.savedNotice.style.display = 'none';
        }
    }
}

// ==================== 应用启动 ====================
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new InterviewPrompter();
});
