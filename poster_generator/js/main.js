// 万鹤书院教师海报生成器 - 主要功能脚本

// 全局状态管理
const state = {
    teacherPhoto: null,
    teacherName: '',
    teacherTitle: '',
    teacherIntro: '',
    layout: 'horizontal', // horizontal or vertical
    style: 'modern', // modern or classic
    logoImage: null
};

// DOM 元素引用
const elements = {
    // Inputs
    teacherName: document.getElementById('teacherName'),
    teacherTitle: document.getElementById('teacherTitle'),
    teacherPhoto: document.getElementById('teacherPhoto'),
    teacherIntro: document.getElementById('teacherIntro'),
    
    // Upload
    uploadArea: document.getElementById('uploadArea'),
    uploadPlaceholder: document.getElementById('uploadPlaceholder'),
    uploadPreview: document.getElementById('uploadPreview'),
    previewImage: document.getElementById('previewImage'),
    removePhoto: document.getElementById('removePhoto'),
    
    // Layout & Style
    layoutBtns: document.querySelectorAll('.layout-btn'),
    styleBtns: document.querySelectorAll('.style-btn'),
    
    // Preview
    canvas: document.getElementById('posterCanvas'),
    previewPlaceholder: document.getElementById('previewPlaceholder'),
    
    // Actions
    clearBtn: document.getElementById('clearBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    
    // Character count
    charCount: document.getElementById('charCount')
};

// Canvas context
const ctx = elements.canvas.getContext('2d');

// 初始化
function init() {
    loadLogoImage();
    setupEventListeners();
    updateCharCount();
}

// 加载logo图片
function loadLogoImage() {
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.onload = () => {
        state.logoImage = logo;
        console.log('Logo loaded successfully');
    };
    logo.onerror = () => {
        console.log('Logo image not available, will use text fallback');
        state.logoImage = null; // 使用文字标识作为备用方案
    };
    logo.src = 'https://www.genspark.ai/api/files/s/CdtoTmed';
}

// 设置事件监听器
function setupEventListeners() {
    // Input changes
    elements.teacherName.addEventListener('input', handleInputChange);
    elements.teacherTitle.addEventListener('input', handleInputChange);
    elements.teacherIntro.addEventListener('input', handleInputChange);
    elements.teacherIntro.addEventListener('input', updateCharCount);
    
    // Photo upload
    elements.uploadArea.addEventListener('click', () => elements.teacherPhoto.click());
    elements.teacherPhoto.addEventListener('change', handlePhotoUpload);
    elements.removePhoto.addEventListener('click', handlePhotoRemove);
    
    // Drag and drop
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('drop', handleDrop);
    
    // Layout selection
    elements.layoutBtns.forEach(btn => {
        btn.addEventListener('click', () => handleLayoutChange(btn.dataset.layout));
    });
    
    // Style selection
    elements.styleBtns.forEach(btn => {
        btn.addEventListener('click', () => handleStyleChange(btn.dataset.style));
    });
    
    // Actions
    elements.clearBtn.addEventListener('click', handleClear);
    elements.downloadBtn.addEventListener('click', handleDownload);
}

// 处理输入变化
function handleInputChange(e) {
    const field = e.target.id;
    if (field === 'teacherName') {
        state.teacherName = e.target.value;
    } else if (field === 'teacherTitle') {
        state.teacherTitle = e.target.value;
    } else if (field === 'teacherIntro') {
        state.teacherIntro = e.target.value;
    }
    
    updatePreview();
}

// 更新字符计数
function updateCharCount() {
    const count = elements.teacherIntro.value.length;
    elements.charCount.textContent = count;
    
    if (count > 500) {
        elements.charCount.style.color = '#ff0000';
        elements.teacherIntro.value = elements.teacherIntro.value.substring(0, 500);
    } else {
        elements.charCount.style.color = '#6c6c6c';
    }
}

// 处理照片上传
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                state.teacherPhoto = img;
                elements.previewImage.src = event.target.result;
                elements.uploadPlaceholder.style.display = 'none';
                elements.uploadPreview.style.display = 'block';
                updatePreview();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// 移除照片
function handlePhotoRemove(e) {
    e.stopPropagation();
    state.teacherPhoto = null;
    elements.teacherPhoto.value = '';
    elements.uploadPlaceholder.style.display = 'block';
    elements.uploadPreview.style.display = 'none';
    updatePreview();
}

// 处理拖拽
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        elements.teacherPhoto.files = dataTransfer.files;
        handlePhotoUpload({ target: elements.teacherPhoto });
    }
}

// 处理布局切换
function handleLayoutChange(layout) {
    state.layout = layout;
    elements.layoutBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.layout === layout);
    });
    updatePreview();
}

// 处理风格切换
function handleStyleChange(style) {
    state.style = style;
    elements.styleBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === style);
    });
    updatePreview();
}

// 更新预览
function updatePreview() {
    // 检查是否有必要信息
    const hasRequiredInfo = state.teacherName && state.teacherPhoto && state.teacherIntro;
    
    if (!hasRequiredInfo) {
        elements.canvas.classList.remove('visible');
        elements.previewPlaceholder.style.display = 'block';
        elements.downloadBtn.disabled = true;
        return;
    }
    
    elements.canvas.classList.add('visible');
    elements.previewPlaceholder.style.display = 'none';
    elements.downloadBtn.disabled = false;
    
    // 渲染海报
    if (state.style === 'modern') {
        renderModernPoster();
    } else {
        renderClassicPoster();
    }
}

// 渲染现代风格海报
function renderModernPoster() {
    const isHorizontal = state.layout === 'horizontal';
    
    // 设置画布尺寸 (高清)
    if (isHorizontal) {
        elements.canvas.width = 1920;
        elements.canvas.height = 1080;
    } else {
        elements.canvas.width = 1080;
        elements.canvas.height = 1920;
    }
    
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    if (isHorizontal) {
        renderModernHorizontal(width, height);
    } else {
        renderModernVertical(width, height);
    }
}

// 渲染现代风格 - 横版
function renderModernHorizontal(width, height) {
    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#3c2479');
    gradient.addColorStop(1, '#5a3d9a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 装饰元素 - 左侧黄色圆形
    ctx.fillStyle = 'rgba(240, 201, 90, 0.15)';
    ctx.beginPath();
    ctx.arc(-100, height / 2, 400, 0, Math.PI * 2);
    ctx.fill();
    
    // 装饰元素 - 右上角黄色圆形
    ctx.fillStyle = 'rgba(240, 201, 90, 0.1)';
    ctx.beginPath();
    ctx.arc(width + 100, -100, 500, 0, Math.PI * 2);
    ctx.fill();
    
    // 左侧照片区域
    const photoSize = height * 0.65;
    const photoX = width * 0.08;
    const photoY = (height - photoSize) / 2;
    
    // 照片背景装饰
    ctx.fillStyle = '#f0c95a';
    ctx.fillRect(photoX - 20, photoY - 20, photoSize + 40, photoSize + 40);
    
    // 绘制照片
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoSize, photoSize);
    ctx.clip();
    
    // 计算照片缩放
    const scale = Math.max(photoSize / state.teacherPhoto.width, photoSize / state.teacherPhoto.height);
    const scaledWidth = state.teacherPhoto.width * scale;
    const scaledHeight = state.teacherPhoto.height * scale;
    const offsetX = photoX + (photoSize - scaledWidth) / 2;
    const offsetY = photoY + (photoSize - scaledHeight) / 2;
    
    ctx.drawImage(state.teacherPhoto, offsetX, offsetY, scaledWidth, scaledHeight);
    ctx.restore();
    
    // 右侧内容区域
    const contentX = photoX + photoSize + 100;
    const contentWidth = width - contentX - 80;
    const contentY = height * 0.15;
    
    // Logo
    drawLogo(ctx, contentX, contentY, 80, 'left');
    
    // 教师姓名
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 90px "Noto Sans SC"';
    ctx.fillText(state.teacherName, contentX, contentY + 180);
    
    // 职称
    if (state.teacherTitle) {
        ctx.fillStyle = '#f0c95a';
        ctx.font = '40px "Noto Sans SC"';
        ctx.fillText(state.teacherTitle, contentX, contentY + 250);
    }
    
    // 分隔线
    ctx.strokeStyle = '#f0c95a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(contentX, contentY + 290);
    ctx.lineTo(contentX + 200, contentY + 290);
    ctx.stroke();
    
    // 简介
    const introY = contentY + 340;
    const lines = state.teacherIntro.split('\n').filter(line => line.trim());
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px "Noto Sans SC"';
    
    lines.forEach((line, index) => {
        const y = introY + (index * 60);
        if (y < height - 100) {
            // 添加要点符号
            ctx.fillStyle = '#f0c95a';
            ctx.beginPath();
            ctx.arc(contentX + 10, y - 10, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // 文字
            ctx.fillStyle = '#ffffff';
            const text = line.replace(/^[•\-\*]\s*/, '').trim();
            wrapText(ctx, text, contentX + 40, y, contentWidth - 40, 60);
        }
    });
}

// 渲染现代风格 - 竖版
function renderModernVertical(width, height) {
    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#3c2479');
    gradient.addColorStop(1, '#5a3d9a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 装饰元素 - 顶部黄色圆形
    ctx.fillStyle = 'rgba(240, 201, 90, 0.15)';
    ctx.beginPath();
    ctx.arc(width / 2, -200, 500, 0, Math.PI * 2);
    ctx.fill();
    
    // 装饰元素 - 底部黄色圆形
    ctx.fillStyle = 'rgba(240, 201, 90, 0.1)';
    ctx.beginPath();
    ctx.arc(width / 2, height + 200, 600, 0, Math.PI * 2);
    ctx.fill();
    
    // Logo
    const logoY = 80;
    drawLogo(ctx, width / 2, logoY, 100, 'center');
    
    // 照片区域
    const photoSize = width * 0.7;
    const photoX = (width - photoSize) / 2;
    const photoY = 250;
    
    // 照片背景装饰
    ctx.fillStyle = '#f0c95a';
    ctx.fillRect(photoX - 15, photoY - 15, photoSize + 30, photoSize + 30);
    
    // 绘制照片
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoSize, photoSize);
    ctx.clip();
    
    const scale = Math.max(photoSize / state.teacherPhoto.width, photoSize / state.teacherPhoto.height);
    const scaledWidth = state.teacherPhoto.width * scale;
    const scaledHeight = state.teacherPhoto.height * scale;
    const offsetX = photoX + (photoSize - scaledWidth) / 2;
    const offsetY = photoY + (photoSize - scaledHeight) / 2;
    
    ctx.drawImage(state.teacherPhoto, offsetX, offsetY, scaledWidth, scaledHeight);
    ctx.restore();
    
    // 内容区域
    const contentY = photoY + photoSize + 80;
    const contentX = width * 0.1;
    const contentWidth = width * 0.8;
    
    // 教师姓名
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.fillText(state.teacherName, width / 2, contentY);
    
    // 职称
    if (state.teacherTitle) {
        ctx.fillStyle = '#f0c95a';
        ctx.font = '38px "Noto Sans SC"';
        ctx.fillText(state.teacherTitle, width / 2, contentY + 60);
    }
    
    // 分隔线
    ctx.strokeStyle = '#f0c95a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const lineY = contentY + (state.teacherTitle ? 100 : 50);
    ctx.moveTo(width / 2 - 100, lineY);
    ctx.lineTo(width / 2 + 100, lineY);
    ctx.stroke();
    
    // 简介
    ctx.textAlign = 'left';
    const introY = lineY + 60;
    const lines = state.teacherIntro.split('\n').filter(line => line.trim());
    ctx.font = '30px "Noto Sans SC"';
    
    lines.forEach((line, index) => {
        const y = introY + (index * 55);
        if (y < height - 100) {
            // 要点符号
            ctx.fillStyle = '#f0c95a';
            ctx.beginPath();
            ctx.arc(contentX + 10, y - 10, 7, 0, Math.PI * 2);
            ctx.fill();
            
            // 文字
            ctx.fillStyle = '#ffffff';
            const text = line.replace(/^[•\-\*]\s*/, '').trim();
            wrapText(ctx, text, contentX + 35, y, contentWidth - 35, 55);
        }
    });
    
    ctx.textAlign = 'left';
}

// 渲染经典风格海报
function renderClassicPoster() {
    const isHorizontal = state.layout === 'horizontal';
    
    // 设置画布尺寸
    if (isHorizontal) {
        elements.canvas.width = 1920;
        elements.canvas.height = 1080;
    } else {
        elements.canvas.width = 1080;
        elements.canvas.height = 1920;
    }
    
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    if (isHorizontal) {
        renderClassicHorizontal(width, height);
    } else {
        renderClassicVertical(width, height);
    }
}

// 渲染经典风格 - 横版
function renderClassicHorizontal(width, height) {
    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // 左侧紫色区域
    const purpleWidth = width * 0.35;
    ctx.fillStyle = '#3c2479';
    ctx.fillRect(0, 0, purpleWidth, height);
    
    // 黄色装饰条
    ctx.fillStyle = '#f0c95a';
    ctx.fillRect(purpleWidth - 20, 0, 40, height);
    
    // 左侧内容
    const leftX = purpleWidth * 0.1;
    const leftWidth = purpleWidth * 0.8;
    
    // Logo
    drawLogo(ctx, purpleWidth / 2, 80, 80, 'center');
    
    // 教师照片
    const photoSize = purpleWidth * 0.75;
    const photoX = (purpleWidth - photoSize) / 2;
    const photoY = 220;
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    
    const scale = Math.max(photoSize / state.teacherPhoto.width, photoSize / state.teacherPhoto.height);
    const scaledWidth = state.teacherPhoto.width * scale;
    const scaledHeight = state.teacherPhoto.height * scale;
    const offsetX = photoX + (photoSize - scaledWidth) / 2;
    const offsetY = photoY + (photoSize - scaledHeight) / 2;
    
    ctx.drawImage(state.teacherPhoto, offsetX, offsetY, scaledWidth, scaledHeight);
    ctx.restore();
    
    // 圆形照片边框
    ctx.strokeStyle = '#f0c95a';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // 教师姓名
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.fillText(state.teacherName, purpleWidth / 2, photoY + photoSize + 80);
    
    // 职称
    if (state.teacherTitle) {
        ctx.fillStyle = '#f0c95a';
        ctx.font = '32px "Noto Sans SC"';
        ctx.fillText(state.teacherTitle, purpleWidth / 2, photoY + photoSize + 130);
    }
    
    // 右侧内容区域
    ctx.textAlign = 'left';
    const contentX = purpleWidth + 100;
    const contentWidth = width - purpleWidth - 180;
    const contentY = 150;
    
    // 标题
    ctx.fillStyle = '#3c2479';
    ctx.font = 'bold 70px "Noto Sans SC"';
    ctx.fillText('教师简介', contentX, contentY);
    
    // 下划线
    ctx.fillStyle = '#f0c95a';
    ctx.fillRect(contentX, contentY + 20, 200, 6);
    
    // 简介内容
    const introY = contentY + 100;
    const lines = state.teacherIntro.split('\n').filter(line => line.trim());
    ctx.fillStyle = '#2d2d2d';
    ctx.font = '36px "Noto Sans SC"';
    
    lines.forEach((line, index) => {
        const y = introY + (index * 70);
        if (y < height - 100) {
            // 方形装饰
            ctx.fillStyle = '#f0c95a';
            ctx.fillRect(contentX, y - 30, 12, 12);
            
            // 文字
            ctx.fillStyle = '#2d2d2d';
            const text = line.replace(/^[•\-\*]\s*/, '').trim();
            wrapText(ctx, text, contentX + 35, y, contentWidth - 35, 70);
        }
    });
}

// 渲染经典风格 - 竖版
function renderClassicVertical(width, height) {
    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // 顶部紫色区域
    const purpleHeight = height * 0.45;
    ctx.fillStyle = '#3c2479';
    ctx.fillRect(0, 0, width, purpleHeight);
    
    // 黄色装饰条
    ctx.fillStyle = '#f0c95a';
    ctx.fillRect(0, purpleHeight - 20, width, 40);
    
    // Logo
    drawLogo(ctx, width / 2, 60, 90, 'center');
    
    // 教师照片
    const photoSize = width * 0.55;
    const photoX = (width - photoSize) / 2;
    const photoY = 200;
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    
    const scale = Math.max(photoSize / state.teacherPhoto.width, photoSize / state.teacherPhoto.height);
    const scaledWidth = state.teacherPhoto.width * scale;
    const scaledHeight = state.teacherPhoto.height * scale;
    const offsetX = photoX + (photoSize - scaledWidth) / 2;
    const offsetY = photoY + (photoSize - scaledHeight) / 2;
    
    ctx.drawImage(state.teacherPhoto, offsetX, offsetY, scaledWidth, scaledHeight);
    ctx.restore();
    
    // 圆形边框
    ctx.strokeStyle = '#f0c95a';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // 教师姓名
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 70px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.fillText(state.teacherName, width / 2, photoY + photoSize + 80);
    
    // 职称
    if (state.teacherTitle) {
        ctx.fillStyle = '#f0c95a';
        ctx.font = '38px "Noto Sans SC"';
        ctx.fillText(state.teacherTitle, width / 2, photoY + photoSize + 135);
    }
    
    // 下方内容区域
    ctx.textAlign = 'left';
    const contentX = width * 0.1;
    const contentWidth = width * 0.8;
    const contentY = purpleHeight + 80;
    
    // 标题
    ctx.fillStyle = '#3c2479';
    ctx.font = 'bold 60px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.fillText('教师简介', width / 2, contentY);
    
    // 下划线
    ctx.fillStyle = '#f0c95a';
    ctx.fillRect(width / 2 - 100, contentY + 15, 200, 5);
    
    // 简介内容
    ctx.textAlign = 'left';
    const introY = contentY + 80;
    const lines = state.teacherIntro.split('\n').filter(line => line.trim());
    ctx.fillStyle = '#2d2d2d';
    ctx.font = '32px "Noto Sans SC"';
    
    lines.forEach((line, index) => {
        const y = introY + (index * 60);
        if (y < height - 100) {
            // 方形装饰
            ctx.fillStyle = '#f0c95a';
            ctx.fillRect(contentX, y - 25, 10, 10);
            
            // 文字
            ctx.fillStyle = '#2d2d2d';
            const text = line.replace(/^[•\-\*]\s*/, '').trim();
            wrapText(ctx, text, contentX + 30, y, contentWidth - 30, 60);
        }
    });
}

// Logo渲染辅助函数（支持图片或文字备用方案）
function drawLogo(context, x, y, height, align = 'left') {
    if (state.logoImage) {
        const logoWidth = (state.logoImage.width / state.logoImage.height) * height;
        const finalX = align === 'center' ? x - logoWidth / 2 : x;
        context.drawImage(state.logoImage, finalX, y, logoWidth, height);
    } else {
        // 文字备用方案
        context.save();
        context.fillStyle = '#f0c95a';
        context.font = `bold ${height * 0.35}px "Noto Sans SC"`;
        context.textAlign = align;
        const textX = align === 'center' ? x : x;
        context.fillText('万鹤书院', textX, y + height * 0.5);
        context.font = `${height * 0.25}px "Noto Sans SC"`;
        context.fillText('VANHOK ACADEMY', textX, y + height * 0.85);
        context.restore();
    }
}

// 文字换行辅助函数
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split('');
    let line = '';
    let testLine = '';
    let lineArray = [];
    
    for (let n = 0; n < words.length; n++) {
        testLine = line + words[n];
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            lineArray.push(line);
            line = words[n];
        } else {
            line = testLine;
        }
    }
    lineArray.push(line);
    
    // 只绘制第一行（如果文字太长）
    context.fillText(lineArray[0], x, y);
}

// 清空表单
function handleClear() {
    if (confirm('确定要清空所有内容吗？')) {
        // 重置状态
        state.teacherPhoto = null;
        state.teacherName = '';
        state.teacherTitle = '';
        state.teacherIntro = '';
        
        // 重置表单
        elements.teacherName.value = '';
        elements.teacherTitle.value = '';
        elements.teacherIntro.value = '';
        elements.teacherPhoto.value = '';
        
        // 重置上传区域
        elements.uploadPlaceholder.style.display = 'block';
        elements.uploadPreview.style.display = 'none';
        
        // 更新界面
        updateCharCount();
        updatePreview();
    }
}

// 下载海报
function handleDownload() {
    if (!state.teacherName || !state.teacherPhoto) {
        alert('请先完成必填信息！');
        return;
    }
    
    // 生成文件名
    const fileName = `${state.teacherName}_海报_${state.layout === 'horizontal' ? '横版' : '竖版'}.png`;
    
    // 创建下载链接
    elements.canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
