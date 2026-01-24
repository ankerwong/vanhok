/**
 * 万鹤书院 HKDSE 资讯管理系统
 * 资讯数据中心 - 所有文章内容在这里统一管理
 */

// 资讯数据库
const articlesData = [
    // ========== 已有内容（初始5篇） ==========
    {
        id: 1,
        title: "2026年HKDSE考试时间表正式公布",
        category: "考试资讯",
        date: "2026-01-24",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
        summary: "考评局公布2026年DSE考试完整时间表，笔试将于4月8日开考，5月6日结束，7月15日放榜。涵盖核心科目及20+选修科目的详细考试安排。",
        content: "timetable.html",
        featured: true,
        views: 2580,
        tags: ["考试时间", "DSE2026", "重要日期", "时间表"],
        author: "万鹤教务处"
    },
    {
        id: 2,
        title: "2025年HKDSE统计数据深度分析",
        category: "统计数据",
        date: "2026-01-20",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        summary: "2025年DSE报考人数达55,500人，较去年增长10%。日校考生42,795人，出席率高达97%。详细解读各科成绩分布、达标率及历年趋势对比。",
        content: "statistics.html",
        featured: true,
        views: 3120,
        tags: ["统计数据", "成绩分析", "DSE2025", "报考人数"],
        author: "万鹤研究院"
    },
    {
        id: 3,
        title: "香港八大院校升学录取全攻略",
        category: "升学指南",
        date: "2026-01-18",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
        summary: "港大、中大、科大等八大院校入学要求详解。332A33与332A22的区别、JUPAS计分方法对比、各专业参考分数线，还有实用的分数计算器工具！",
        content: "admission.html",
        featured: true,
        views: 4560,
        tags: ["升学指南", "香港八大", "JUPAS", "录取分数", "大学入学"],
        author: "万鹤升学顾问"
    },
    {
        id: 4,
        title: "HKDSE选科完全指南：4核心+20选修科目解析",
        category: "选科建议",
        date: "2026-01-15",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop",
        summary: "中三选科最全攻略！核心科目详解、16大选修科目介绍、理科/商科/文科组合建议、不同升学目标的选科策略，帮你做出最适合的选择。",
        content: "subjects.html",
        featured: false,
        views: 3890,
        tags: ["选科指南", "中三选科", "选修科目", "升学规划"],
        author: "万鹤学术团队"
    },
    {
        id: 5,
        title: "HKDSE考试制度全面解析",
        category: "考试资讯",
        date: "2026-01-12",
        thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=450&fit=crop",
        summary: "深度解读香港中学文凭考试制度：评分标准（5**至U级）、水平参照模式、校本评核、公民与社会发展科要求，让你全面了解DSE考试体系。",
        content: "index.html#about-dse",
        featured: false,
        views: 2340,
        tags: ["考试制度", "评分标准", "DSE介绍"],
        author: "万鹤教务处"
    },

    // ========== 预留内容模板（待填充） ==========
    
    // 备考攻略类
    {
        id: 101,
        title: "中文科备考策略：阅读卷与写作卷全攻略",
        category: "备考攻略",
        date: "2026-02-01",
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop",
        summary: "中文科是DSE核心科目，本文详解阅读理解答题技巧、写作高分秘诀、文言文应对策略、卷一卷二卷三备考要点...",
        content: "articles/chinese-study-tips.html",
        featured: false,
        views: 0,
        tags: ["中文科", "备考攻略", "阅读理解", "写作技巧"],
        author: "中文科主任",
        status: "draft" // 草稿状态，前端不显示
    },
    {
        id: 102,
        title: "英文科提分秘籍：从Level 3到Level 5**",
        category: "备考攻略",
        date: "2026-02-05",
        thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop",
        summary: "英文科提升策略：Paper 1阅读技巧、Paper 2写作框架、Paper 3听说综合训练、Paper 4口试流畅表达方法，附实战练习建议...",
        content: "articles/english-study-tips.html",
        featured: false,
        views: 0,
        tags: ["英文科", "提分技巧", "口试", "写作"],
        author: "英文科主任",
        status: "draft"
    },
    {
        id: 103,
        title: "数学必修部分高分攻略：MC与LQ解题技巧",
        category: "备考攻略",
        date: "2026-02-10",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop",
        summary: "数学科备考全攻略：多项选择题快速解题、长题目（Long Questions）完整步骤、常考题型总结、计算机使用技巧、时间分配策略...",
        content: "articles/math-study-tips.html",
        featured: false,
        views: 0,
        tags: ["数学科", "解题技巧", "高分秘籍"],
        author: "数学科主任",
        status: "draft"
    },
    {
        id: 104,
        title: "物理科实战攻略：实验题与计算题制胜法宝",
        category: "备考攻略",
        date: "2026-02-15",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop",
        summary: "物理科备考指南：力学、电学、光学、热学各单元要点、实验设计与分析、计算题步骤规范、常见易错点总结...",
        content: "articles/physics-study-tips.html",
        featured: false,
        views: 0,
        tags: ["物理科", "实验题", "计算题"],
        author: "物理科老师",
        status: "draft"
    },
    {
        id: 105,
        title: "化学科精通攻略：理论与实验并重",
        category: "备考攻略",
        date: "2026-02-20",
        thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop",
        summary: "化学科全面备考：无机化学、有机化学、物理化学知识点梳理、实验操作规范、化学方程式记忆技巧、滴定计算专项训练...",
        content: "articles/chemistry-study-tips.html",
        featured: false,
        views: 0,
        tags: ["化学科", "实验", "方程式"],
        author: "化学科老师",
        status: "draft"
    },

    // 最新政策类
    {
        id: 201,
        title: "2027年DSE改革政策权威解读",
        category: "最新政策",
        date: "2026-02-25",
        thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
        summary: "教育局及考评局最新公布：2027年DSE考试调整方案、核心科目优化措施、校本评核新要求、评分标准变化详解...",
        content: "articles/dse-2027-reform.html",
        featured: false,
        views: 0,
        tags: ["政策解读", "DSE改革", "2027考试"],
        author: "万鹤政策研究组",
        status: "draft"
    },
    {
        id: 202,
        title: "公民与社会发展科完全指南",
        category: "最新政策",
        date: "2026-03-01",
        thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=450&fit=crop",
        summary: "公社科（CSD）取代通识科后的最新要求：课程内容、考试模式、达标标准、内地考察安排、校本评核要求详解...",
        content: "articles/citizenship-guide.html",
        featured: false,
        views: 0,
        tags: ["公社科", "公民与社会发展", "新科目"],
        author: "公社科主任",
        status: "draft"
    },
    {
        id: 203,
        title: "2026年校本评核（SBA）全攻略",
        category: "最新政策",
        date: "2026-03-05",
        thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=450&fit=crop",
        summary: "校本评核（School-based Assessment）详解：哪些科目有SBA、评核标准、时间安排、准备技巧、常见问题解答...",
        content: "articles/sba-guide.html",
        featured: false,
        views: 0,
        tags: ["校本评核", "SBA", "评核标准"],
        author: "教务处",
        status: "draft"
    },

    // 升学资讯类
    {
        id: 301,
        title: "DSE成绩申请内地大学完整攻略",
        category: "升学指南",
        date: "2026-03-10",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
        summary: "用DSE成绩申请内地名校：清华北大复旦等127所高校招生政策、免试招生计划、申请流程、分数要求、专业选择建议...",
        content: "articles/mainland-universities.html",
        featured: false,
        views: 0,
        tags: ["内地升学", "免试招生", "内地大学"],
        author: "升学顾问",
        status: "draft"
    },
    {
        id: 302,
        title: "海外升学全攻略：英美澳加TOP大学认可DSE",
        category: "升学指南",
        date: "2026-03-15",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
        summary: "DSE成绩申请海外大学：英国（剑桥、牛津）、美国（常春藤）、澳洲（八大）、加拿大名校认可情况、申请时间线、文书准备...",
        content: "articles/overseas-universities.html",
        featured: false,
        views: 0,
        tags: ["海外升学", "英美澳加", "国际认可"],
        author: "海外升学顾问",
        status: "draft"
    },
    {
        id: 303,
        title: "JUPAS改选策略：放榜后如何调整志愿",
        category: "升学指南",
        date: "2026-03-20",
        thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=450&fit=crop",
        summary: "放榜后JUPAS改选关键期：如何根据成绩调整志愿排序、Band A选校策略、保底志愿安排、改选时间节点、注意事项...",
        content: "articles/jupas-adjustment.html",
        featured: false,
        views: 0,
        tags: ["JUPAS", "改选", "志愿填报"],
        author: "升学顾问",
        status: "draft"
    },
    {
        id: 304,
        title: "香港八大各院校面试技巧全解析",
        category: "升学指南",
        date: "2026-03-25",
        thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=450&fit=crop",
        summary: "港大、中大、科大等面试技巧：常见问题类型、英文面试准备、小组讨论技巧、个人陈述要点、着装礼仪、真题分享...",
        content: "articles/university-interview.html",
        featured: false,
        views: 0,
        tags: ["面试技巧", "大学面试", "八大院校"],
        author: "升学顾问",
        status: "draft"
    },

    // 经验分享类
    {
        id: 401,
        title: "DSE 7科5**状元备考经验分享",
        category: "经验分享",
        date: "2026-04-01",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
        summary: "状元访谈：7科5**的备考秘诀、时间管理方法、各科学习技巧、心态调整经验、给师弟师妹的建议...",
        content: "articles/top-scorer-interview.html",
        featured: false,
        views: 0,
        tags: ["状元经验", "5**", "学习方法"],
        author: "校友分享",
        status: "draft"
    },
    {
        id: 402,
        title: "逆袭之路：从中游到入读港大的奋斗故事",
        category: "经验分享",
        date: "2026-04-05",
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop",
        summary: "真实案例：中五成绩平平如何在DSE逆袭、突破瓶颈的关键、导师辅导经验、家长支持的重要性、坚持的力量...",
        content: "articles/comeback-story.html",
        featured: false,
        views: 0,
        tags: ["励志故事", "逆袭", "成功案例"],
        author: "校友分享",
        status: "draft"
    },
    {
        id: 403,
        title: "高效时间管理：DSE备考日程规划指南",
        category: "经验分享",
        date: "2026-04-10",
        thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop",
        summary: "科学备考时间表：高中三年时间线、每日作息安排、学习与休息平衡、考前冲刺计划、避免拖延症技巧...",
        content: "articles/time-management.html",
        featured: false,
        views: 0,
        tags: ["时间管理", "备考计划", "学习方法"],
        author: "学习顾问",
        status: "draft"
    },

    // 更多分类待扩展...
];

// 资讯分类配置
const categories = [
    { id: 'all', name: '全部资讯', color: '#5B3A9E' },
    { id: '考试资讯', name: '考试资讯', color: '#7B5ABE', icon: '📋' },
    { id: '升学指南', name: '升学指南', color: '#4A90E2', icon: '🎓' },
    { id: '统计数据', name: '统计数据', color: '#E94B3C', icon: '📊' },
    { id: '选科建议', name: '选科建议', color: '#F39C12', icon: '📚' },
    { id: '备考攻略', name: '备考攻略', color: '#27AE60', icon: '💡' },
    { id: '最新政策', name: '最新政策', color: '#E67E22', icon: '📢' },
    { id: '经验分享', name: '经验分享', color: '#9B59B6', icon: '✨' }
];

// ========== 工具函数 ==========

/**
 * 获取所有已发布的资讯（排除草稿）
 */
function getPublishedArticles() {
    return articlesData.filter(article => article.status !== 'draft');
}

/**
 * 获取精选资讯（用于轮播图）
 */
function getFeaturedArticles() {
    return getPublishedArticles()
        .filter(article => article.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
}

/**
 * 按分类筛选资讯
 */
function getArticlesByCategory(categoryId) {
    const published = getPublishedArticles();
    if (categoryId === 'all') {
        return published;
    }
    return published.filter(article => article.category === categoryId);
}

/**
 * 按标签筛选资讯
 */
function getArticlesByTag(tag) {
    return getPublishedArticles().filter(article => 
        article.tags.includes(tag)
    );
}

/**
 * 搜索资讯（标题、摘要、标签）
 */
function searchArticles(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return getPublishedArticles().filter(article => 
        article.title.toLowerCase().includes(lowerKeyword) ||
        article.summary.toLowerCase().includes(lowerKeyword) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
    );
}

/**
 * 获取热门资讯（按浏览量排序）
 */
function getPopularArticles(limit = 5) {
    return getPublishedArticles()
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
}

/**
 * 获取最新资讯
 */
function getLatestArticles(limit = 10) {
    return getPublishedArticles()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

/**
 * 根据ID获取单篇资讯
 */
function getArticleById(id) {
    return articlesData.find(article => article.id === parseInt(id));
}

/**
 * 格式化日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 相对时间显示（如：3天前）
 */
function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
    return `${Math.floor(diffDays / 365)}年前`;
}

/**
 * 增加浏览量
 */
function incrementViews(articleId) {
    const article = getArticleById(articleId);
    if (article) {
        article.views++;
        // 在真实项目中，这里应该向后端发送请求更新数据库
        localStorage.setItem(`article_${articleId}_viewed`, 'true');
    }
}

/**
 * 获取分类统计（每个分类的文章数量）
 */
function getCategoryStats() {
    const published = getPublishedArticles();
    const stats = {};
    
    categories.forEach(cat => {
        if (cat.id === 'all') {
            stats[cat.id] = published.length;
        } else {
            stats[cat.id] = published.filter(a => a.category === cat.id).length;
        }
    });
    
    return stats;
}

/**
 * 获取所有标签（去重）
 */
function getAllTags() {
    const tags = new Set();
    getPublishedArticles().forEach(article => {
        article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

// 导出到全局作用域（供其他JS文件使用）
if (typeof window !== 'undefined') {
    window.articlesData = articlesData;
    window.categories = categories;
    window.getPublishedArticles = getPublishedArticles;
    window.getFeaturedArticles = getFeaturedArticles;
    window.getArticlesByCategory = getArticlesByCategory;
    window.getArticlesByTag = getArticlesByTag;
    window.searchArticles = searchArticles;
    window.getPopularArticles = getPopularArticles;
    window.getLatestArticles = getLatestArticles;
    window.getArticleById = getArticleById;
    window.formatDate = formatDate;
    window.getRelativeTime = getRelativeTime;
    window.incrementViews = incrementViews;
    window.getCategoryStats = getCategoryStats;
    window.getAllTags = getAllTags;
}
