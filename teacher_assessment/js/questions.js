// ==================== 题库数据 ====================

const questionBank = {
    // 模块1: 认知能力测试 (25题, 20分钟)
    cognitive: {
        name: "认知能力测试 (IQ评估)",
        description: "测试您的逻辑推理、抽象思维和问题解决能力",
        timeLimit: 20,
        questions: [
            // 逻辑推理题 (10题)
            {
                id: 1,
                type: "逻辑推理",
                question: "一位学生在数学课上表现优异，但在语文课上经常分心。家长向班主任反映，孩子在家中也表现出对数学的浓厚兴趣，但对语文学习缺乏热情。以下哪项陈述可以从此信息中合理推断？",
                options: [
                    "所有数学好的学生都不喜欢语文",
                    "该学生具有较强的逻辑思维能力",
                    "如果学生对某学科缺乏兴趣，他在该学科的表现必然不佳",
                    "该学生的学习表现完全取决于家庭环境"
                ],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 2,
                type: "逻辑推理",
                question: "班级中有三名学生：小明、小红和小刚。已知：(1)小明比小红高；(2)小刚不是最矮的；(3)小红不是最高的。以下哪项陈述一定为真？",
                options: [
                    "小明最高",
                    "小刚最矮",
                    "小红最矮",
                    "小刚比小明矮"
                ],
                correctAnswer: 2,
                weight: 4
            },
            {
                id: 3,
                type: "逻辑推理",
                question: "如果所有优秀的教师都善于沟通，而李老师不善于沟通，那么可以得出什么结论？",
                options: [
                    "李老师不是优秀的教师",
                    "李老师是优秀的教师",
                    "善于沟通的都是优秀教师",
                    "无法得出确定结论"
                ],
                correctAnswer: 0,
                weight: 4
            },
            {
                id: 4,
                type: "逻辑推理",
                question: "在一次考试中，学生的成绩分布为：30%的学生得了优秀，50%的学生得了良好，其余的学生得了及格。如果全班有40名学生，那么得及格的学生有多少人？",
                options: [
                    "6人",
                    "8人",
                    "10人",
                    "12人"
                ],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 5,
                type: "逻辑推理",
                question: "某学校规定：凡是参加社团活动的学生都能获得加分。张同学没有获得加分。由此可以推断：",
                options: [
                    "张同学没有参加社团活动",
                    "张同学参加了社团活动但没获得加分",
                    "只有张同学没有参加社团活动",
                    "无法确定张同学是否参加社团活动"
                ],
                correctAnswer: 0,
                weight: 4
            },
            {
                id: 6,
                type: "逻辑推理",
                question: "四位老师A、B、C、D教授不同科目：数学、语文、英语、物理。已知：(1)A不教数学；(2)B教语文或英语；(3)如果C教数学，则D教物理；(4)如果B教英语，则C教数学。若A教物理，则谁教数学？",
                options: [
                    "B",
                    "C",
                    "D",
                    "无法确定"
                ],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 7,
                type: "逻辑推理",
                question: "研究表明，经常参加体育锻炼的学生学习成绩普遍较好。以下哪项如果为真，最能削弱上述结论？",
                options: [
                    "有些不参加体育锻炼的学生成绩也很好",
                    "学习成绩好的学生更有时间和精力参加体育锻炼",
                    "体育锻炼能够提高学生的身体素质",
                    "学校应该增加体育课时间"
                ],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 8,
                type: "逻辑推理",
                question: "班级选举班长，有三位候选人：甲、乙、丙。投票结果显示：甲得票数是乙的2倍，乙得票数是丙的1.5倍。如果丙得了6票，那么甲得了多少票？",
                options: [
                    "12票",
                    "15票",
                    "18票",
                    "24票"
                ],
                correctAnswer: 2,
                weight: 4
            },
            {
                id: 9,
                type: "逻辑推理",
                question: "某次测验中，小李的成绩比小王高，小王的成绩比小张高，小张的成绩比小李低。以下哪项陈述一定正确？",
                options: [
                    "小李的成绩最高",
                    "小张的成绩最低",
                    "小王的成绩居中",
                    "以上陈述都正确"
                ],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 10,
                type: "逻辑推理",
                question: "学校图书馆规定：只有持有借书证的人才能借书，所有教师都有借书证。小明借到了书，由此可以推断：",
                options: [
                    "小明是教师",
                    "小明有借书证",
                    "小明可能是学生",
                    "B和C都正确"
                ],
                correctAnswer: 3,
                weight: 4
            },
            
            // 数列推理题 (8题)
            {
                id: 11,
                type: "数列推理",
                question: "找出数列规律：2, 5, 11, 23, 47, ?",
                options: ["94", "95", "96", "97"],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 12,
                type: "数列推理",
                question: "找出数列规律：1, 4, 9, 16, 25, ?",
                options: ["30", "35", "36", "49"],
                correctAnswer: 2,
                weight: 4
            },
            {
                id: 13,
                type: "数列推理",
                question: "找出数列规律：3, 6, 12, 24, 48, ?",
                options: ["72", "84", "96", "108"],
                correctAnswer: 2,
                weight: 4
            },
            {
                id: 14,
                type: "数列推理",
                question: "找出数列规律：1, 1, 2, 3, 5, 8, ?",
                options: ["11", "12", "13", "15"],
                correctAnswer: 2,
                weight: 4
            },
            {
                id: 15,
                type: "数列推理",
                question: "找出数列规律：5, 10, 20, 35, 55, ?",
                options: ["75", "80", "85", "90"],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 16,
                type: "数列推理",
                question: "找出数列规律：2, 6, 12, 20, 30, ?",
                options: ["40", "42", "44", "48"],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 17,
                type: "数列推理",
                question: "找出数列规律：100, 81, 64, 49, 36, ?",
                options: ["20", "25", "27", "30"],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 18,
                type: "数列推理",
                question: "找出数列规律：7, 14, 21, 28, 35, ?",
                options: ["40", "42", "45", "49"],
                correctAnswer: 1,
                weight: 4
            },
            
            // 空间推理题 (4题)
            {
                id: 19,
                type: "空间推理",
                question: "一个正方体有6个面，每个面涂上不同的颜色。如果将这个正方体切割成8个小正方体，那么有多少个小正方体的三个面都有颜色？",
                options: ["4个", "6个", "8个", "12个"],
                correctAnswer: 2,
                weight: 4
            },
            {
                id: 20,
                type: "空间推理",
                question: "一个长方体的长、宽、高分别是6cm、4cm、3cm。如果将它的所有边长都增加1cm，体积增加多少立方厘米？",
                options: ["61", "68", "72", "74"],
                correctAnswer: 0,
                weight: 4
            },
            {
                id: 21,
                type: "空间推理",
                question: "从正面看是圆形，从侧面看是三角形的几何体是什么？",
                options: ["圆柱", "圆锥", "球体", "棱锥"],
                correctAnswer: 1,
                weight: 4
            },
            {
                id: 22,
                type: "空间推理",
                question: "一张长方形纸，长20cm，宽15cm。将其对角线对折后展开，折痕的长度是多少？",
                options: ["20cm", "25cm", "30cm", "35cm"],
                correctAnswer: 1,
                weight: 4
            },
            
            // 类比推理题 (3题)
            {
                id: 23,
                type: "类比推理",
                question: "教师:学生 = ?",
                options: [
                    "医生:病人",
                    "父母:子女",
                    "警察:罪犯",
                    "法官:律师"
                ],
                correctAnswer: 0,
                weight: 4
            },
            {
                id: 24,
                type: "类比推理",
                question: "书籍:知识 = ?",
                options: [
                    "音乐:情感",
                    "钥匙:门锁",
                    "食物:饥饿",
                    "电视:娱乐"
                ],
                correctAnswer: 0,
                weight: 4
            },
            {
                id: 25,
                type: "类比推理",
                question: "黑板:粉笔 = ?",
                options: [
                    "纸张:墨水",
                    "键盘:鼠标",
                    "画布:画笔",
                    "电脑:软件"
                ],
                correctAnswer: 2,
                weight: 4
            }
        ]
    },

    // 模块2: 情绪智力评估 (30题, 15分钟)
    emotional: {
        name: "情绪智力评估 (压力情商)",
        description: "评估您的情绪感知、理解和管理能力",
        timeLimit: 15,
        questions: [
            // 情绪感知 (8题)
            {
                id: 26,
                type: "情绪感知",
                question: "课堂上，一名学生突然低头不语，眼眶泛红。作为教师，您首先应该感知到学生可能处于什么情绪状态？",
                options: [
                    "愤怒",
                    "悲伤或委屈",
                    "兴奋",
                    "无聊"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 27,
                type: "情绪感知",
                question: "学生小李最近上课时经常走神，作业质量下降，见到老师也躲躲闪闪。这最可能表明学生：",
                options: [
                    "对学习失去兴趣",
                    "遇到了困扰或压力",
                    "故意对抗教师",
                    "身体出现问题"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 28,
                type: "情绪感知",
                question: "在小组讨论中，某学生一直保持沉默，双臂交叉，眼神游离。这种肢体语言最可能表示：",
                options: [
                    "对话题非常感兴趣",
                    "不愿意参与或感到不适",
                    "正在深入思考",
                    "准备发表重要意见"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 29,
                type: "情绪感知",
                question: "家长在家长会上情绪激动地批评学校的教学方法。作为教师，您应该首先识别出家长的核心情绪是：",
                options: [
                    "对孩子教育的焦虑和担心",
                    "对教师的不满和敌意",
                    "想要引起关注",
                    "个人性格暴躁"
                ],
                correctAnswer: 0,
                weight: 3.33
            },
            {
                id: 30,
                type: "情绪感知",
                question: "当您批评学生时，学生突然大声反驳，声音颤抖。这种反应背后最可能的情绪是：",
                options: [
                    "挑衅和不尊重",
                    "感到委屈和被误解",
                    "故意制造混乱",
                    "缺乏教养"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 31,
                type: "情绪感知",
                question: "一名平时活泼的学生最近变得安静寡言，经常独自待在角落。这种行为变化可能表明：",
                options: [
                    "学生正在成长变化",
                    "学生可能遇到了心理困扰",
                    "学生变得更加成熟",
                    "学生只是想休息"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 32,
                type: "情绪感知",
                question: "在班会上讨论敏感话题时，您注意到几个学生面露尴尬，身体后仰。作为教师应该：",
                options: [
                    "继续深入讨论",
                    "注意到学生的不适，适当调整话题",
                    "点名让这些学生发言",
                    "批评学生不够开放"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 33,
                type: "情绪感知",
                question: "同事在办公室里突然沉默，表情凝重。作为同事，最恰当的反应是：",
                options: [
                    "立即询问发生了什么",
                    "假装没有注意到",
                    "观察情况，适时表示关心",
                    "告诉其他同事"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            
            // 情绪理解 (7题)
            {
                id: 34,
                type: "情绪理解",
                question: "学生因为考试失败而沮丧。您认为学生最需要的是：",
                options: [
                    "立即指出学生的学习问题",
                    "先给予情感支持，再分析问题",
                    "告诉学生这次考试不重要",
                    "让学生自己调整情绪"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 35,
                type: "情绪理解",
                question: "学生因为与同学发生矛盾而生气。教师应该理解到，学生生气的真正原因可能是：",
                options: [
                    "单纯的脾气不好",
                    "感到不被理解或不被尊重",
                    "想要引起老师注意",
                    "缺乏自控能力"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 36,
                type: "情绪理解",
                question: "青春期学生出现情绪波动和叛逆行为，教师应该理解这主要是因为：",
                options: [
                    "学生品德有问题",
                    "家庭教育失败",
                    "成长阶段的正常心理变化",
                    "学校管理不当"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 37,
                type: "情绪理解",
                question: "学生在公开场合被批评后表现出愤怒，这种情绪反应的根源通常是：",
                options: [
                    "学生不尊重教师",
                    "自尊心受到伤害",
                    "学生性格有缺陷",
                    "家庭教育问题"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 38,
                type: "情绪理解",
                question: "家长过度关注孩子成绩的行为背后，教师应该理解其真正的情感需求是：",
                options: [
                    "想要炫耀孩子",
                    "对孩子未来的担忧和期望",
                    "不信任教师",
                    "追求虚荣"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 39,
                type: "情绪理解",
                question: "当学生因为努力仍未取得好成绩而感到挫败时，教师应该理解学生最需要的是：",
                options: [
                    "更严格的督促",
                    "认可努力过程，调整期望值",
                    "降低学习标准",
                    "转移学习重点"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 40,
                type: "情绪理解",
                question: "学生对某学科表现出持续的抗拒情绪，教师应该理解这可能源于：",
                options: [
                    "学生天生不适合这个学科",
                    "过往的负面学习经历",
                    "学生懒惰不愿学习",
                    "家长没有配合"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            
            // 情绪管理 (8题)
            {
                id: 41,
                type: "情绪管理",
                question: "在课堂上，一名学生突然大声喧哗打断了您的讲课，您感到非常愤怒。最恰当的反应是：",
                options: [
                    "立即严厉批评该学生",
                    "深呼吸控制情绪，平静地处理这个情况",
                    "忽视该学生，继续讲课",
                    "将该学生赶出教室"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 42,
                type: "情绪管理",
                question: "您精心准备的公开课因为设备故障无法正常进行，您感到非常沮丧和焦虑。您应该：",
                options: [
                    "取消这节课",
                    "快速调整情绪，采用备用教学方案",
                    "向领导抱怨设备问题",
                    "在课堂上表达自己的不满"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 43,
                type: "情绪管理",
                question: "家长在电话中指责您的教学方法，语气强硬。您感到委屈和愤怒，应该如何处理自己的情绪？",
                options: [
                    "立即反驳家长的观点",
                    "挂断电话不再理睬",
                    "保持冷静，倾听家长意见后约定时间详谈",
                    "向校长投诉该家长"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 44,
                type: "情绪管理",
                question: "在压力很大的期末阶段，您发现自己对学生的耐心明显下降，容易烦躁。您应该：",
                options: [
                    "继续坚持，等期末结束",
                    "向学生发泄自己的压力",
                    "主动进行自我调节，必要时寻求帮助",
                    "请假休息"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 45,
                type: "情绪管理",
                question: "您发现自己因为私人问题心情低落，影响了教学状态。最专业的做法是：",
                options: [
                    "向学生倾诉自己的问题",
                    "将情绪带入课堂，随意发挥",
                    "努力将工作与个人情绪分离，课后处理个人问题",
                    "取消当天的课程"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 46,
                type: "情绪管理",
                question: "两名学生在课堂上发生激烈冲突，场面失控。作为教师，您应该：",
                options: [
                    "大声呵斥制止",
                    "保持冷静，用坚定但平和的方式分开双方",
                    "让其他学生来劝架",
                    "不管不问，让他们自己解决"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 47,
                type: "情绪管理",
                question: "您发现学生作弊，感到失望和愤怒。最恰当的情绪处理方式是：",
                options: [
                    "当场发怒，严厉批评",
                    "控制情绪，私下与学生沟通了解原因",
                    "忽视这个问题",
                    "通知家长让家长处理"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 48,
                type: "情绪管理",
                question: "面对教学工作的长期压力，教师应该建立的最有效的情绪管理策略是：",
                options: [
                    "将压力转移给学生和家长",
                    "经常抱怨和发泄负面情绪",
                    "建立规律的自我调节机制和支持系统",
                    "逃避和忽视压力"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            
            // 社交技能 (7题)
            {
                id: 49,
                type: "社交技能",
                question: "与性格固执的家长沟通时，最有效的策略是：",
                options: [
                    "坚持自己的观点，不作妥协",
                    "先认同家长的关心，再逐步引导",
                    "避免与该家长沟通",
                    "请校长出面处理"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 50,
                type: "社交技能",
                question: "在教师团队会议中，您不同意某个同事的提议。最恰当的表达方式是：",
                options: [
                    "直接指出对方的错误",
                    "保持沉默，会后私下批评",
                    "尊重地提出不同观点，说明理由",
                    "附和多数人的意见"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 51,
                type: "社交技能",
                question: "学生向您抱怨另一位教师的教学方法，您应该：",
                options: [
                    "同意学生的观点",
                    "维护同事，引导学生理解不同的教学风格",
                    "告诉学生直接找那位老师",
                    "向校长报告此事"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 52,
                type: "社交技能",
                question: "新入职的同事向您请教教学经验，但您工作很忙。您应该：",
                options: [
                    "直接拒绝",
                    "敷衍了事",
                    "安排适当时间，真诚地提供帮助",
                    "建议对方自己摸索"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 53,
                type: "社交技能",
                question: "在家长群中，有家长发表了不当言论引起争议。作为班主任，您应该：",
                options: [
                    "删除该家长的发言",
                    "公开批评该家长",
                    "私下与该家长沟通，引导正向讨论",
                    "退出家长群"
                ],
                correctAnswer: 2,
                weight: 3.33
            },
            {
                id: 54,
                type: "社交技能",
                question: "您需要向校长提出改进学校管理的建议，最有效的沟通方式是：",
                options: [
                    "在教师大会上公开提出",
                    "准备充分的数据和方案，预约正式会谈",
                    "通过其他老师转达",
                    "匿名提交建议"
                ],
                correctAnswer: 1,
                weight: 3.33
            },
            {
                id: 55,
                type: "社交技能",
                question: "班级中两名学生发生矛盾，家长也卷入其中。作为班主任，您应该：",
                options: [
                    "让家长自己解决",
                    "偏向某一方",
                    "分别与双方沟通，公正客观地协调处理",
                    "推卸责任给学校"
                ],
                correctAnswer: 2,
                weight: 3.33
            }
        ]
    },

    // 模块3: 性格特质评估 (50题, 10分钟) - Big Five Model
    personality: {
        name: "性格特质评估",
        description: "基于Big Five模型评估您的性格特质与教师职业的匹配度",
        timeLimit: 10,
        type: "likert", // 李克特量表
        questions: [
            // 开放性 (Openness) - 10题
            { id: 56, trait: "openness", text: "我喜欢尝试新的教学方法和技术", reverse: false, weight: 2 },
            { id: 57, trait: "openness", text: "我对新的教育理念持开放态度", reverse: false, weight: 2 },
            { id: 58, trait: "openness", text: "我喜欢在课堂上引入创新的活动", reverse: false, weight: 2 },
            { id: 59, trait: "openness", text: "我倾向于使用传统的教学方式", reverse: true, weight: 2 },
            { id: 60, trait: "openness", text: "我对抽象概念和理论感兴趣", reverse: false, weight: 2 },
            { id: 61, trait: "openness", text: "我喜欢探索不同学科领域的知识", reverse: false, weight: 2 },
            { id: 62, trait: "openness", text: "我倾向于按照既定计划行事，不喜欢改变", reverse: true, weight: 2 },
            { id: 63, trait: "openness", text: "我欣赏艺术、音乐等文化活动", reverse: false, weight: 2 },
            { id: 64, trait: "openness", text: "我喜欢思考哲学性的问题", reverse: false, weight: 2 },
            { id: 65, trait: "openness", text: "我对学生的创造性想法持欢迎态度", reverse: false, weight: 2 },
            
            // 尽责性 (Conscientiousness) - 10题
            { id: 66, trait: "conscientiousness", text: "我总是提前准备好教学材料", reverse: false, weight: 2 },
            { id: 67, trait: "conscientiousness", text: "我对学生作业的批改非常细致认真", reverse: false, weight: 2 },
            { id: 68, trait: "conscientiousness", text: "我严格遵守教学计划和时间表", reverse: false, weight: 2 },
            { id: 69, trait: "conscientiousness", text: "我有时会拖延教学准备工作", reverse: true, weight: 2 },
            { id: 70, trait: "conscientiousness", text: "我对工作细节非常关注", reverse: false, weight: 2 },
            { id: 71, trait: "conscientiousness", text: "我认为规则和纪律很重要", reverse: false, weight: 2 },
            { id: 72, trait: "conscientiousness", text: "我经常制定明确的目标和计划", reverse: false, weight: 2 },
            { id: 73, trait: "conscientiousness", text: "我有时候做事情比较随意", reverse: true, weight: 2 },
            { id: 74, trait: "conscientiousness", text: "我会持续跟进学生的学习进度", reverse: false, weight: 2 },
            { id: 75, trait: "conscientiousness", text: "我对自己的工作要求很高", reverse: false, weight: 2 },
            
            // 外向性 (Extraversion) - 10题
            { id: 76, trait: "extraversion", text: "我享受在课堂上与学生互动", reverse: false, weight: 2 },
            { id: 77, trait: "extraversion", text: "我喜欢参加学校的社交活动", reverse: false, weight: 2 },
            { id: 78, trait: "extraversion", text: "我在团队中倾向于主动发言", reverse: false, weight: 2 },
            { id: 79, trait: "extraversion", text: "我更喜欢独自工作而非团队合作", reverse: true, weight: 2 },
            { id: 80, trait: "extraversion", text: "我能够轻松地与家长建立联系", reverse: false, weight: 2 },
            { id: 81, trait: "extraversion", text: "我在公开场合演讲时感到自在", reverse: false, weight: 2 },
            { id: 82, trait: "extraversion", text: "我倾向于在社交场合保持安静", reverse: true, weight: 2 },
            { id: 83, trait: "extraversion", text: "我喜欢组织班级活动", reverse: false, weight: 2 },
            { id: 84, trait: "extraversion", text: "我能够快速与新同事建立关系", reverse: false, weight: 2 },
            { id: 85, trait: "extraversion", text: "我喜欢成为团队中的活跃分子", reverse: false, weight: 2 },
            
            // 宜人性 (Agreeableness) - 10题
            { id: 86, trait: "agreeableness", text: "我很容易理解和同情学生的感受", reverse: false, weight: 2 },
            { id: 87, trait: "agreeableness", text: "我愿意帮助遇到困难的同事", reverse: false, weight: 2 },
            { id: 88, trait: "agreeableness", text: "我在冲突中倾向于寻求和解", reverse: false, weight: 2 },
            { id: 89, trait: "agreeableness", text: "我有时会对学生的错误感到不耐烦", reverse: true, weight: 2 },
            { id: 90, trait: "agreeableness", text: "我认为理解和宽容很重要", reverse: false, weight: 2 },
            { id: 91, trait: "agreeableness", text: "我善于倾听他人的意见", reverse: false, weight: 2 },
            { id: 92, trait: "agreeableness", text: "我倾向于信任他人", reverse: false, weight: 2 },
            { id: 93, trait: "agreeableness", text: "我有时会对他人持怀疑态度", reverse: true, weight: 2 },
            { id: 94, trait: "agreeableness", text: "我愿意为他人着想，即使自己有所牺牲", reverse: false, weight: 2 },
            { id: 95, trait: "agreeableness", text: "我认为合作比竞争更重要", reverse: false, weight: 2 },
            
            // 情绪稳定性 (Emotional Stability / 神经质反向) - 10题
            { id: 96, trait: "stability", text: "我能够在压力下保持冷静", reverse: false, weight: 2 },
            { id: 97, trait: "stability", text: "我不容易被小事情激怒", reverse: false, weight: 2 },
            { id: 98, trait: "stability", text: "我经常感到焦虑和担心", reverse: true, weight: 2 },
            { id: 99, trait: "stability", text: "我的情绪比较稳定，不会大起大落", reverse: false, weight: 2 },
            { id: 100, trait: "stability", text: "我能够快速从挫折中恢复", reverse: false, weight: 2 },
            { id: 101, trait: "stability", text: "我经常感到紧张不安", reverse: true, weight: 2 },
            { id: 102, trait: "stability", text: "我对自己的能力有信心", reverse: false, weight: 2 },
            { id: 103, trait: "stability", text: "我有时会因为小事而心情低落", reverse: true, weight: 2 },
            { id: 104, trait: "stability", text: "我能够有效地应对压力", reverse: false, weight: 2 },
            { id: 105, trait: "stability", text: "我对未来持乐观态度", reverse: false, weight: 2 }
        ]
    },

    // 模块4: 情境判断测试 (15题, 10分钟)
    situational: {
        name: "情境判断测试",
        description: "评估您在实际教学情境中的决策和应对能力",
        timeLimit: 10,
        questions: [
            {
                id: 106,
                type: "教学情境",
                question: "您正在上课，突然发现两名学生在教室后排发生争执，声音越来越大，开始影响其他学生学习。您的最佳应对方式是：",
                options: [
                    "立即停下讲课，严厉批评两名学生，维护课堂纪律",
                    "继续讲课，假装没有注意到争执，避免课堂中断",
                    "用平静但坚定的语气要求两名学生停止争执，课后单独处理",
                    "让全班同学做练习，然后走到后排私下调解争执"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 107,
                type: "教学情境",
                question: "在公开课上，您精心设计的互动环节遭到学生的冷遇，没有人响应。您应该：",
                options: [
                    "批评学生不配合",
                    "跳过这个环节，继续后续内容",
                    "灵活调整提问方式，降低难度，鼓励参与",
                    "点名要求学生必须回答"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 108,
                type: "教学情境",
                question: "一名学生在课堂上突然提出一个超出当前教学范围的复杂问题。您应该：",
                options: [
                    "告诉学生这个问题超纲，不予回答",
                    "立即深入讲解这个问题",
                    "肯定学生的思考，简要回应，并鼓励课后深入探讨",
                    "批评学生打断课堂进度"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 109,
                type: "教学情境",
                question: "您发现班上有几名学生经常抄袭作业。最有效的处理方式是：",
                options: [
                    "公开批评这些学生",
                    "私下与学生沟通，了解原因并提供帮助",
                    "直接给这些学生零分",
                    "通知家长让家长处理"
                ],
                correctAnswer: 1,
                weight: 6.67
            },
            {
                id: 110,
                type: "教学情境",
                question: "在批改作业时，您发现一名成绩优秀的学生这次作业质量明显下降。您应该：",
                options: [
                    "给予低分作为警告",
                    "在全班面前指出这个问题",
                    "私下询问学生是否遇到困难，提供支持",
                    "不予理会，等待下次作业"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 111,
                type: "家校沟通",
                question: "家长在微信群中公开质疑您的教学能力，其他家长开始议论。您应该：",
                options: [
                    "在群里公开反驳该家长",
                    "删除该家长的发言",
                    "私下联系该家长，约定时间面谈沟通",
                    "向校长投诉该家长"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 112,
                type: "家校沟通",
                question: "家长要求您对自己的孩子给予特殊照顾和更多关注。您应该：",
                options: [
                    "同意家长的要求",
                    "直接拒绝",
                    "解释公平对待所有学生的原则，但会关注每个学生的需求",
                    "向校长报告此事"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 113,
                type: "家校沟通",
                question: "学生在学校表现良好，但家长反映在家中完全不同。家长希望您能帮忙管教。您应该：",
                options: [
                    "告诉家长这是家庭问题，学校无法干预",
                    "与家长合作，了解情况，共同制定改进方案",
                    "批评学生两面三刀",
                    "建议家长寻求心理咨询"
                ],
                correctAnswer: 1,
                weight: 6.67
            },
            {
                id: 114,
                type: "同事协作",
                question: "您发现同事的教学方法存在明显问题，影响了学生学习。您应该：",
                options: [
                    "当面指出同事的错误",
                    "向校长报告",
                    "私下以建设性的方式与同事交流，分享经验",
                    "不管不问"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 115,
                type: "同事协作",
                question: "教研组会议上，您的教学创新提案遭到资深教师的反对。您应该：",
                options: [
                    "坚持己见，不作妥协",
                    "立即放弃自己的提案",
                    "倾听反对意见，寻求改进和折中方案",
                    "会后抱怨这些教师思想保守"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 116,
                type: "压力应对",
                question: "期末阶段，您需要同时处理教学、监考、改卷、写总结等多项任务，感到压力巨大。您应该：",
                options: [
                    "全部自己承担，不向他人求助",
                    "随意完成任务，降低标准",
                    "合理规划时间，优先处理重要任务，必要时寻求帮助",
                    "向领导抱怨任务太多"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 117,
                type: "压力应对",
                question: "您发现自己长期工作压力导致出现失眠、焦虑等症状。您应该：",
                options: [
                    "忽视这些症状，继续工作",
                    "自行服药处理",
                    "主动寻求专业帮助，调整工作节奏",
                    "辞职离开教师岗位"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 118,
                type: "职业发展",
                question: "您在教学中遇到瓶颈，感觉缺乏进步。最好的应对方式是：",
                options: [
                    "维持现状，安于现状",
                    "主动学习新方法，参加培训，寻求专业发展",
                    "怪罪学生不配合",
                    "考虑转行"
                ],
                correctAnswer: 1,
                weight: 6.67
            },
            {
                id: 119,
                type: "职业发展",
                question: "学校引入新的教学技术平台，您对技术不太熟悉。您应该：",
                options: [
                    "拒绝使用新技术",
                    "抱怨学校增加工作负担",
                    "积极学习，向熟悉技术的同事请教",
                    "只做最低限度的使用"
                ],
                correctAnswer: 2,
                weight: 6.67
            },
            {
                id: 120,
                type: "职业伦理",
                question: "您无意中听到学生的隐私信息。正确的做法是：",
                options: [
                    "与其他老师分享这个信息",
                    "保护学生隐私，不随意传播",
                    "告诉班上其他学生",
                    "在家长群中讨论"
                ],
                correctAnswer: 1,
                weight: 6.67
            }
        ]
    },

    // 模块5: 教育情境专项 (20题, 5分钟)
    education: {
        name: "教育情境专项",
        description: "针对教师职业特有场景的快速反应能力测试",
        timeLimit: 5,
        questions: [
            {
                id: 121,
                type: "课堂管理",
                question: "学生在课堂上玩手机，屡教不改。最有效的长期策略是：",
                options: [
                    "没收手机并拒绝归还",
                    "与学生和家长沟通，制定手机使用规则",
                    "忽视这个问题",
                    "将学生赶出教室"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 122,
                type: "课堂管理",
                question: "如何处理课堂上学生的突发提问打断教学进度？",
                options: [
                    "要求学生下课后再问",
                    "批评学生不守纪律",
                    "简短回应，记录问题，适时详细解答",
                    "无视学生的提问"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 123,
                type: "课堂管理",
                question: "班级纪律松散，学生上课注意力不集中。应该：",
                options: [
                    "增加惩罚措施",
                    "重新建立清晰的课堂规则，并通过有趣的教学吸引注意力",
                    "降低教学难度",
                    "要求学校更换班级"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 124,
                type: "学生发展",
                question: "发现学生有特殊天赋但成绩平平。应该：",
                options: [
                    "只关注提高成绩",
                    "忽视其天赋，按统一标准要求",
                    "提供适当的拓展机会，同时帮助提升基础学业",
                    "建议学生放弃其他学科"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 125,
                type: "学生发展",
                question: "学生表现出社交障碍，不愿与同学交往。教师应该：",
                options: [
                    "强制学生参与集体活动",
                    "不予理会，等待自然改变",
                    "耐心引导，创造适合的社交机会，必要时建议专业帮助",
                    "批评学生不合群"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 126,
                type: "学生发展",
                question: "学生因家庭变故情绪低落，影响学习。教师应该：",
                options: [
                    "要求学生不要将个人情绪带到学校",
                    "给予情感支持，适当调整学习要求，必要时联系心理老师",
                    "告诉全班同学该学生的情况",
                    "降低对该学生的所有要求"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 127,
                type: "学生发展",
                question: "发现学生可能遭受校园欺凌。正确的做法是：",
                options: [
                    "告诉学生要学会自己解决",
                    "立即介入调查，保护受害学生，教育施暴者",
                    "让学生家长自己处理",
                    "建议学生转学"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 128,
                type: "差异化教学",
                question: "班级学生水平差异大，如何安排教学？",
                options: [
                    "按照中等水平学生的进度教学",
                    "只关注优秀学生",
                    "采用分层教学，提供不同难度的任务和支持",
                    "降低所有学生的学习标准"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 129,
                type: "差异化教学",
                question: "有特殊学习需要的学生跟不上进度。应该：",
                options: [
                    "建议学生降级或转学",
                    "忽视该学生，专注其他学生",
                    "提供个性化支持，调整评估方式",
                    "要求家长请家教"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 130,
                type: "评估反馈",
                question: "如何对学生的创意作品进行评价？",
                options: [
                    "按照标准答案严格评分",
                    "全部给高分以鼓励创意",
                    "肯定创意，同时指出可改进之处，提供建设性反馈",
                    "不给任何评价"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 131,
                type: "评估反馈",
                question: "学生对考试成绩不满，认为评分不公。应该：",
                options: [
                    "坚持原判，拒绝解释",
                    "为了息事宁人改分数",
                    "详细解释评分标准，如有错误虚心改正",
                    "批评学生质疑老师"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 132,
                type: "专业发展",
                question: "如何看待教学中的失败经历？",
                options: [
                    "归咎于学生不配合",
                    "反思总结，将失败转化为成长机会",
                    "忽视失败，假装没发生",
                    "对教学失去信心"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 133,
                type: "专业发展",
                question: "面对教育改革和新要求，教师应该：",
                options: [
                    "抵制变革，坚持传统方法",
                    "被动接受，勉强执行",
                    "积极学习，主动适应并创新实践",
                    "等待退休"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 134,
                type: "家长教育",
                question: "家长过度干预教学，频繁提出不合理要求。应该：",
                options: [
                    "完全服从家长要求",
                    "与家长断绝联系",
                    "耐心沟通教育理念，建立合理边界",
                    "向校长投诉家长"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 135,
                type: "家长教育",
                question: "家长对孩子期望过高，给孩子巨大压力。教师应该：",
                options: [
                    "支持家长的高期望",
                    "告诉家长不要管孩子",
                    "帮助家长建立合理期望，关注孩子的全面发展",
                    "不参与家庭教育问题"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 136,
                type: "危机处理",
                question: "发现学生有自我伤害倾向。应该：",
                options: [
                    "保守秘密，不告诉任何人",
                    "立即通知家长、学校心理老师和相关部门",
                    "批评学生不珍惜生命",
                    "劝说学生想开点"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 137,
                type: "危机处理",
                question: "课堂上学生突发疾病。应该：",
                options: [
                    "继续上课，让学生自己处理",
                    "立即停止上课，联系校医和家长，采取必要急救措施",
                    "让其他学生照顾该学生",
                    "让学生回家休息"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 138,
                type: "团队协作",
                question: "与搭档老师教学理念不同，如何协调？",
                options: [
                    "坚持自己的方式，不理会搭档",
                    "完全听从搭档",
                    "沟通协商，寻找共同点和互补方式",
                    "向领导投诉搭档"
                ],
                correctAnswer: 2,
                weight: 5
            },
            {
                id: 139,
                type: "团队协作",
                question: "在团队项目中，同事没有完成分配的任务。应该：",
                options: [
                    "公开批评同事",
                    "私下沟通了解情况，必要时提供帮助或协调调整",
                    "向领导打小报告",
                    "放任不管，导致项目失败"
                ],
                correctAnswer: 1,
                weight: 5
            },
            {
                id: 140,
                type: "职业价值观",
                question: "您认为教师职业最重要的品质是：",
                options: [
                    "知识渊博",
                    "严格管理",
                    "关爱学生，促进学生全面发展",
                    "获得高分和荣誉"
                ],
                correctAnswer: 2,
                weight: 5
            }
        ]
    }
};

// 李克特量表选项
const likertOptions = [
    { value: 1, label: "非常不同意" },
    { value: 2, label: "不同意" },
    { value: 3, label: "中立" },
    { value: 4, label: "同意" },
    { value: 5, label: "非常同意" }
];
