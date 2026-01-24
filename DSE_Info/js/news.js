/**
 * 万鹤书院 HKDSE 资讯中心
 * 首页资讯展示功能
 */

// 页面配置
const PAGE_CONFIG = {
    articlesPerPage: 6,      // 每页显示文章数
    currentPage: 1,           // 当前页码
    currentCategory: 'all',   // 当前分类
    searchKeyword: '',        // 搜索关键词
    sliderAutoPlay: true,     // 轮播自动播放
    sliderInterval: 5000      // 轮播间隔（毫秒）
};

// 轮播图状态
let sliderState = {
    currentIndex: 0,
    slides: [],
    timer: null,
    isPlaying: true
};

// ========== 初始化页面 ==========
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initCategoryFilter();
    initFeaturedArticles();
    initArticlesList();
    initSidebar();
    initSearchFunctionality();
    initLoadMore();
});

// ========== 轮播图功能 ==========

/**
 * 初始化轮播图
 */
function initSlider() {
    const slides = getFeaturedArticles();
    sliderState.slides = slides;
    
    if (slides.length === 0) return;
    
    const sliderContainer = document.getElementById('heroSlider');
    const dotsContainer = document.getElementById('sliderDots');
    
    // 生成轮播项
    slides.forEach((article, index) => {
        const slide = createSlideElement(article, index);
        sliderContainer.appendChild(slide);
        
        // 生成指示点
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `跳转到第${index + 1}张`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // 绑定按钮事件
    document.getElementById('sliderPrev').addEventListener('click', prevSlide);
    document.getElementById('sliderNext').addEventListener('click', nextSlide);
    
    // 开始自动播放
    if (PAGE_CONFIG.sliderAutoPlay) {
        startAutoPlay();
    }
    
    // 鼠标悬停暂停
    sliderContainer.addEventListener('mouseenter', pauseAutoPlay);
    sliderContainer.addEventListener('mouseleave', resumeAutoPlay);
}

/**
 * 创建轮播项元素
 */
function createSlideElement(article, index) {
    const slide = document.createElement('div');
    slide.className = `slider-item ${index === 0 ? 'active' : ''}`;
    
    slide.innerHTML = `
        <div class="slide-background" style="background-image: url('${article.thumbnail}')"></div>
        <div class="slide-overlay"></div>
        <div class="slide-content">
            <div class="slide-category" style="background-color: ${getCategoryColor(article.category)}">
                ${getCategoryIcon(article.category)} ${article.category}
            </div>
            <h2 class="slide-title">${article.title}</h2>
            <p class="slide-summary">${article.summary}</p>
            <div class="slide-meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                <span><i class="fas fa-eye"></i> ${article.views.toLocaleString()} 次阅读</span>
                <span><i class="fas fa-user"></i> ${article.author}</span>
            </div>
            <a href="${article.content}" class="slide-btn">
                阅读全文 <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return slide;
}

/**
 * 下一张
 */
function nextSlide() {
    goToSlide((sliderState.currentIndex + 1) % sliderState.slides.length);
}

/**
 * 上一张
 */
function prevSlide() {
    goToSlide((sliderState.currentIndex - 1 + sliderState.slides.length) % sliderState.slides.length);
}

/**
 * 跳转到指定幻灯片
 */
function goToSlide(index) {
    const slides = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    slides[sliderState.currentIndex].classList.remove('active');
    dots[sliderState.currentIndex].classList.remove('active');
    
    sliderState.currentIndex = index;
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

/**
 * 开始自动播放
 */
function startAutoPlay() {
    sliderState.timer = setInterval(nextSlide, PAGE_CONFIG.sliderInterval);
    sliderState.isPlaying = true;
}

/**
 * 暂停自动播放
 */
function pauseAutoPlay() {
    if (sliderState.timer) {
        clearInterval(sliderState.timer);
        sliderState.isPlaying = false;
    }
}

/**
 * 恢复自动播放
 */
function resumeAutoPlay() {
    if (!sliderState.isPlaying && PAGE_CONFIG.sliderAutoPlay) {
        startAutoPlay();
    }
}

// ========== 分类筛选 ==========

/**
 * 初始化分类筛选器
 */
function initCategoryFilter() {
    const filterContainer = document.getElementById('categoryFilter');
    const stats = getCategoryStats();
    
    categories.forEach(cat => {
        const count = stats[cat.id] || 0;
        const btn = document.createElement('button');
        btn.className = `category-btn ${cat.id === 'all' ? 'active' : ''}`;
        btn.setAttribute('data-category', cat.id);
        btn.innerHTML = `
            <span class="category-icon">${cat.icon || '📁'}</span>
            <span class="category-name">${cat.name}</span>
            <span class="category-count">${count}</span>
        `;
        
        btn.addEventListener('click', () => filterByCategory(cat.id));
        filterContainer.appendChild(btn);
    });
}

/**
 * 按分类筛选
 */
function filterByCategory(categoryId) {
    PAGE_CONFIG.currentCategory = categoryId;
    PAGE_CONFIG.currentPage = 1;
    
    // 更新按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === categoryId);
    });
    
    // 重新加载文章列表
    loadArticlesList();
}

// ========== 精选资讯 ==========

/**
 * 初始化精选资讯
 */
function initFeaturedArticles() {
    const featured = getPublishedArticles()
        .filter(a => a.featured)
        .slice(0, 6);
    
    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = '';
    
    featured.forEach(article => {
        const card = createFeaturedCard(article);
        grid.appendChild(card);
    });
}

/**
 * 创建精选卡片
 */
function createFeaturedCard(article) {
    const card = document.createElement('div');
    card.className = 'featured-card';
    
    card.innerHTML = `
        <div class="featured-image" style="background-image: url('${article.thumbnail}')">
            <div class="featured-category" style="background-color: ${getCategoryColor(article.category)}">
                ${getCategoryIcon(article.category)} ${article.category}
            </div>
        </div>
        <div class="featured-body">
            <h3 class="featured-title">
                <a href="${article.content}">${article.title}</a>
            </h3>
            <p class="featured-summary">${article.summary}</p>
            <div class="featured-meta">
                <span><i class="fas fa-calendar"></i> ${getRelativeTime(article.date)}</span>
                <span><i class="fas fa-eye"></i> ${article.views.toLocaleString()}</span>
            </div>
            <div class="featured-tags">
                ${article.tags.slice(0, 3).map(tag => 
                    `<span class="tag" onclick="searchByTag('${tag}')">#${tag}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// ========== 资讯列表 ==========

/**
 * 初始化资讯列表
 */
function initArticlesList() {
    loadArticlesList();
}

/**
 * 加载资讯列表
 */
function loadArticlesList(append = false) {
    let articles = PAGE_CONFIG.searchKeyword 
        ? searchArticles(PAGE_CONFIG.searchKeyword)
        : getArticlesByCategory(PAGE_CONFIG.currentCategory);
    
    // 排除精选文章
    const featuredIds = getFeaturedArticles().map(a => a.id);
    articles = articles.filter(a => !featuredIds.includes(a.id));
    
    // 分页
    const start = (PAGE_CONFIG.currentPage - 1) * PAGE_CONFIG.articlesPerPage;
    const end = start + PAGE_CONFIG.articlesPerPage;
    const pageArticles = articles.slice(start, end);
    
    const listContainer = document.getElementById('articlesList');
    
    if (!append) {
        listContainer.innerHTML = '';
    }
    
    if (pageArticles.length === 0) {
        listContainer.innerHTML = '<div class="no-results"><i class="fas fa-inbox"></i><p>暂无相关资讯</p></div>';
        document.getElementById('loadMoreBtn').style.display = 'none';
        return;
    }
    
    pageArticles.forEach(article => {
        const item = createArticleItem(article);
        listContainer.appendChild(item);
    });
    
    // 显示/隐藏加载更多按钮
    const hasMore = end < articles.length;
    document.getElementById('loadMoreBtn').style.display = hasMore ? 'block' : 'none';
}

/**
 * 创建资讯列表项
 */
function createArticleItem(article) {
    const item = document.createElement('div');
    item.className = 'article-item';
    
    item.innerHTML = `
        <div class="article-thumbnail" style="background-image: url('${article.thumbnail}')">
            <div class="article-category" style="background-color: ${getCategoryColor(article.category)}">
                ${getCategoryIcon(article.category)} ${article.category}
            </div>
        </div>
        <div class="article-content">
            <h3 class="article-title">
                <a href="${article.content}">${article.title}</a>
            </h3>
            <p class="article-summary">${article.summary}</p>
            <div class="article-meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                <span><i class="fas fa-user"></i> ${article.author}</span>
                <span><i class="fas fa-eye"></i> ${article.views.toLocaleString()}</span>
            </div>
            <div class="article-tags">
                ${article.tags.slice(0, 4).map(tag => 
                    `<span class="tag" onclick="searchByTag('${tag}')">#${tag}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return item;
}

/**
 * 加载更多
 */
function initLoadMore() {
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        PAGE_CONFIG.currentPage++;
        loadArticlesList(true);
    });
}

// ========== 侧边栏 ==========

/**
 * 初始化侧边栏
 */
function initSidebar() {
    loadPopularArticles();
    loadCategoryList();
    loadTagsCloud();
}

/**
 * 加载热门资讯
 */
function loadPopularArticles() {
    const popular = getPopularArticles(5);
    const container = document.getElementById('popularList');
    
    container.innerHTML = popular.map((article, index) => `
        <div class="popular-item">
            <div class="popular-rank">${index + 1}</div>
            <div class="popular-content">
                <h4><a href="${article.content}">${article.title}</a></h4>
                <div class="popular-meta">
                    <span><i class="fas fa-eye"></i> ${article.views.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 加载分类列表
 */
function loadCategoryList() {
    const stats = getCategoryStats();
    const container = document.getElementById('categoryList');
    
    container.innerHTML = categories
        .filter(cat => cat.id !== 'all')
        .map(cat => `
            <div class="category-item" onclick="filterByCategory('${cat.id}')">
                <span class="cat-icon" style="color: ${cat.color}">${cat.icon}</span>
                <span class="cat-name">${cat.name}</span>
                <span class="cat-count">${stats[cat.id] || 0}</span>
            </div>
        `).join('');
}

/**
 * 加载标签云
 */
function loadTagsCloud() {
    const tags = getAllTags();
    const container = document.getElementById('tagsCloud');
    
    container.innerHTML = tags.slice(0, 20).map(tag => 
        `<span class="tag-item" onclick="searchByTag('${tag}')">${tag}</span>`
    ).join('');
}

// ========== 搜索功能 ==========

/**
 * 初始化搜索功能
 */
function initSearchFunctionality() {
    // 顶部搜索
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 500));
    
    // 侧边栏搜索
    const sidebarSearch = document.getElementById('sidebarSearch');
    const sidebarSearchBtn = document.getElementById('sidebarSearchBtn');
    
    sidebarSearchBtn.addEventListener('click', () => {
        handleSearch({ target: sidebarSearch });
    });
    
    sidebarSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch({ target: sidebarSearch });
        }
    });
}

/**
 * 处理搜索
 */
function handleSearch(e) {
    const keyword = e.target.value.trim();
    PAGE_CONFIG.searchKeyword = keyword;
    PAGE_CONFIG.currentPage = 1;
    
    // 清空分类筛选
    if (keyword) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    loadArticlesList();
}

/**
 * 按标签搜索
 */
function searchByTag(tag) {
    document.getElementById('searchInput').value = tag;
    PAGE_CONFIG.searchKeyword = tag;
    PAGE_CONFIG.currentPage = 1;
    loadArticlesList();
    
    // 滚动到列表顶部
    document.querySelector('.latest-section').scrollIntoView({ behavior: 'smooth' });
}

// ========== 工具函数 ==========

/**
 * 获取分类颜色
 */
function getCategoryColor(categoryName) {
    const cat = categories.find(c => c.name === categoryName);
    return cat ? cat.color : '#5B3A9E';
}

/**
 * 获取分类图标
 */
function getCategoryIcon(categoryName) {
    const cat = categories.find(c => c.name === categoryName);
    return cat ? cat.icon : '📁';
}

/**
 * 防抖函数
 */
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

// 导出函数供全局使用
window.searchByTag = searchByTag;
window.filterByCategory = filterByCategory;
