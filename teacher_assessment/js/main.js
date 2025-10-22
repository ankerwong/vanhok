// ==================== 全局变量 ====================
let currentPage = 'welcome';
let currentModule = null;
let currentModuleIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = {};
let userName = '';
let userPhone = '';
let testStartTime = null;
let totalTimeLimit = 60 * 60; // 60分钟（秒）
let timerInterval = null;
let moduleOrder = ['cognitive', 'emotional', 'personality', 'situational', 'education'];
let testInProgress = false; // 标记测试是否进行中
let remainingTime = totalTimeLimit; // 剩余时间

// EmailJS配置
const EMAILJS_SERVICE_ID = 'service_vt8sfji';
const EMAILJS_TEMPLATE_ID = 'template_5j4rvqh';
const EMAILJS_PUBLIC_KEY = 'CrfCSc4YbJoFKjVaM';
const ADMIN_EMAIL = '1003150716@qq.com';

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有保存的测试进度
    checkSavedProgress();
    
    // 用户信息表单提交
    document.getElementById('userInfoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        startTest();
    });

    // 答题导航
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('submitBtn').addEventListener('click', confirmSubmit);
    
    // 页面离开前确认
    window.addEventListener('beforeunload', function(e) {
        if (testInProgress && currentPage === 'test') {
            e.preventDefault();
            e.returnValue = '测试正在进行中，确定要离开吗？您的答题进度已自动保存。';
            return e.returnValue;
        }
    });
    
    // 阻止浏览器后退
    if (window.history && window.history.pushState) {
        window.history.pushState('forward', null, '');
        window.addEventListener('popstate', function() {
            if (testInProgress && currentPage === 'test') {
                window.history.pushState('forward', null, '');
                alert('测试进行中不能使用浏览器后退按钮！您的答题进度已自动保存。');
            }
        });
    }
});

// ==================== 检查保存的进度 ====================
function checkSavedProgress() {
    const savedData = localStorage.getItem('teacherAssessmentProgress');
    if (savedData) {
        if (confirm('检测到您有未完成的测试，是否继续？\n（点击"确定"继续测试，点击"取消"重新开始）')) {
            restoreProgress();
        } else {
            clearSavedProgress();
        }
    }
}

// ==================== 恢复进度 ====================
function restoreProgress() {
    try {
        const savedData = JSON.parse(localStorage.getItem('teacherAssessmentProgress'));
        
        // 恢复数据
        userName = savedData.userName;
        userPhone = savedData.userPhone;
        testStartTime = new Date(savedData.testStartTime);
        currentModuleIndex = savedData.currentModuleIndex;
        currentQuestionIndex = savedData.currentQuestionIndex;
        userAnswers = savedData.userAnswers;
        remainingTime = savedData.remainingTime;
        
        // 切换到测试页面
        testInProgress = true;
        switchPage('test');
        loadModule(moduleOrder[currentModuleIndex]);
        startTimer();
        
        alert('已恢复您的测试进度！');
    } catch (error) {
        console.error('恢复进度失败:', error);
        clearSavedProgress();
    }
}

// ==================== 保存进度 ====================
function saveProgress() {
    if (!testInProgress) return;
    
    const progressData = {
        userName,
        userPhone,
        testStartTime: testStartTime.toISOString(),
        currentModuleIndex,
        currentQuestionIndex,
        userAnswers,
        remainingTime
    };
    
    try {
        localStorage.setItem('teacherAssessmentProgress', JSON.stringify(progressData));
    } catch (error) {
        console.error('保存进度失败:', error);
    }
}

// ==================== 清除保存的进度 ====================
function clearSavedProgress() {
    localStorage.removeItem('teacherAssessmentProgress');
}

// ==================== 开始测试 ====================
function startTest() {
    // 获取用户信息
    userName = document.getElementById('userName').value.trim();
    userPhone = document.getElementById('userPhone').value.trim();
    
    if (!userName || !userPhone) {
        alert('请填写完整的个人信息！');
        return;
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(userPhone)) {
        alert('请输入正确的手机号码！');
        return;
    }

    const agreeTerms = document.getElementById('agreeTerms').checked;
    if (!agreeTerms) {
        alert('请先阅读并同意测评须知！');
        return;
    }

    // 清除之前的进度（如果有）
    clearSavedProgress();
    
    // 初始化测试
    testStartTime = new Date();
    currentModuleIndex = 0;
    currentQuestionIndex = 0;
    userAnswers = {};
    remainingTime = totalTimeLimit;
    testInProgress = true;
    
    // 切换到测试页面
    switchPage('test');
    loadModule(moduleOrder[currentModuleIndex]);
    startTimer();
    
    // 首次保存进度
    saveProgress();
}

// ==================== 页面切换 ====================
function switchPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName + 'Page').classList.add('active');
    currentPage = pageName;
}

// ==================== 加载模块 ====================
function loadModule(moduleName) {
    currentModule = questionBank[moduleName];
    currentQuestionIndex = 0;
    
    // 更新模块信息
    document.getElementById('currentModule').textContent = currentModule.name;
    document.getElementById('moduleDescription').textContent = currentModule.description;
    
    // 生成答题卡
    generateQuestionGrid();
    
    // 加载第一题
    loadQuestion();
}

// ==================== 生成答题卡 ====================
function generateQuestionGrid() {
    const gridContainer = document.getElementById('questionGrid');
    gridContainer.innerHTML = '';
    
    const allQuestions = getAllQuestions();
    let questionNumber = 0;
    
    for (let module of moduleOrder) {
        const moduleQuestions = questionBank[module].questions;
        for (let i = 0; i < moduleQuestions.length; i++) {
            questionNumber++;
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.textContent = questionNumber;
            gridItem.dataset.module = module;
            gridItem.dataset.index = i;
            gridItem.addEventListener('click', () => jumpToQuestion(module, i));
            gridContainer.appendChild(gridItem);
        }
    }
}

// ==================== 加载题目 ====================
function loadQuestion() {
    const question = currentModule.questions[currentQuestionIndex];
    const globalQuestionNumber = getGlobalQuestionNumber();
    
    // 更新题号
    document.getElementById('questionNumber').textContent = `第${globalQuestionNumber}题`;
    document.getElementById('questionType').textContent = question.type || currentModule.name;
    
    // 更新题目内容
    if (currentModule.type === 'likert') {
        // 李克特量表题目
        document.getElementById('questionText').textContent = question.text;
        renderLikertOptions(question);
    } else {
        // 选择题
        document.getElementById('questionText').textContent = question.question;
        renderOptions(question);
    }
    
    // 更新进度
    updateProgress();
    
    // 更新答题卡状态
    updateQuestionGrid();
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// ==================== 渲染选择题选项 ====================
function renderOptions(question) {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    optionsContainer.className = 'options';
    
    const answerId = `${moduleOrder[currentModuleIndex]}_${question.id}`;
    const userAnswer = userAnswers[answerId];
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswer === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <div class="option-label">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
}

// ==================== 渲染李克特量表 ====================
function renderLikertOptions(question) {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    optionsContainer.className = 'likert-scale';
    
    const answerId = `${moduleOrder[currentModuleIndex]}_${question.id}`;
    const userAnswer = userAnswers[answerId];
    
    likertOptions.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'likert-option';
        if (userAnswer === option.value) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <div>${option.label}</div>
            <div style="font-size: 1.2rem; font-weight: 700; margin-top: 5px;">${option.value}</div>
        `;
        
        optionDiv.addEventListener('click', () => selectLikertOption(option.value));
        optionsContainer.appendChild(optionDiv);
    });
}

// ==================== 选择选项 ====================
function selectOption(index) {
    const question = currentModule.questions[currentQuestionIndex];
    const answerId = `${moduleOrder[currentModuleIndex]}_${question.id}`;
    userAnswers[answerId] = index;
    
    // 更新UI
    document.querySelectorAll('.option').forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    updateQuestionGrid();
    saveProgress(); // 保存进度
}

function selectLikertOption(value) {
    const question = currentModule.questions[currentQuestionIndex];
    const answerId = `${moduleOrder[currentModuleIndex]}_${question.id}`;
    userAnswers[answerId] = value;
    
    // 更新UI
    document.querySelectorAll('.likert-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.closest('.likert-option').classList.add('selected');
    
    updateQuestionGrid();
    saveProgress(); // 保存进度
}

// ==================== 导航功能 ====================
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    } else if (currentModuleIndex > 0) {
        // 返回上一个模块的最后一题
        currentModuleIndex--;
        loadModule(moduleOrder[currentModuleIndex]);
        currentQuestionIndex = currentModule.questions.length - 1;
        loadQuestion();
    }
    saveProgress(); // 保存进度
}

function nextQuestion() {
    const question = currentModule.questions[currentQuestionIndex];
    const answerId = `${moduleOrder[currentModuleIndex]}_${question.id}`;
    
    // 检查是否已作答
    if (userAnswers[answerId] === undefined) {
        if (!confirm('您还没有回答这道题，确定要跳过吗？')) {
            return;
        }
    }
    
    if (currentQuestionIndex < currentModule.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else if (currentModuleIndex < moduleOrder.length - 1) {
        // 进入下一个模块
        currentModuleIndex++;
        loadModule(moduleOrder[currentModuleIndex]);
    }
    saveProgress(); // 保存进度
}

function jumpToQuestion(module, index) {
    const moduleIndex = moduleOrder.indexOf(module);
    if (moduleIndex !== -1) {
        currentModuleIndex = moduleIndex;
        loadModule(module);
        currentQuestionIndex = index;
        loadQuestion();
        saveProgress(); // 保存进度
    }
}

// ==================== 更新进度 ====================
function updateProgress() {
    const totalQuestions = getAllQuestions().length;
    const answeredQuestions = Object.keys(userAnswers).length;
    const globalQuestionNumber = getGlobalQuestionNumber();
    
    document.getElementById('progress').textContent = `${answeredQuestions}/${totalQuestions}`;
    
    const progressPercentage = (globalQuestionNumber / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progressPercentage + '%';
}

// ==================== 更新答题卡 ====================
function updateQuestionGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    let questionNumber = 0;
    
    for (let module of moduleOrder) {
        const moduleQuestions = questionBank[module].questions;
        for (let i = 0; i < moduleQuestions.length; i++) {
            const question = moduleQuestions[i];
            const answerId = `${module}_${question.id}`;
            const gridItem = gridItems[questionNumber];
            
            // 清除所有状态类
            gridItem.classList.remove('answered', 'current');
            
            // 添加已答状态
            if (userAnswers[answerId] !== undefined) {
                gridItem.classList.add('answered');
            }
            
            // 添加当前题状态
            if (module === moduleOrder[currentModuleIndex] && i === currentQuestionIndex) {
                gridItem.classList.add('current');
            }
            
            questionNumber++;
        }
    }
}

// ==================== 更新导航按钮 ====================
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // 上一题按钮
    if (currentModuleIndex === 0 && currentQuestionIndex === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    // 下一题/提交按钮
    const isLastModule = currentModuleIndex === moduleOrder.length - 1;
    const isLastQuestion = currentQuestionIndex === currentModule.questions.length - 1;
    
    if (isLastModule && isLastQuestion) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
}

// ==================== 计时器 ====================
function startTimer() {
    timerInterval = setInterval(() => {
        remainingTime--;
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert('测试时间已到，系统将自动提交您的答案！');
            submitTest();
            return;
        }
        
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // 最后5分钟变红色警告
        if (remainingTime <= 300) {
            document.getElementById('timer').style.color = '#ef4444';
        }
        
        // 每30秒自动保存一次进度
        if (remainingTime % 30 === 0) {
            saveProgress();
        }
    }, 1000);
}

// ==================== 确认提交 ====================
function confirmSubmit() {
    const totalQuestions = getAllQuestions().length;
    const answeredQuestions = Object.keys(userAnswers).length;
    const unansweredCount = totalQuestions - answeredQuestions;
    
    let message = '确定要提交测试吗？';
    if (unansweredCount > 0) {
        message = `您还有 ${unansweredCount} 道题目未作答，确定要提交吗？`;
    }
    
    if (confirm(message)) {
        submitTest();
    }
}

// ==================== 提交测试 ====================
function submitTest() {
    clearInterval(timerInterval);
    testInProgress = false;
    
    // 计算各项得分
    const scores = calculateScores();
    
    // 发送邮件到管理员
    sendEmailReport(scores);
    
    // 清除保存的进度
    clearSavedProgress();
    
    // 切换到结果页面（不显示具体得分）
    switchPage('result');
    
    // 显示提交成功信息
    displaySubmitSuccess();
}

// ==================== 计算得分 ====================
function calculateScores() {
    const scores = {
        cognitive: 0,
        emotional: 0,
        personality: 0,
        situational: 0,
        education: 0,
        personalityTraits: {
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            stability: 0
        }
    };
    
    // 计算认知能力得分
    let cognitiveCorrect = 0;
    let cognitiveTotal = 0;
    questionBank.cognitive.questions.forEach(q => {
        const answerId = `cognitive_${q.id}`;
        if (userAnswers[answerId] !== undefined) {
            cognitiveTotal++;
            if (userAnswers[answerId] === q.correctAnswer) {
                cognitiveCorrect++;
            }
        }
    });
    scores.cognitive = cognitiveTotal > 0 ? Math.round((cognitiveCorrect / questionBank.cognitive.questions.length) * 100) : 0;
    
    // 计算情绪智力得分
    let emotionalCorrect = 0;
    let emotionalTotal = 0;
    questionBank.emotional.questions.forEach(q => {
        const answerId = `emotional_${q.id}`;
        if (userAnswers[answerId] !== undefined) {
            emotionalTotal++;
            if (userAnswers[answerId] === q.correctAnswer) {
                emotionalCorrect++;
            }
        }
    });
    scores.emotional = emotionalTotal > 0 ? Math.round((emotionalCorrect / questionBank.emotional.questions.length) * 100) : 0;
    
    // 计算性格特质得分
    const traitScores = {
        openness: { sum: 0, count: 0 },
        conscientiousness: { sum: 0, count: 0 },
        extraversion: { sum: 0, count: 0 },
        agreeableness: { sum: 0, count: 0 },
        stability: { sum: 0, count: 0 }
    };
    
    questionBank.personality.questions.forEach(q => {
        const answerId = `personality_${q.id}`;
        if (userAnswers[answerId] !== undefined) {
            let value = userAnswers[answerId];
            // 反向计分
            if (q.reverse) {
                value = 6 - value;
            }
            traitScores[q.trait].sum += value;
            traitScores[q.trait].count++;
        }
    });
    
    // 计算各特质得分（转换为百分制）
    Object.keys(traitScores).forEach(trait => {
        if (traitScores[trait].count > 0) {
            const avgScore = traitScores[trait].sum / traitScores[trait].count;
            scores.personalityTraits[trait] = Math.round((avgScore / 5) * 100);
        }
    });
    
    // 计算性格适配度（基于教师职业权重）
    const weights = {
        openness: 0.15,
        conscientiousness: 0.25,
        extraversion: 0.10,
        agreeableness: 0.30,
        stability: 0.20
    };
    
    let personalityScore = 0;
    Object.keys(weights).forEach(trait => {
        personalityScore += scores.personalityTraits[trait] * weights[trait];
    });
    scores.personality = Math.round(personalityScore);
    
    // 计算情境判断得分
    let situationalCorrect = 0;
    let situationalTotal = 0;
    questionBank.situational.questions.forEach(q => {
        const answerId = `situational_${q.id}`;
        if (userAnswers[answerId] !== undefined) {
            situationalTotal++;
            if (userAnswers[answerId] === q.correctAnswer) {
                situationalCorrect++;
            }
        }
    });
    scores.situational = situationalTotal > 0 ? Math.round((situationalCorrect / questionBank.situational.questions.length) * 100) : 0;
    
    // 计算教育情境得分
    let educationCorrect = 0;
    let educationTotal = 0;
    questionBank.education.questions.forEach(q => {
        const answerId = `education_${q.id}`;
        if (userAnswers[answerId] !== undefined) {
            educationTotal++;
            if (userAnswers[answerId] === q.correctAnswer) {
                educationCorrect++;
            }
        }
    });
    scores.education = educationTotal > 0 ? Math.round((educationCorrect / questionBank.education.questions.length) * 100) : 0;
    
    // 计算综合得分（加权平均）
    scores.overall = Math.round(
        scores.cognitive * 0.30 +
        scores.emotional * 0.25 +
        scores.personality * 0.25 +
        scores.situational * 0.10 +
        scores.education * 0.10
    );
    
    return scores;
}

// ==================== 发送邮件报告 ====================
function sendEmailReport(scores) {
    // 生成详细报告内容
    const reportContent = generateEmailReport(scores);
    
    // 使用EmailJS发送邮件
    const templateParams = {
        to_email: ADMIN_EMAIL,
        candidate_name: userName,
        candidate_phone: userPhone,
        test_date: testStartTime.toLocaleString('zh-CN'),
        overall_score: scores.overall,
        cognitive_score: scores.cognitive,
        emotional_score: scores.emotional,
        personality_score: scores.personality,
        situational_score: scores.situational,
        education_score: scores.education,
        openness: scores.personalityTraits.openness,
        conscientiousness: scores.personalityTraits.conscientiousness,
        extraversion: scores.personalityTraits.extraversion,
        agreeableness: scores.personalityTraits.agreeableness,
        stability: scores.personalityTraits.stability,
        report_content: reportContent
    };
    
    // 显示发送中提示
    showLoadingMessage('正在提交测试结果，请稍候...');
    
    // 发送邮件
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(function(response) {
            console.log('邮件发送成功', response.status, response.text);
            hideLoadingMessage();
        }, function(error) {
            console.error('邮件发送失败', error);
            hideLoadingMessage();
            // 即使邮件发送失败，也继续显示提交成功页面
        });
}

// ==================== 生成邮件报告内容 ====================
function generateEmailReport(scores) {
    let level = '';
    if (scores.overall >= 85) {
        level = '优秀 (Excellent) - 强烈推荐录用';
    } else if (scores.overall >= 70) {
        level = '良好 (Good) - 推荐录用';
    } else if (scores.overall >= 60) {
        level = '合格 (Fair) - 可以考虑录用，需培训';
    } else {
        level = '需提升 (Needs Improvement) - 不建议录用';
    }
    
    let report = `
========================================
教师入职综合能力测评报告
========================================

考生信息：
姓名：${userName}
联系方式：${userPhone}
测试时间：${testStartTime.toLocaleString('zh-CN')}
答题数量：${Object.keys(userAnswers).length}/140题

========================================
综合评估结果
========================================

综合得分：${scores.overall}/100
评定等级：${level}

========================================
各项能力详细得分
========================================

1. 认知能力 (IQ)：${scores.cognitive}/100
   ${scores.cognitive >= 85 ? '表现优异，展现出卓越的认知能力和逻辑思维。' : 
     scores.cognitive >= 70 ? '表现良好，具备成为优秀教师的认知基础。' :
     scores.cognitive >= 60 ? '表现合格，但仍有提升空间。' :
     '需要加强，建议进行针对性学习和训练。'}

2. 情绪智力 (压力情商)：${scores.emotional}/100
   ${scores.emotional >= 85 ? '表现优异，具备卓越的情绪管理和社交能力。' :
     scores.emotional >= 70 ? '表现良好，能够有效应对教学压力情境。' :
     scores.emotional >= 60 ? '表现合格，但情绪管理能力需提升。' :
     '需要加强，建议学习情绪管理技巧。'}

3. 性格适配度：${scores.personality}/100
   ${scores.personality >= 85 ? '个性特质与教师职业高度匹配。' :
     scores.personality >= 70 ? '个性特质与教师职业匹配良好。' :
     scores.personality >= 60 ? '个性特质基本符合教师职业要求。' :
     '个性特质与教师职业匹配度较低。'}

4. 情境判断能力：${scores.situational}/100
   ${scores.situational >= 85 ? '在实际教学情境中具备优秀的决策能力。' :
     scores.situational >= 70 ? '在实际教学情境中具备良好的决策能力。' :
     scores.situational >= 60 ? '情境判断能力合格，但需要更多实践经验。' :
     '情境判断能力需要提升，建议多观摩学习。'}

5. 教育情境应对：${scores.education}/100
   ${scores.education >= 85 ? '对教育专业情境的应对能力优秀。' :
     scores.education >= 70 ? '对教育专业情境的应对能力良好。' :
     scores.education >= 60 ? '对教育专业情境的应对能力合格。' :
     '对教育专业情境的应对能力需要提升。'}

========================================
性格特质分析 (Big Five)
========================================

开放性 (Openness)：${scores.personalityTraits.openness}%
尽责性 (Conscientiousness)：${scores.personalityTraits.conscientiousness}%
外向性 (Extraversion)：${scores.personalityTraits.extraversion}%
宜人性 (Agreeableness)：${scores.personalityTraits.agreeableness}%
情绪稳定性 (Emotional Stability)：${scores.personalityTraits.stability}%

========================================
综合评价与建议
========================================

`;

    // 添加综合评价
    if (scores.overall >= 85) {
        report += '该候选人表现出色，具备优秀教师的核心素质。在认知能力、情绪管理和专业判断方面都展现出高水平，建议优先考虑录用。\n\n';
    } else if (scores.overall >= 70) {
        report += '该候选人具备良好的教师素质，整体表现令人满意。在大部分能力维度上都达到了标准要求，适合从事教师职业。\n\n';
    } else if (scores.overall >= 60) {
        report += '该候选人的基本素质合格，但在某些方面还需要进一步提升。建议在入职后接受针对性培训，以更好地适应教师工作。\n\n';
    } else {
        report += '该候选人的当前能力水平与教师岗位要求还有一定差距。建议进行系统学习和能力提升后再考虑从事教师工作。\n\n';
    }
    
    // 添加具体建议
    report += '具体建议：\n';
    
    if (scores.cognitive < 70) {
        report += '• 认知能力需要提升：建议多进行逻辑推理训练，阅读专业书籍，参加思维训练课程。\n';
    }
    
    if (scores.emotional < 70) {
        report += '• 情绪智力需要发展：建议学习情绪管理技巧，提高同理心，可以通过心理学课程、冥想练习等方式增强情绪感知和调节能力。\n';
    }
    
    if (scores.personality < 70) {
        report += '• 性格特质需要调适：建议培养耐心、责任感和同理心，这些特质对教师工作至关重要。\n';
    }
    
    if (scores.situational < 70) {
        report += '• 情境判断能力需要提升：建议多观摩优秀教师的课堂，学习处理突发情况的技巧，积累实际教学经验。\n';
    }
    
    if (scores.education < 70) {
        report += '• 教育专业能力需要加强：建议系统学习教育学、心理学知识，了解学生发展规律和教学方法，参加教师培训课程。\n';
    }
    
    // 添加性格特质建议
    if (scores.personalityTraits.agreeableness < 60) {
        report += '• 建议提升同理心和关爱品质，这对教师职业至关重要。\n';
    }
    
    if (scores.personalityTraits.conscientiousness < 60) {
        report += '• 建议增强责任感和组织能力，培养严谨的工作习惯。\n';
    }
    
    if (scores.personalityTraits.stability < 60) {
        report += '• 建议加强情绪稳定性训练，学习压力管理技巧。\n';
    }
    
    report += '\n========================================\n';
    report += '报告生成时间：' + new Date().toLocaleString('zh-CN') + '\n';
    report += '========================================\n';
    
    return report;
}

// ==================== 显示提交成功信息 ====================
function displaySubmitSuccess() {
    // 隐藏所有详细得分信息
    document.querySelector('.overall-score').style.display = 'none';
    document.querySelector('.radar-chart-container').style.display = 'none';
    document.querySelector('.detailed-scores').style.display = 'none';
    document.querySelector('.personality-profile').style.display = 'none';
    document.querySelector('.recommendation').style.display = 'none';
    document.querySelector('.result-actions').style.display = 'none';
    
    // 显示提交成功信息
    const successMessage = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 80px; color: #10b981; margin-bottom: 30px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="font-size: 2rem; color: #1f2937; margin-bottom: 20px;">测试提交成功！</h2>
            <p style="font-size: 1.2rem; color: #6b7280; margin-bottom: 30px; line-height: 1.8;">
                感谢您完成教师入职综合能力测评！<br>
                您的测试结果已经成功提交至系统。
            </p>
            <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 15px; padding: 30px; margin: 30px auto; max-width: 600px;">
                <p style="font-size: 1.1rem; color: #047857; margin-bottom: 15px;">
                    <i class="fas fa-info-circle"></i> <strong>重要提示</strong>
                </p>
                <p style="color: #065f46; line-height: 1.8;">
                    您的详细测评报告已发送至招聘单位邮箱。<br>
                    招聘单位将在3-5个工作日内审核您的测评结果，<br>
                    并通过手机号码 <strong>${userPhone}</strong> 联系您。
                </p>
            </div>
            <div style="margin-top: 40px;">
                <button onclick="location.reload()" class="btn-primary" style="padding: 15px 50px; font-size: 1.1rem;">
                    <i class="fas fa-home"></i> 返回首页
                </button>
            </div>
        </div>
    `;
    
    document.querySelector('#resultPage .container').innerHTML = successMessage;
}

// ==================== 显示/隐藏加载提示 ====================
function showLoadingMessage(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    loadingDiv.innerHTML = `
        <div style="background: white; padding: 40px 60px; border-radius: 20px; text-align: center;">
            <div style="font-size: 50px; color: #2563eb; margin-bottom: 20px;">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <p style="font-size: 1.2rem; color: #1f2937;">${message}</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loadingMessage');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// ==================== 显示结果（保留原函数用于邮件生成） ====================
function displayResults(scores) {
    // 这个函数现在主要用于生成邮件报告
    // 实际显示由displaySubmitSuccess()处理
    // 显示用户信息
    document.getElementById('displayName').textContent = userName;
    document.getElementById('displayPhone').textContent = userPhone;
    
    // 显示测试日期
    document.getElementById('testDate').textContent = 
        `测试时间：${testStartTime.toLocaleString('zh-CN')}`;
    
    // 显示综合得分
    document.getElementById('overallScore').textContent = scores.overall;
    
    // 动画效果：圆形进度
    setTimeout(() => {
        const circumference = 2 * Math.PI * 90;
        const offset = circumference - (scores.overall / 100) * circumference;
        document.getElementById('overallScoreCircle').style.strokeDashoffset = offset;
    }, 500);
    
    // 显示等级
    const scoreLevel = document.getElementById('scoreLevel');
    if (scores.overall >= 85) {
        scoreLevel.textContent = '优秀 (Excellent)';
        scoreLevel.className = 'score-level excellent';
    } else if (scores.overall >= 70) {
        scoreLevel.textContent = '良好 (Good)';
        scoreLevel.className = 'score-level good';
    } else if (scores.overall >= 60) {
        scoreLevel.textContent = '合格 (Fair)';
        scoreLevel.className = 'score-level fair';
    } else {
        scoreLevel.textContent = '需提升 (Needs Improvement)';
        scoreLevel.className = 'score-level poor';
    }
    
    // 显示各项得分
    displayDetailedScores(scores);
    
    // 显示性格特质
    displayPersonalityTraits(scores.personalityTraits);
    
    // 绘制雷达图
    drawRadarChart(scores);
    
    // 显示建议
    displayRecommendation(scores);
}

// ==================== 显示详细得分 ====================
function displayDetailedScores(scores) {
    const scoreData = [
        { id: 'iq', score: scores.cognitive, name: '认知能力' },
        { id: 'eq', score: scores.emotional, name: '情绪智力' },
        { id: 'personality', score: scores.personality, name: '性格适配度' },
        { id: 'situational', score: scores.situational, name: '情境判断能力' },
        { id: 'education', score: scores.education, name: '教育情境应对' }
    ];
    
    scoreData.forEach(item => {
        document.getElementById(item.id + 'Score').textContent = item.score;
        
        // 动画效果：进度条
        setTimeout(() => {
            document.getElementById(item.id + 'Bar').style.width = item.score + '%';
        }, 500);
        
        // 评语
        let desc = '';
        if (item.score >= 85) {
            desc = `您的${item.name}表现优异，展现出卓越的教师素质。`;
        } else if (item.score >= 70) {
            desc = `您的${item.name}良好，具备成为优秀教师的基础。`;
        } else if (item.score >= 60) {
            desc = `您的${item.name}合格，但仍有提升空间。`;
        } else {
            desc = `您的${item.name}需要加强，建议进行针对性学习和训练。`;
        }
        document.getElementById(item.id + 'Desc').textContent = desc;
    });
}

// ==================== 显示性格特质 ====================
function displayPersonalityTraits(traits) {
    const traitData = [
        { id: 'openness', score: traits.openness, name: '开放性' },
        { id: 'conscientiousness', score: traits.conscientiousness, name: '尽责性' },
        { id: 'extraversion', score: traits.extraversion, name: '外向性' },
        { id: 'agreeableness', score: traits.agreeableness, name: '宜人性' },
        { id: 'stability', score: traits.stability, name: '情绪稳定性' }
    ];
    
    traitData.forEach(item => {
        document.getElementById(item.id + 'Score').textContent = item.score;
        
        // 动画效果：进度条
        setTimeout(() => {
            document.getElementById(item.id + 'Bar').style.width = item.score + '%';
        }, 500);
    });
}

// ==================== 绘制雷达图 ====================
function drawRadarChart(scores) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    // 添加SVG渐变（用于圆形进度）
    const svgNS = "http://www.w3.org/2000/svg";
    const defs = document.createElementNS(svgNS, "defs");
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#2563eb");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#7c3aed");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    document.querySelector('#overallScoreCircle').parentElement.insertBefore(defs, document.querySelector('#overallScoreCircle'));
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['认知能力', '情绪智力', '性格适配', '情境判断', '教育情境'],
            datasets: [{
                label: '能力得分',
                data: [
                    scores.cognitive,
                    scores.emotional,
                    scores.personality,
                    scores.situational,
                    scores.education
                ],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(37, 99, 235, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: {
                            size: 12
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// ==================== 显示建议 ====================
function displayRecommendation(scores) {
    const recommendationDiv = document.getElementById('recommendation');
    let html = '<div class="recommendation-content">';
    
    // 综合评价
    if (scores.overall >= 85) {
        html += '<p><strong>综合评价：</strong>您表现出色，具备优秀教师的核心素质。您在认知能力、情绪管理和专业判断方面都展现出高水平，建议优先考虑录用。</p>';
    } else if (scores.overall >= 70) {
        html += '<p><strong>综合评价：</strong>您具备良好的教师素质，整体表现令人满意。在大部分能力维度上都达到了标准要求，适合从事教师职业。</p>';
    } else if (scores.overall >= 60) {
        html += '<p><strong>综合评价：</strong>您的基本素质合格，但在某些方面还需要进一步提升。建议在入职后接受针对性培训，以更好地适应教师工作。</p>';
    } else {
        html += '<p><strong>综合评价：</strong>您的当前能力水平与教师岗位要求还有一定差距。建议进行系统学习和能力提升后再考虑从事教师工作。</p>';
    }
    
    html += '<p><strong>具体建议：</strong></p><ul>';
    
    // 针对各项能力的建议
    if (scores.cognitive < 70) {
        html += '<li><strong>认知能力提升：</strong>建议多进行逻辑推理训练，阅读专业书籍，参加思维训练课程，提升问题分析和解决能力。</li>';
    }
    
    if (scores.emotional < 70) {
        html += '<li><strong>情绪智力发展：</strong>建议学习情绪管理技巧，提高同理心，可以通过心理学课程、冥想练习等方式增强情绪感知和调节能力。</li>';
    }
    
    if (scores.personality < 70) {
        html += '<li><strong>性格特质调适：</strong>建议培养耐心、责任感和同理心，这些特质对教师工作至关重要。可以通过志愿服务、小组辅导等活动锻炼相关能力。</li>';
    }
    
    if (scores.situational < 70) {
        html += '<li><strong>情境判断能力：</strong>建议多观摩优秀教师的课堂，学习处理突发情况的技巧，积累实际教学经验。</li>';
    }
    
    if (scores.education < 70) {
        html += '<li><strong>教育专业能力：</strong>建议系统学习教育学、心理学知识，了解学生发展规律和教学方法，参加教师培训课程。</li>';
    }
    
    // 性格特质建议
    if (scores.personalityTraits.agreeableness < 60) {
        html += '<li><strong>提升同理心：</strong>教师需要具备较强的同理心和关爱学生的品质，建议多站在他人角度思考问题，培养耐心和包容心。</li>';
    }
    
    if (scores.personalityTraits.conscientiousness < 60) {
        html += '<li><strong>增强责任感：</strong>教师工作需要高度的责任心和组织能力，建议培养严谨的工作习惯，注重细节和规划。</li>';
    }
    
    if (scores.personalityTraits.stability < 60) {
        html += '<li><strong>情绪稳定性：</strong>建议学习压力管理技巧，建立健康的生活方式，保持情绪稳定对教师工作非常重要。</li>';
    }
    
    // 优势总结
    html += '</ul><p><strong>您的优势：</strong></p><ul>';
    
    if (scores.cognitive >= 80) {
        html += '<li>优秀的认知能力和逻辑思维，能够很好地处理复杂的教学问题。</li>';
    }
    
    if (scores.emotional >= 80) {
        html += '<li>出色的情绪智力，能够有效管理自己和学生的情绪，营造良好的教学氛围。</li>';
    }
    
    if (scores.personalityTraits.agreeableness >= 80) {
        html += '<li>高度的同理心和关爱品质，能够与学生建立良好的师生关系。</li>';
    }
    
    if (scores.personalityTraits.conscientiousness >= 80) {
        html += '<li>强烈的责任感和组织能力，能够高质量地完成教学任务。</li>';
    }
    
    html += '</ul></div>';
    recommendationDiv.innerHTML = html;
}

// ==================== 辅助函数 ====================
function getAllQuestions() {
    let allQuestions = [];
    moduleOrder.forEach(module => {
        allQuestions = allQuestions.concat(questionBank[module].questions);
    });
    return allQuestions;
}

function getGlobalQuestionNumber() {
    let number = 0;
    for (let i = 0; i < currentModuleIndex; i++) {
        number += questionBank[moduleOrder[i]].questions.length;
    }
    number += currentQuestionIndex + 1;
    return number;
}
