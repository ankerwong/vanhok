// ============================================
// Young Post Spark 报刊精读助手 - 主应用逻辑
// ============================================

// 全局状态管理
const appState = {
    currentArticle: 'article1',
    currentModule: 'worksheet',
    flashcardIndex: 0,
    masteredCards: new Set(),
    audioPlaying: false,
    audioElement: null
};

// ============================================
// 初始化应用
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeArticleSelector();
    initializeModuleNavigation();
    loadContent();
});

// ============================================
// 文章选择器
// ============================================
function initializeArticleSelector() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', () => {
            // 移除所有active类
            articleCards.forEach(c => c.classList.remove('active'));
            
            // 添加active类到当前卡片
            card.classList.add('active');
            
            // 更新当前文章
            appState.currentArticle = card.dataset.article;
            
            // 重置状态
            appState.flashcardIndex = 0;
            appState.masteredCards.clear();
            
            // 重新加载内容
            loadContent();
        });
    });
}

// ============================================
// 模块导航
// ============================================
function initializeModuleNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active类
            navTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
            
            // 添加active类
            tab.classList.add('active');
            
            // 更新当前模块
            appState.currentModule = tab.dataset.module;
            
            // 显示对应模块
            const moduleId = `${appState.currentModule}-module`;
            document.getElementById(moduleId).classList.add('active');
            
            // 如果是podcast模块，停止之前的音频
            if (appState.currentModule !== 'podcast' && appState.audioElement) {
                pauseAudio();
            }
        });
    });
}

// ============================================
// 加载内容
// ============================================
function loadContent() {
    const article = articlesData[appState.currentArticle];
    
    // 加载各个模块的内容
    loadWorksheet(article);
    loadFlashcards(article);
    loadPodcast(article);
    loadBackgroundKnowledge(article);
}

// ============================================
// Worksheet模块
// ============================================
function loadWorksheet(article) {
    const worksheetContent = document.getElementById('worksheet-content');
    
    let html = '';
    
    article.worksheet.sections.forEach((section, sectionIndex) => {
        html += `
            <div class="worksheet-section fade-in" style="animation-delay: ${sectionIndex * 0.1}s">
                <h3>${section.title}</h3>
        `;
        
        section.questions.forEach((question, qIndex) => {
            html += `
                <div class="question-item" style="animation-delay: ${(sectionIndex * 0.1 + qIndex * 0.05)}s">
                    <div class="question-text">
                        <strong>Q${section.questions.indexOf(question) + 1}:</strong> ${question.question}
                    </div>
            `;
            
            if (question.type === 'short') {
                html += `
                    <input type="text" 
                           class="answer-input" 
                           placeholder="Type your answer here..."
                           data-question-id="${question.id}">
                `;
            } else {
                html += `
                    <textarea class="answer-input textarea" 
                              placeholder="Write your answer here (3-4 sentences)..."
                              data-question-id="${question.id}"></textarea>
                `;
            }
            
            html += `
                    <button class="show-answer-btn" onclick="toggleAnswer('${question.id}')">
                        <i class="fas fa-eye"></i> Show Sample Answer
                    </button>
                    <div class="sample-answer" id="answer-${question.id}">
                        <strong><i class="fas fa-check-circle"></i> Sample Answer:</strong> ${question.answer}
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    worksheetContent.innerHTML = html;
}

function toggleAnswer(questionId) {
    const answerDiv = document.getElementById(`answer-${questionId}`);
    answerDiv.classList.toggle('visible');
}

// ============================================
// Flashcards模块
// ============================================
function loadFlashcards(article) {
    const flashcardsContent = document.getElementById('flashcards-content');
    
    const totalCards = article.flashcards.length;
    const masteredCount = appState.masteredCards.size;
    const progressPercent = (masteredCount / totalCards) * 100;
    
    const html = `
        <div class="flashcard-container">
            <!-- Progress Bar -->
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="text-center mb-2">
                <strong>${masteredCount} / ${totalCards}</strong> cards mastered
            </div>
            
            <!-- Controls -->
            <div class="flashcard-controls">
                <button class="control-btn" onclick="previousCard()" ${appState.flashcardIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <div class="card-counter">
                    ${appState.flashcardIndex + 1} / ${totalCards}
                </div>
                
                <button class="control-btn" onclick="nextCard()" ${appState.flashcardIndex === totalCards - 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <!-- Flashcard -->
            <div class="flashcard-wrapper">
                <div class="flashcard" id="flashcard" onclick="flipCard()">
                    ${renderFlashcard(article.flashcards[appState.flashcardIndex])}
                </div>
            </div>
            
            <div class="text-center">
                <button class="mastered-btn ${appState.masteredCards.has(appState.flashcardIndex) ? 'active' : ''}" 
                        onclick="toggleMastered()">
                    <i class="fas fa-check"></i> 
                    ${appState.masteredCards.has(appState.flashcardIndex) ? 'Mastered' : 'Mark as Mastered'}
                </button>
            </div>
            
            <p class="flip-hint mt-2">💡 Click the card to flip • Use arrow keys to navigate</p>
        </div>
    `;
    
    flashcardsContent.innerHTML = html;
    
    // 键盘导航
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function renderFlashcard(card) {
    return `
        <!-- Front -->
        <div class="flashcard-face flashcard-front">
            <div class="word-main">${card.word}</div>
            <div class="word-phonetic">${card.phonetic}</div>
            <div class="word-pos">${card.partOfSpeech}</div>
            <div class="word-context">
                "${card.contextSentence}"
            </div>
        </div>
        
        <!-- Back -->
        <div class="flashcard-face flashcard-back">
            <div class="definition-section">
                <div class="definition-label">DEFINITION</div>
                <div class="definition-text">${card.definition}</div>
            </div>
            <div class="example-section">
                <div class="example-label">EXAMPLE SENTENCE</div>
                <div class="example-text">"${card.example}"</div>
            </div>
        </div>
    `;
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
}

function previousCard() {
    if (appState.flashcardIndex > 0) {
        appState.flashcardIndex--;
        updateFlashcard();
    }
}

function nextCard() {
    const article = articlesData[appState.currentArticle];
    if (appState.flashcardIndex < article.flashcards.length - 1) {
        appState.flashcardIndex++;
        updateFlashcard();
    }
}

function updateFlashcard() {
    const article = articlesData[appState.currentArticle];
    loadFlashcards(article);
}

function toggleMastered() {
    if (appState.masteredCards.has(appState.flashcardIndex)) {
        appState.masteredCards.delete(appState.flashcardIndex);
    } else {
        appState.masteredCards.add(appState.flashcardIndex);
    }
    updateFlashcard();
}

function handleKeyboardNavigation(e) {
    // 只在flashcards模块激活时响应
    if (appState.currentModule !== 'flashcards') return;
    
    if (e.key === 'ArrowLeft') {
        previousCard();
    } else if (e.key === 'ArrowRight') {
        nextCard();
    } else if (e.key === ' ') {
        e.preventDefault();
        flipCard();
    }
}

// ============================================
// Podcast模块
// ============================================
function loadPodcast(article) {
    const podcastContent = document.getElementById('podcast-content');
    
    const html = `
        <div class="podcast-player">
            <div class="podcast-info">
                <div class="podcast-icon" id="podcast-icon">
                    <i class="fas fa-podcast"></i>
                </div>
                <h3 class="podcast-title">${article.title}</h3>
                <p class="podcast-duration">
                    <i class="fas fa-clock"></i> 
                    ${Math.floor(article.podcast.duration / 60)}:${(article.podcast.duration % 60).toString().padStart(2, '0')}
                </p>
            </div>
            
            <div class="audio-controls">
                <!-- Play Button -->
                <button class="play-btn" id="play-btn" onclick="togglePlay()">
                    <i class="fas fa-play" id="play-icon"></i>
                </button>
                
                <!-- Progress Bar -->
                <div class="progress-container">
                    <div class="time-display">
                        <span id="current-time">0:00</span>
                        <span id="total-time">${Math.floor(article.podcast.duration / 60)}:${(article.podcast.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div class="progress-slider" id="progress-slider">
                        <div class="progress-current" id="progress-current"></div>
                    </div>
                </div>
                
                <!-- Speed Controls -->
                <div class="speed-controls">
                    <button class="speed-btn" onclick="setSpeed(0.75)">0.75x</button>
                    <button class="speed-btn active" onclick="setSpeed(1)">1x</button>
                    <button class="speed-btn" onclick="setSpeed(1.25)">1.25x</button>
                    <button class="speed-btn" onclick="setSpeed(1.5)">1.5x</button>
                </div>
                
                <!-- Additional Controls -->
                <div class="additional-controls">
                    <button class="control-icon-btn" onclick="skipBackward()" title="Backward 10s">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="control-icon-btn" onclick="skipForward()" title="Forward 10s">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="control-icon-btn" onclick="restartAudio()" title="Restart">
                        <i class="fas fa-redo-alt"></i>
                    </button>
                </div>
            </div>
            
            <audio id="audio-element" src="${article.podcast.audioUrl}"></audio>
        </div>
    `;
    
    podcastContent.innerHTML = html;
    
    // 初始化音频元素
    initializeAudio();
}

function initializeAudio() {
    appState.audioElement = document.getElementById('audio-element');
    const progressSlider = document.getElementById('progress-slider');
    
    // 更新进度条
    appState.audioElement.addEventListener('timeupdate', updateProgress);
    
    // 点击进度条跳转
    progressSlider.addEventListener('click', seekAudio);
    
    // 音频结束时重置
    appState.audioElement.addEventListener('ended', () => {
        appState.audioPlaying = false;
        document.getElementById('play-icon').className = 'fas fa-play';
        document.getElementById('podcast-icon').classList.remove('playing');
    });
    
    // 音频加载错误处理
    appState.audioElement.addEventListener('error', (e) => {
        console.warn('Audio loading issue - this is normal in development environment');
    });
}

function togglePlay() {
    if (appState.audioPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    appState.audioElement.play();
    appState.audioPlaying = true;
    document.getElementById('play-icon').className = 'fas fa-pause';
    document.getElementById('podcast-icon').classList.add('playing');
}

function pauseAudio() {
    appState.audioElement.pause();
    appState.audioPlaying = false;
    document.getElementById('play-icon').className = 'fas fa-play';
    document.getElementById('podcast-icon').classList.remove('playing');
}

function updateProgress() {
    const current = appState.audioElement.currentTime;
    const duration = appState.audioElement.duration;
    const percent = (current / duration) * 100;
    
    document.getElementById('progress-current').style.width = `${percent}%`;
    document.getElementById('current-time').textContent = formatTime(current);
}

function seekAudio(e) {
    const progressSlider = document.getElementById('progress-slider');
    const rect = progressSlider.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * appState.audioElement.duration;
    appState.audioElement.currentTime = seekTime;
}

function setSpeed(speed) {
    appState.audioElement.playbackRate = speed;
    
    // 更新按钮状态
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function skipBackward() {
    appState.audioElement.currentTime = Math.max(0, appState.audioElement.currentTime - 10);
}

function skipForward() {
    appState.audioElement.currentTime = Math.min(
        appState.audioElement.duration, 
        appState.audioElement.currentTime + 10
    );
}

function restartAudio() {
    appState.audioElement.currentTime = 0;
    if (!appState.audioPlaying) {
        playAudio();
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// Background Knowledge模块
// ============================================
function loadBackgroundKnowledge(article) {
    const backgroundContent = document.getElementById('background-content');
    
    let html = '<div class="knowledge-grid">';
    
    article.backgroundKnowledge.forEach((card, index) => {
        html += `
            <div class="knowledge-card fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="knowledge-header">
                    <div class="knowledge-icon">
                        <i class="fas fa-${card.icon}"></i>
                    </div>
                    <h3 class="knowledge-title">${card.title}</h3>
                </div>
                
                <div class="knowledge-content">
        `;
        
        card.content.forEach(item => {
            html += `<div class="knowledge-item">${item.label}</div>`;
        });
        
        html += `
                </div>
                
                <div class="knowledge-insight">
                    <strong>💡 Why it matters:</strong> ${card.insight}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    backgroundContent.innerHTML = html;
}

// ============================================
// 工具函数
// ============================================

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 当用户切换模块时，滚动到顶部
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        setTimeout(scrollToTop, 100);
    });
});

// ============================================
// 控制台信息
// ============================================
console.log('%c🎓 Young Post Spark 报刊精读助手', 'color: #2C5F7C; font-size: 20px; font-weight: bold;');
console.log('%c专为香港初中学生设计的互动学习平台', 'color: #F39C12; font-size: 14px;');
console.log('%c技术栈: Vanilla JS + CSS3 + HTML5', 'color: #27AE60; font-size: 12px;');
