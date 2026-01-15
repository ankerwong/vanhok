// AI个人陈述生成器功能
document.addEventListener('DOMContentLoaded', function() {
    const psForm = document.getElementById('psForm');
    const generatedResult = document.getElementById('generatedResult');
    const psContent = document.getElementById('psContent');
    const currentWordCount = document.getElementById('currentWordCount');
    const aiAnalysis = document.getElementById('aiAnalysis');
    
    const editBtn = document.getElementById('editBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    // 存储当前表单数据
    let currentFormData = null;

    // 表单提交
    psForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 收集表单数据
        const formData = {
            name: document.getElementById('studentName').value,
            age: document.getElementById('studentAge').value,
            university: document.getElementById('targetUniversity').value,
            customUniversity: document.getElementById('customUniversity').value,
            major: document.getElementById('targetMajor').value,
            gpa: document.getElementById('gpa').value,
            awards: document.getElementById('awards').value,
            academicInterest: document.getElementById('academicInterest').value,
            traits: Array.from(document.querySelectorAll('input[name="traits"]:checked')).map(el => el.value),
            activities: document.getElementById('activities').value,
            hobbies: document.getElementById('hobbies').value,
            personalStory: document.getElementById('personalStory').value,
            wordCount: parseInt(document.getElementById('wordCount').value)
        };

        // 优先使用自定义院校
        if (formData.customUniversity.trim()) {
            formData.finalUniversity = formData.customUniversity.trim();
        } else {
            formData.finalUniversity = formData.university;
        }

        currentFormData = formData;
        
        // 生成个人陈述
        const ps = generatePersonalStatement(formData);
        
        // 显示结果
        psContent.innerHTML = ps;
        generatedResult.style.display = 'block';
        
        // 更新字数统计
        updateWordCount();
        
        // 生成AI分析
        generateAnalysis(formData);
        
        // 滚动到结果区域
        generatedResult.scrollIntoView({ behavior: 'smooth' });
    });

    // 生成个人陈述主函数
    function generatePersonalStatement(data) {
        const opening = generateOpening(data);
        const academicBody = generateAcademicBody(data);
        const experienceBody = generateExperienceBody(data);
        const personalStoryPara = generatePersonalStoryParagraph(data);
        const futureGoals = generateFutureGoals(data);
        const conclusion = generateConclusion(data);

        // 组合所有段落
        let fullPS = `<p>${opening}</p>`;
        fullPS += `<p>${academicBody}</p>`;
        if (experienceBody) fullPS += `<p>${experienceBody}</p>`;
        if (personalStoryPara) fullPS += `<p>${personalStoryPara}</p>`;
        fullPS += `<p>${futureGoals}</p>`;
        fullPS += `<p>${conclusion}</p>`;

        return fullPS;
    }

    // 生成开头段落 - 使用多种策略
    function generateOpening(data) {
        const strategies = ['twist', 'confession', 'scene', 'philosophical'];
        const strategy = strategies[Math.floor(Math.random() * strategies.length)];

        const majorInterest = data.academicInterest || `我对${getMajorZh(data.major)}充满热情`;

        switch(strategy) {
            case 'twist':
                return `很多人认为${getMajorZh(data.major)}只是一门技术性学科,但对我来说,它代表着更深层的意义——理解世界运作的方式,并用知识创造积极的改变。${majorInterest.substring(0, 80)}...这不仅是学术兴趣,更是我希望为之奉献一生的事业。`;
            
            case 'confession':
                return `我必须坦白:在决定申请${getMajorZh(data.major)}之前,我经历了漫长的探索过程。${majorInterest.substring(0, 100)}...正是这段探索让我确信,${getMajorZh(data.major)}是我真正想要深入研究的领域。`;
            
            case 'scene':
                return `${data.academicInterest ? data.academicInterest.substring(0, 120) : `记得第一次接触${getMajorZh(data.major)}的那个下午,我被这个领域的深度和广度所震撼。`}从那时起,我开始系统地学习相关知识,每一次新的发现都让我更加确信这是我想要追求的方向。`;
            
            case 'philosophical':
                return `在这个快速变化的时代,${getMajorZh(data.major)}的意义是什么?${majorInterest.substring(0, 100)}...这个问题一直驱动着我的学习和探索。我相信,深入理解这个领域不仅能够帮助我实现个人目标,更能让我为社会创造价值。`;
        }
    }

    // 生成学术主体段落(遵循80%学术原则)
    function generateAcademicBody(data) {
        let para = `在过去的学习中,我系统地准备了${getMajorZh(data.major)}的相关课程。`;
        
        if (data.gpa) {
            para += `我的学术成绩${data.gpa},这不仅反映了我的努力,更体现了我对学术追求的严谨态度。`;
        }

        if (data.academicInterest) {
            para += `特别是${data.academicInterest.substring(0, 150)}...这种深度学习让我不仅掌握了基础知识,更培养了批判性思维和独立研究的能力。`;
        } else {
            para += `我特别关注${getMajorZh(data.major)}领域的前沿发展,通过阅读学术论文和参与在线课程,不断扩展自己的知识边界。`;
        }

        if (data.awards) {
            para += `我在${data.awards}中取得的成绩,证明了我的学术能力,也激励我继续深入探索。`;
        }

        return para;
    }

    // 生成经历段落(20%比重)
    function generateExperienceBody(data) {
        if (!data.activities && !data.hobbies) return '';

        let para = '';
        
        if (data.activities) {
            para += `除了学术学习,我也积极参与实践活动。${data.activities.substring(0, 200)}...这些经历不仅丰富了我的视野,更让我学会了${data.traits.slice(0, 2).join('、')}等重要品质。`;
        }

        if (data.hobbies) {
            para += `在课余时间,我对${data.hobbies}充满热情。这些兴趣帮助我保持身心平衡,也培养了我的创造力和持久专注力。`;
        }

        return para;
    }

    // 生成个人故事段落
    function generatePersonalStoryParagraph(data) {
        if (!data.personalStory) return '';

        return `有一段经历深刻影响了我:${data.personalStory.substring(0, 250)}...这段经历让我更加坚定了学习${getMajorZh(data.major)}的决心,也让我明白了${data.traits[0] || '坚持不懈'}的重要性。`;
    }

    // 生成未来目标段落
    function generateFutureGoals(data) {
        const univName = getUniversityFullName(data.finalUniversity);
        
        let para = `选择${univName}是我经过深思熟虑的决定。这所学校在${getMajorZh(data.major)}领域的卓越声誉、`;
        para += `世界一流的师资力量和丰富的研究资源,都让我相信这里是我实现学术目标的理想之地。`;
        para += `我渴望在这里深入学习${getMajorZh(data.major)}的核心课程,参与前沿研究项目,`;
        para += `并与来自世界各地的优秀学者交流。我相信,在${univName}的学习经历将为我未来的职业发展奠定坚实基础。`;

        return para;
    }

    // 生成结尾段落 - 呼应开头,展现价值观
    function generateConclusion(data) {
        const coreValues = data.traits.slice(0, 3).join('、') || '学术热情、批判性思维和社会责任感';
        
        let para = `回顾我的学习历程,我意识到${getMajorZh(data.major)}不仅是我的学术选择,更是我价值观的体现。`;
        para += `${coreValues}——这些品质将继续指引我在学术道路上前行。`;
        para += `我已经准备好迎接大学阶段的挑战,用知识和行动为这个世界创造积极的影响。`;
        para += `我相信,在${getUniversityFullName(data.finalUniversity)}的学习将是我人生中最重要的旅程之一。`;

        return para;
    }

    // 生成AI分析
    function generateAnalysis(data) {
        const structure = analyzeStructure(data);
        const values = analyzeValues(data);
        const suggestions = generateSuggestions(data);

        aiAnalysis.innerHTML = `
            <div class="analysis-section">
                <h5><i class="fas fa-layer-group"></i> 结构分析</h5>
                <p>${structure}</p>
            </div>
            <div class="analysis-section">
                <h5><i class="fas fa-gem"></i> 核心价值观</h5>
                <p>${values}</p>
            </div>
            <div class="analysis-section">
                <h5><i class="fas fa-lightbulb"></i> 改进建议</h5>
                <ul>
                    ${suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // 结构分析
    function analyzeStructure(data) {
        let analysis = `这篇个人陈述采用了清晰的结构:开头引入学术兴趣,`;
        analysis += `主体部分遵循80/20原则(80%学术内容,20%课外经历),`;
        analysis += `然后说明选择${getUniversityFullName(data.finalUniversity)}的原因,`;
        analysis += `最后以展望未来作结。整体结构合理,逻辑连贯。`;
        return analysis;
    }

    // 价值观分析
    function analyzeValues(data) {
        if (data.traits.length === 0) {
            return `根据您的描述,这篇PS体现了对学术追求的热情和对专业的认真态度。`;
        }
        
        return `这篇个人陈述突出展现了以下核心价值观:${data.traits.join('、')}。` +
               `这些品质通过您的学术经历和实践活动得到了具体体现,让招生官能够理解您的个人特质。`;
    }

    // 生成改进建议
    function generateSuggestions(data) {
        const suggestions = [];

        suggestions.push('<strong>个性化修改:</strong> 这是AI生成的初稿,请务必添加更多个人化的细节、具体的数据和真实的情感,使其真正反映您的经历和思考。');
        
        if (!data.academicInterest || data.academicInterest.length < 50) {
            suggestions.push('<strong>学术深度:</strong> 建议扩展"为什么选择这个专业"部分,加入具体的学术兴趣点,如特定的理论、研究方向或社会问题。');
        }

        if (!data.personalStory) {
            suggestions.push('<strong>个人故事:</strong> 考虑添加一个转折点或关键经历,让PS更有感染力和记忆点。');
        }

        if (!data.awards && !data.activities) {
            suggestions.push('<strong>经历支撑:</strong> 建议添加更多具体的活动、项目或成就,用实例支撑您的特质和能力。');
        }

        suggestions.push('<strong>具体化:</strong> 将笼统的描述改为具体的例子。例如,不要只说"我热爱科学",而要描述一个让您产生这种热情的具体时刻。');
        
        suggestions.push('<strong>展现思考:</strong> 在描述经历后,一定要说明"学到了什么""如何改变了您",展现反思和成长。');
        
        suggestions.push(`<strong>院校适配:</strong> 深入研究${getUniversityFullName(data.finalUniversity)}的特色项目、教授研究方向,在PS中提及1-2个具体的资源或课程。`);
        
        suggestions.push('<strong>语言润色:</strong> 让母语者或专业老师帮您校对语法,确保表达地道、简洁有力。');
        
        suggestions.push('<strong>多次迭代:</strong> 好的PS需要10-20次修改。每次修改后,放置一天再重读,往往能发现新的改进点。');

        return suggestions;
    }

    // 辅助函数:获取专业中文名
    function getMajorZh(major) {
        const majorMap = {
            'Computer Science': '计算机科学',
            'Engineering': '工程学',
            'Medicine': '医学',
            'Business': '商科',
            'Economics': '经济学',
            'Mathematics': '数学',
            'Physics': '物理学',
            'Chemistry': '化学',
            'Biology': '生物学',
            'Law': '法律',
            'Psychology': '心理学',
            'Literature': '文学',
            'History': '历史',
            'Philosophy': '哲学',
            'Art': '艺术设计',
            'Architecture': '建筑学'
        };
        return majorMap[major] || major;
    }

    // 辅助函数:获取完整大学名称
    function getUniversityFullName(shortName) {
        const univMap = {
            'Oxford': 'University of Oxford',
            'Cambridge': 'University of Cambridge',
            'Imperial': 'Imperial College London',
            'LSE': 'London School of Economics',
            'UCL': 'University College London',
            'KCL': "King's College London",
            'Edinburgh': 'University of Edinburgh',
            'Manchester': 'University of Manchester',
            'Warwick': 'University of Warwick',
            'Bristol': 'University of Bristol',
            'Harvard': 'Harvard University',
            'MIT': 'Massachusetts Institute of Technology',
            'Stanford': 'Stanford University',
            'Yale': 'Yale University',
            'Princeton': 'Princeton University',
            'Columbia': 'Columbia University',
            'UChicago': 'University of Chicago',
            'Penn': 'University of Pennsylvania',
            'Cornell': 'Cornell University',
            'Duke': 'Duke University',
            'Northwestern': 'Northwestern University',
            'JHU': 'Johns Hopkins University',
            'Berkeley': 'UC Berkeley',
            'UCLA': 'UCLA',
            'HKU': 'The University of Hong Kong',
            'CUHK': 'The Chinese University of Hong Kong',
            'HKUST': 'Hong Kong University of Science and Technology',
            'CityU': 'City University of Hong Kong',
            'PolyU': 'Hong Kong Polytechnic University',
            'Toronto': 'University of Toronto',
            'UBC': 'University of British Columbia',
            'McGill': 'McGill University',
            'Waterloo': 'University of Waterloo',
            'Melbourne': 'University of Melbourne',
            'Sydney': 'University of Sydney',
            'ANU': 'Australian National University',
            'UNSW': 'University of New South Wales',
            'Monash': 'Monash University',
            'NUS': 'National University of Singapore',
            'NTU': 'Nanyang Technological University'
        };
        return univMap[shortName] || shortName;
    }

    // 更新字数统计
    function updateWordCount() {
        const text = psContent.innerText || psContent.textContent;
        const words = text.trim().split(/\s+/).length;
        currentWordCount.textContent = words;
    }

    // 编辑按钮
    editBtn.addEventListener('click', function() {
        const isEditing = psContent.getAttribute('contenteditable') === 'true';
        
        if (isEditing) {
            psContent.setAttribute('contenteditable', 'false');
            this.innerHTML = '<i class="fas fa-edit"></i> 编辑';
        } else {
            psContent.setAttribute('contenteditable', 'true');
            psContent.focus();
            this.innerHTML = '<i class="fas fa-save"></i> 保存';
            
            // 监听内容变化,实时更新字数
            psContent.addEventListener('input', updateWordCount);
        }
    });

    // 复制按钮
    copyBtn.addEventListener('click', function() {
        const text = psContent.innerText || psContent.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            // 显示复制成功提示
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> 已复制';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
            }, 2000);
        }).catch(err => {
            alert('复制失败,请手动复制');
        });
    });

    // 下载按钮
    downloadBtn.addEventListener('click', function() {
        const text = psContent.innerText || psContent.textContent;
        const filename = `PersonalStatement_${currentFormData.name}_${currentFormData.finalUniversity}.txt`;
        
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 重新生成按钮
    regenerateBtn.addEventListener('click', function() {
        if (currentFormData) {
            // 使用相同的数据重新生成(会有一定随机性)
            const ps = generatePersonalStatement(currentFormData);
            psContent.innerHTML = ps;
            updateWordCount();
            generateAnalysis(currentFormData);
            
            // 滚动到结果顶部
            generatedResult.scrollIntoView({ behavior: 'smooth' });
        }
    });
});