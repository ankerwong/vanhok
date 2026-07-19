// 香港中学查询系统 - JavaScript
// 萬鶴書院 Wanhe Academy

// 全局变量
let allSchools = [];
let filteredSchools = [];
let currentView = 'grid';

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', async () => {
    await loadSchoolsData();
    initializeFilters();
    setupEventListeners();
    displaySchools(allSchools);
    updateStats();
});

// 加载学校数据
async function loadSchoolsData() {
    try {
        const response = await fetch('schools_data.json');
        const data = await response.json();
        allSchools = data;
        filteredSchools = [...allSchools];
        
        // 更新页脚总数
        document.getElementById('footer-total').textContent = allSchools.length;
        
        console.log(`成功加载 ${allSchools.length} 所学校数据`);
    } catch (error) {
        console.error('加载数据失败:', error);
        showError('無法加載學校數據，請刷新頁面重試');
    }
}

// 初始化筛选器选项
function initializeFilters() {
    // 获取所有唯一值
    const types = getUniqueValues('种类');
    const districts = getUniqueValues('所属地区');
    const groups = getUniqueValues('组别');
    const languages = getUniqueValues('授课语言');
    const genders = getUniqueValues('学生性别');
    const religions = getUniqueValues('宗教');
    
    // 填充选择框
    populateSelect('filter-type', types);
    populateSelect('filter-district', districts);
    populateSelect('filter-group', groups);
    populateSelect('filter-language', languages);
    populateSelect('filter-gender', genders);
    populateSelect('filter-religion', religions);
}

// 获取唯一值
function getUniqueValues(field) {
    const values = allSchools.map(school => school[field]).filter(v => v);
    return [...new Set(values)].sort();
}

// 填充选择框
function populateSelect(elementId, options) {
    const select = document.getElementById(elementId);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选器变化监听
    const filters = [
        'filter-type',
        'filter-district',
        'filter-group',
        'filter-language',
        'filter-gender',
        'filter-religion',
        'filter-search'
    ];
    
    filters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', applyFilters);
            if (filterId === 'filter-search') {
                element.addEventListener('input', applyFilters);
            }
        }
    });
    
    // 重置按钮
    document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
    
    // 视图切换按钮
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
            switchView(view);
        });
    });
}

// 应用筛选
function applyFilters() {
    const filters = {
        type: document.getElementById('filter-type').value,
        district: document.getElementById('filter-district').value,
        group: document.getElementById('filter-group').value,
        language: document.getElementById('filter-language').value,
        gender: document.getElementById('filter-gender').value,
        religion: document.getElementById('filter-religion').value,
        search: document.getElementById('filter-search').value.toLowerCase().trim()
    };
    
    filteredSchools = allSchools.filter(school => {
        // 种类筛选
        if (filters.type && school['种类'] !== filters.type) return false;
        
        // 地区筛选
        if (filters.district && school['所属地区'] !== filters.district) return false;
        
        // 组别筛选
        if (filters.group && school['组别'] !== filters.group) return false;
        
        // 授课语言筛选
        if (filters.language && school['授课语言'] !== filters.language) return false;
        
        // 性别筛选
        if (filters.gender && school['学生性别'] !== filters.gender) return false;
        
        // 宗教筛选
        if (filters.religion && school['宗教'] !== filters.religion) return false;
        
        // 搜索筛选
        if (filters.search && !school['学校名称'].toLowerCase().includes(filters.search)) {
            return false;
        }
        
        return true;
    });
    
    displaySchools(filteredSchools);
    updateStats();
}

// 重置筛选
function resetFilters() {
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-district').value = '';
    document.getElementById('filter-group').value = '';
    document.getElementById('filter-language').value = '';
    document.getElementById('filter-gender').value = '';
    document.getElementById('filter-religion').value = '';
    document.getElementById('filter-search').value = '';
    
    filteredSchools = [...allSchools];
    displaySchools(filteredSchools);
    updateStats();
}

// 显示学校列表
function displaySchools(schools) {
    const container = document.getElementById('schools-container');
    const noResults = document.getElementById('no-results');
    
    if (!schools || schools.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    container.innerHTML = schools.map(school => createSchoolCard(school)).join('');
}

// 创建学校卡片
function createSchoolCard(school) {
    const hasWebsite = school['学校网址'] && school['学校网址'] !== 'nan';
    const hasPhone = school['联系电话'] && school['联系电话'] !== 'nan';
    
    return `
        <div class="school-card">
            <div class="school-header">
                <div>
                    <h3 class="school-name">${escapeHtml(school['学校名称'] || '未知')}</h3>
                    <span class="school-code">${escapeHtml(school['学校代码'] || 'N/A')}</span>
                </div>
            </div>
            
            <div class="school-info">
                <div class="info-item">
                    <span class="info-label">種類</span>
                    <span class="info-value">${escapeHtml(school['种类'] || '-')}</span>
                </div>
                
                <div class="info-item">
                    <span class="info-label">地區</span>
                    <span class="info-value">${escapeHtml(school['所属地区'] || '-')}</span>
                </div>
                
                <div class="info-item">
                    <span class="info-label">組別</span>
                    <span class="info-value">${escapeHtml(school['组别'] || '-')}</span>
                </div>
                
                <div class="info-item">
                    <span class="info-label">授課語言</span>
                    <span class="info-value">${escapeHtml(school['授课语言'] || '-')}</span>
                </div>
                
                <div class="info-item">
                    <span class="info-label">學生性別</span>
                    <span class="info-value">${escapeHtml(school['学生性别'] || '-')}</span>
                </div>
                
                <div class="info-item">
                    <span class="info-label">宗教</span>
                    <span class="info-value">${escapeHtml(school['宗教'] || '-')}</span>
                </div>
            </div>
            
            <div class="school-contact">
                ${hasWebsite ? `
                    <a href="${escapeHtml(school['学校网址'])}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="contact-link"
                       onclick="event.stopPropagation()">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        訪問網站
                    </a>
                ` : ''}
                
                ${hasPhone ? `
                    <a href="tel:${escapeHtml(school['联系电话'])}" 
                       class="contact-link"
                       onclick="event.stopPropagation()">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        ${formatPhone(school['联系电话'])}
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// 切换视图
function switchView(view) {
    currentView = view;
    const container = document.getElementById('schools-container');
    
    // 更新按钮状态
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // 切换容器类名
    if (view === 'list') {
        container.classList.remove('schools-grid');
        container.classList.add('schools-list');
    } else {
        container.classList.remove('schools-list');
        container.classList.add('schools-grid');
    }
}

// 更新统计信息
function updateStats() {
    const totalElement = document.getElementById('total-schools');
    if (totalElement) {
        totalElement.textContent = filteredSchools.length;
    }
}

// 格式化电话号码
function formatPhone(phone) {
    if (!phone || phone === 'nan') return '';
    const phoneStr = String(phone).replace(/\s/g, '');
    if (phoneStr.length === 8) {
        return `${phoneStr.slice(0, 4)} ${phoneStr.slice(4)}`;
    }
    return phoneStr;
}

// HTML 转义，防止 XSS
function escapeHtml(text) {
    if (!text || text === 'nan') return '-';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

// 显示错误信息
function showError(message) {
    const container = document.getElementById('schools-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #e74c3c;">
                <svg viewBox="0 0 24 24" width="48" height="48" style="margin-bottom: 1rem;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                </svg>
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">${escapeHtml(message)}</p>
            </div>
        `;
    }
}

// 导出函数供其他模块使用
window.SchoolQuery = {
    loadSchoolsData,
    applyFilters,
    resetFilters,
    switchView
};
