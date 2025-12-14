// Main JavaScript for HKDSE Essay Memorizer
// Vanhok Academy Writing System v1.0

// ===== 全局状态 =====
let currentStage = 1;
let currentView = 'original';
let topicSentencesVisible = false;

// 背诵状态
let recitationState = {
    active: false,
    currentSentenceIndex: 0,
    showingSVO: false, // true = 显示SVO, false = 显示完整句子
    displayedSentences: [] // 已显示的句子记录
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initStage1();
    initStage2();
    initStage3();
});

// ===== 导航系统 =====
function initNavigation() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    
    stageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const stageNum = parseInt(this.dataset.stage);
            switchStage(stageNum);
        });
    });
}

function switchStage(stageNum) {
    // 更新导航按钮
    document.querySelectorAll('.stage-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.stage-btn[data-stage="${stageNum}"]`).classList.add('active');
    
    // 更新内容区域
    document.querySelectorAll('.stage-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`stage${stageNum}`).classList.add('active');
    
    currentStage = stageNum;
}

// ===== 阶段一：逻辑框架 =====
function initStage1() {
    renderEssayContent();
    
    const toggleBtn = document.getElementById('toggleTopicSentences');
    toggleBtn.addEventListener('click', toggleTopicSentences);
}

function renderEssayContent() {
    const container = document.getElementById('essayContent');
    container.innerHTML = '';
    
    essayData.paragraphs.forEach((para, index) => {
        const paraDiv = document.createElement('div');
        paraDiv.className = 'paragraph';
        
        paraDiv.innerHTML = `
            <div class="paragraph-header">
                <span class="paragraph-type">${para.type}</span>
            </div>
            <div class="paragraph-text">${para.text}</div>
            <div class="topic-sentence" id="topic-${index}">
                <strong>Topic Sentence:</strong>
                <p>${para.topicSentence}</p>
            </div>
        `;
        
        container.appendChild(paraDiv);
    });
}

function toggleTopicSentences() {
    topicSentencesVisible = !topicSentencesVisible;
    const btn = document.getElementById('toggleTopicSentences');
    const topicSentences = document.querySelectorAll('.topic-sentence');
    
    if (topicSentencesVisible) {
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Topic Sentences';
        topicSentences.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('show');
            }, index * 100);
        });
    } else {
        btn.innerHTML = '<i class="fas fa-eye"></i> Show Topic Sentences';
        topicSentences.forEach(el => {
            el.classList.remove('show');
        });
    }
}

// ===== 阶段二：句式拆解 =====
function initStage2() {
    renderSentenceView('original');
    
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            switchView(view);
        });
    });
}

function switchView(view) {
    currentView = view;
    
    // 更新按钮状态
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
    
    // 更新图例显示
    const legend = document.getElementById('grammarLegend');
    if (view === 'grammar') {
        legend.style.display = 'flex';
    } else {
        legend.style.display = 'none';
    }
    
    // 渲染句子
    renderSentenceView(view);
}

function renderSentenceView(view) {
    const container = document.getElementById('sentenceView');
    container.innerHTML = '';
    
    essayData.sentences.forEach((sentence, index) => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'sentence-item';
        
        let content = '';
        
        if (view === 'original') {
            content = `
                <div class="sentence-number">Sentence ${sentence.id}</div>
                <div class="sentence-text">${sentence.original}</div>
            `;
        } else if (view === 'grammar') {
            content = `
                <div class="sentence-number">Sentence ${sentence.id}</div>
                <div class="sentence-text">${sentence.grammar}</div>
            `;
        } else if (view === 'vocabulary') {
            let vocabHTML = sentence.original;
            
            // 处理词汇高亮和同义词
            if (sentence.vocabulary && sentence.vocabulary.length > 0) {
                sentence.vocabulary.forEach(vocab => {
                    const regex = new RegExp(`\\b${vocab.word}\\b`, 'gi');
                    vocabHTML = vocabHTML.replace(regex, 
                        `<span class="vocab-word">${vocab.word}</span><span class="synonyms">Synonyms: ${vocab.synonyms}</span>`
                    );
                });
            }
            
            content = `
                <div class="sentence-number">Sentence ${sentence.id}</div>
                <div class="sentence-text">${vocabHTML}</div>
            `;
        }
        
        sentenceDiv.innerHTML = content;
        container.appendChild(sentenceDiv);
    });
}

// ===== 阶段三：背诵练习（全新点击式交互） =====
function initStage3() {
    const startBtn = document.getElementById('startRecitation');
    const resetBtn = document.getElementById('resetRecitation');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const restartBtn = document.getElementById('restartRecitation');
    
    startBtn.addEventListener('click', startRecitation);
    resetBtn.addEventListener('click', resetRecitation);
    nextBtn.addEventListener('click', handleNextClick);
    restartBtn.addEventListener('click', resetRecitation);
}

function startRecitation() {
    recitationState = {
        active: true,
        currentSentenceIndex: 0,
        showingSVO: false,
        displayedSentences: []
    };
    
    // 更新UI
    document.querySelector('.welcome-message').style.display = 'none';
    document.getElementById('startRecitation').style.display = 'none';
    document.getElementById('resetRecitation').style.display = 'inline-flex';
    document.getElementById('recitationProgress').style.display = 'block';
    document.getElementById('nextBtnContainer').style.display = 'block';
    document.getElementById('completionMessage').style.display = 'none';
    
    // 清空背诵区域
    const recitationArea = document.getElementById('recitationArea');
    recitationArea.innerHTML = '';
    
    // 更新按钮文字
    updateNextButton();
    
    // 更新进度
    updateProgress();
}

function handleNextClick() {
    const totalSentences = essayData.sentences.length;
    
    // 如果已经完成所有句子
    if (recitationState.currentSentenceIndex >= totalSentences) {
        return;
    }
    
    const currentSentence = essayData.sentences[recitationState.currentSentenceIndex];
    
    if (!recitationState.showingSVO) {
        // 第一次点击：显示SVO框架
        displaySVO(currentSentence);
        recitationState.showingSVO = true;
    } else {
        // 第二次点击：显示完整句子
        displayFullSentence(currentSentence);
        recitationState.showingSVO = false;
        recitationState.currentSentenceIndex++;
        
        // 检查是否完成
        if (recitationState.currentSentenceIndex >= totalSentences) {
            completeRecitation();
            return;
        }
    }
    
    updateNextButton();
    updateProgress();
}

function displaySVO(sentence) {
    const recitationArea = document.getElementById('recitationArea');
    
    // 查找或创建当前句子的卡片
    let sentenceCard = document.getElementById(`sentence-card-${sentence.id}`);
    
    if (!sentenceCard) {
        sentenceCard = document.createElement('div');
        sentenceCard.id = `sentence-card-${sentence.id}`;
        sentenceCard.className = 'recitation-sentence';
        sentenceCard.innerHTML = `
            <div class="sentence-header-recite">Sentence ${sentence.id} / ${essayData.sentences.length}</div>
        `;
        recitationArea.appendChild(sentenceCard);
        
        // 平滑滚动到新卡片
        setTimeout(() => {
            sentenceCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    // 添加SVO提示（仅显示主谓宾，其他部分模糊）
    const svoDiv = document.createElement('div');
    svoDiv.className = 'svo-hint';
    svoDiv.innerHTML = createBlurredSentence(sentence);
    sentenceCard.appendChild(svoDiv);
}

// 创建模糊版本的句子（仅显示SVO清晰，其他模糊）
function createBlurredSentence(sentence) {
    // 使用正则表达式找到所有span标签包裹的SVO部分
    let html = sentence.grammar;
    
    // 提取所有带class的span标签内容（subject, verb, object）
    const svoPattern = /<span class=['"](?:subject|verb|object)['"]>(.*?)<\/span>/g;
    const svoMatches = [];
    let match;
    
    while ((match = svoPattern.exec(html)) !== null) {
        svoMatches.push({
            full: match[0],
            content: match[1]
        });
    }
    
    // 移除所有HTML标签，只保留纯文本
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const fullText = tempDiv.textContent;
    
    // 创建只显示SVO的版本
    let result = html;
    
    // 使用临时div来操作
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = html;
    
    // 将所有非SVO的文本节点包裹为模糊文本
    blurNonSVOText(resultDiv);
    
    return resultDiv.innerHTML;
}

// 递归函数：模糊非SVO文本
function blurNonSVOText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        // 文本节点，如果不为空则模糊化
        const text = node.textContent.trim();
        if (text.length > 0) {
            const span = document.createElement('span');
            span.className = 'blurred';
            span.textContent = node.textContent;
            node.parentNode.replaceChild(span, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 元素节点
        if (node.classList && (node.classList.contains('subject') || 
                                node.classList.contains('verb') || 
                                node.classList.contains('object'))) {
            // 保持SVO元素不变
            return;
        } else {
            // 递归处理子节点
            const children = Array.from(node.childNodes);
            children.forEach(child => blurNonSVOText(child));
        }
    }
}

function displayFullSentence(sentence) {
    const sentenceCard = document.getElementById(`sentence-card-${sentence.id}`);
    
    if (sentenceCard) {
        // 添加完整句子
        const fullDiv = document.createElement('div');
        fullDiv.className = 'full-sentence';
        fullDiv.textContent = sentence.original;
        sentenceCard.appendChild(fullDiv);
        
        // 记录已显示的句子
        recitationState.displayedSentences.push(sentence.id);
        
        // 平滑滚动
        setTimeout(() => {
            sentenceCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

function updateNextButton() {
    const btn = document.getElementById('nextSentenceBtn');
    const btnText = document.getElementById('nextBtnText');
    const totalSentences = essayData.sentences.length;
    
    if (recitationState.currentSentenceIndex >= totalSentences) {
        btn.style.display = 'none';
        return;
    }
    
    if (!recitationState.showingSVO) {
        // 准备显示SVO
        btnText.textContent = 'Click to Show Hint';
        btn.innerHTML = '<i class="fas fa-lightbulb"></i> ' + btnText.textContent;
    } else {
        // 准备显示完整句子
        btnText.textContent = 'Click to Show Full Sentence';
        btn.innerHTML = '<i class="fas fa-check-circle"></i> ' + btnText.textContent;
    }
}

function updateProgress() {
    const totalSentences = essayData.sentences.length;
    const completedSentences = recitationState.currentSentenceIndex;
    const percentage = Math.round((completedSentences / totalSentences) * 100);
    
    document.getElementById('progressText').textContent = 
        `Progress: ${completedSentences}/${totalSentences}`;
    document.getElementById('progressPercent').textContent = `${percentage}%`;
    document.getElementById('progressFill').style.width = `${percentage}%`;
}

function completeRecitation() {
    // 隐藏按钮
    document.getElementById('nextBtnContainer').style.display = 'none';
    
    // 显示完成消息
    document.getElementById('completionMessage').style.display = 'block';
    
    // 更新进度为100%
    document.getElementById('progressText').textContent = 
        `Progress: ${essayData.sentences.length}/${essayData.sentences.length}`;
    document.getElementById('progressPercent').textContent = '100%';
    document.getElementById('progressFill').style.width = '100%';
    
    // 滚动到完成消息
    setTimeout(() => {
        document.getElementById('completionMessage').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 300);
}

function resetRecitation() {
    recitationState = {
        active: false,
        currentSentenceIndex: 0,
        showingSVO: false,
        displayedSentences: []
    };
    
    // 重置UI
    document.querySelector('.welcome-message').style.display = 'block';
    document.getElementById('startRecitation').style.display = 'inline-flex';
    document.getElementById('resetRecitation').style.display = 'none';
    document.getElementById('recitationProgress').style.display = 'none';
    document.getElementById('nextBtnContainer').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'none';
    
    // 清空背诵区域
    const recitationArea = document.getElementById('recitationArea');
    const welcomeMsg = recitationArea.querySelector('.welcome-message');
    recitationArea.innerHTML = '';
    if (welcomeMsg) {
        recitationArea.appendChild(welcomeMsg);
    }
    
    // 滚动到顶部
    recitationArea.scrollTop = 0;
}

// ===== 工具函数 =====

// 平滑滚动到元素
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// 键盘快捷键（可选）
document.addEventListener('keydown', function(e) {
    // 如果在背诵阶段且按下空格键
    if (currentStage === 3 && recitationState.active && e.code === 'Space') {
        e.preventDefault();
        const nextBtn = document.getElementById('nextSentenceBtn');
        if (nextBtn.style.display !== 'none') {
            handleNextClick();
        }
    }
});

// 打印支持
function printEssay() {
    window.print();
}

// 导出功能（如需要）
function exportProgress() {
    const data = {
        stage: currentStage,
        recitationProgress: recitationState.currentSentenceIndex,
        totalSentences: essayData.sentences.length,
        timestamp: new Date().toISOString()
    };
    
    console.log('Progress:', data);
    return data;
}
