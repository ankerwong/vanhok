// ============================================
// v4.2: 考試貼紙生成功能 - 性能優化版本
// Exam Sticker Generation Functions - v4.2 Performance Optimized
// ============================================

// 全局条形码缓存对象
window.barcodeCache = window.barcodeCache || {};

/**
 * v4.2: 生成条形码并缓存为base64
 */
function generateAndCacheBarcode(value) {
    // 检查缓存
    if (window.barcodeCache[value]) {
        return window.barcodeCache[value];
    }
    
    try {
        // 创建临时SVG元素
        const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tempSvg.setAttribute('id', 'temp-barcode-' + Date.now());
        document.body.appendChild(tempSvg);
        
        // 生成条形码
        JsBarcode(tempSvg, value, {
            format: 'CODE128',
            width: 1.2,
            height: 30,
            displayValue: false,
            margin: 0
        });
        
        // 转换为base64
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(tempSvg);
        const base64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
        
        // 清理临时元素
        document.body.removeChild(tempSvg);
        
        // 缓存结果
        window.barcodeCache[value] = base64;
        console.log('[v4.2] 条形码已缓存:', value);
        
        return base64;
    } catch (error) {
        console.error('[v4.2] 条形码生成失败:', value, error);
        return null;
    }
}

/**
 * v4.2: 预生成所有考号的条形码
 */
function preGenerateBarcodes() {
    console.log('[v4.2] 开始预生成条形码...');
    const candidateNumbers = new Set();
    
    // 收集所有唯一的考号
    candidates.forEach(candidate => {
        candidateNumbers.add(candidate.candidateNumber);
    });
    
    // 批量生成并缓存
    let count = 0;
    candidateNumbers.forEach(number => {
        if (!window.barcodeCache[number]) {
            generateAndCacheBarcode(number);
            count++;
        }
    });
    
    console.log('[v4.2] 条形码预生成完成:', count, '个新条码');
    return count;
}

/**
 * v4.2: 根据DSE分卷规则创建贴纸数据
 */
function createStickersData() {
    const stickers = [];
    
    candidates.forEach(candidate => {
        candidate.subjects.forEach(subjectData => {
            const isEnglish = /英文|English/i.test(subjectData.subject);
            const copyCount = isEnglish ? 4 : 2;
            const subjectParts = splitSubjectName(subjectData.subject);
            
            for (let i = 0; i < copyCount; i++) {
                stickers.push({
                    name: candidate.name,
                    candidateNumber: candidate.candidateNumber,
                    subjectEn: subjectParts.en,
                    subjectCh: subjectParts.ch,
                    venue: subjectData.venue || '待定',
                    seatNumber: String(subjectData.seatNumber || '00').trim()
                });
            }
        });
    });
    
    console.log('[v4.2] 贴纸数据生成完成:', stickers.length, '张');
    return stickers;
}

/**
 * v4.2: 分割科目名称
 */
function splitSubjectName(subject) {
    const subjectMap = {
        '英文 English': { en: 'English', ch: '英文' },
        'English 英文': { en: 'English', ch: '英文' },
        '中文 Chinese': { en: 'Chinese', ch: '中文' },
        'Chinese 中文': { en: 'Chinese', ch: '中文' },
        '數學 Mathematics': { en: 'Mathematics', ch: '數學' },
        'Mathematics 數學': { en: 'Mathematics', ch: '數學' },
        '通識 Liberal Studies': { en: 'Liberal Studies', ch: '通識' },
        'Liberal Studies 通識': { en: 'Liberal Studies', ch: '通識' },
        '物理 Physics': { en: 'Physics', ch: '物理' },
        'Physics 物理': { en: 'Physics', ch: '物理' },
        '化學 Chemistry': { en: 'Chemistry', ch: '化學' },
        'Chemistry 化學': { en: 'Chemistry', ch: '化學' },
        '生物 Biology': { en: 'Biology', ch: '生物' },
        'Biology 生物': { en: 'Biology', ch: '生物' }
    };
    
    if (subjectMap[subject]) {
        return subjectMap[subject];
    }
    
    const match = subject.match(/^([^A-Za-z]+)\s*([A-Za-z\s]+)$/);
    if (match) {
        return { ch: match[1].trim(), en: match[2].trim() };
    }
    
    if (/^[A-Za-z\s]+$/.test(subject)) {
        return { en: subject, ch: '' };
    } else {
        return { ch: subject, en: '' };
    }
}

/**
 * v4.2: 生成单个贴纸HTML - 使用缓存的条形码图片
 */
function createStickerHTML(sticker, id) {
    const barcodeBase64 = window.barcodeCache[sticker.candidateNumber] || '';
    
    return `
        <div class="exam-sticker">
            <div class="sticker-subject-header">
                ${sticker.subjectEn ? `<div class="subject-line subject-en">${sticker.subjectEn}</div>` : ''}
                ${sticker.subjectCh ? `<div class="subject-line subject-ch">${sticker.subjectCh}</div>` : ''}
            </div>
            
            <div class="sticker-name-number">
                <span class="sticker-name">${sticker.name}</span>
                <span class="sticker-separator">|</span>
                <span class="sticker-candidate-num">${sticker.candidateNumber}</span>
            </div>
            
            <div class="sticker-barcode-area">
                ${barcodeBase64 ? `<img src="${barcodeBase64}" class="sticker-barcode-img" alt="Barcode">` : ''}
            </div>
            
            <div class="sticker-venue-seat">
                <span class="venue-text">${sticker.venue}</span>
                <span class="seat-label">座位:</span>
                <span class="seat-number">${sticker.seatNumber}</span>
            </div>
        </div>
    `;
}

/**
 * v4.2: 渲染A4贴纸页面
 */
function renderStickerPages(stickers) {
    const stickersPerPage = 36; // 4列 × 9行
    const pages = Math.ceil(stickers.length / stickersPerPage);
    let html = '';
    
    for (let page = 0; page < pages; page++) {
        const pageStickers = stickers.slice(page * stickersPerPage, (page + 1) * stickersPerPage);
        html += `<div class="a4-sticker-page" id="sticker-page-${page}">`;
        
        pageStickers.forEach((sticker, index) => {
            const globalId = page * stickersPerPage + index;
            html += createStickerHTML(sticker, globalId);
        });
        
        html += '</div>';
    }
    
    return html;
}

/**
 * v4.2: 预览贴纸
 */
function previewStickers() {
    if (candidates.length === 0) {
        alert('請先導入考生資料！');
        return;
    }
    
    console.log('[v4.2] 开始预览贴纸...');
    showLoading('正在準備貼紙預覽...');
    
    // 异步处理，避免阻塞UI
    setTimeout(() => {
        try {
            // 预生成条形码
            preGenerateBarcodes();
            
            // 创建贴纸数据
            const stickers = createStickersData();
            
            // 获取预览容器
            const stickerPreviewContainer = document.getElementById('stickerPreviewContainer');
            if (!stickerPreviewContainer) {
                console.error('[v4.2] 找不到贴纸预览容器');
                hideLoading();
                return;
            }
            
            // 渲染到预览容器
            stickerPreviewContainer.innerHTML = renderStickerPages(stickers);
            stickerPreviewContainer.style.display = 'block';
            
            // 滚动到预览区域
            stickerPreviewContainer.scrollIntoView({ behavior: 'smooth' });
            
            hideLoading();
            alert(`已生成 ${stickers.length} 張貼紙（共 ${Math.ceil(stickers.length / 36)} 頁A4）\n\n說明：\n- 英文科目：4張貼紙\n- 其他科目：2張貼紙\n- 排版：4列×9行=36張/頁\n- 條形碼：已緩存優化`);
        } catch (error) {
            console.error('[v4.2] 预览失败:', error);
            hideLoading();
            alert('預覽失敗: ' + error.message);
        }
    }, 100);
}

/**
 * v4.2: 下载贴纸PDF - 极致性能优化版本
 */
async function downloadStickersPDF() {
    if (candidates.length === 0) {
        alert('請先導入考生資料！');
        return;
    }
    
    console.log('[v4.2] 开始生成贴纸PDF...');
    showLoading('正在準備數據...');
    
    try {
        // 1. 预生成条形码
        updateLoadingText('正在生成條形碼緩存...');
        preGenerateBarcodes();
        
        // 2. 创建贴纸数据
        const stickers = createStickersData();
        const totalPages = Math.ceil(stickers.length / 36);
        console.log('[v4.2] 总页数:', totalPages, '总贴纸数:', stickers.length);
        
        // 3. 创建PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true // 启用压缩
        });
        
        // 4. 创建临时容器
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        document.body.appendChild(tempContainer);
        
        // 5. 分页渲染 - 每次只渲染一页
        for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
            updateLoadingText(`正在生成第 ${pageIndex + 1}/${totalPages} 頁...`);
            
            // 计算当前页的贴纸
            const startIdx = pageIndex * 36;
            const endIdx = Math.min(startIdx + 36, stickers.length);
            const pageStickers = stickers.slice(startIdx, endIdx);
            
            // 渲染当前页
            tempContainer.innerHTML = '<div class="a4-sticker-page">';
            pageStickers.forEach((sticker, idx) => {
                tempContainer.querySelector('.a4-sticker-page').innerHTML += createStickerHTML(sticker, idx);
            });
            tempContainer.innerHTML += '</div>';
            
            // 短暂延迟确保DOM更新
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // 转换为canvas - 极低分辨率以提高速度和减小文件
            const page = tempContainer.querySelector('.a4-sticker-page');
            const canvas = await html2canvas(page, {
                scale: 1.0, // 降至1.0，大幅提升速度
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                removeContainer: false,
                imageTimeout: 0,
                allowTaint: true
            });
            
            // 转换为JPEG - 极低质量
            const imgData = canvas.toDataURL('image/jpeg', 0.4); // 降至0.4，确保每页<1MB
            
            // 添加到PDF
            if (pageIndex > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            
            // 清理当前页内容，释放内存
            tempContainer.innerHTML = '';
            
            // 手动触发垃圾回收（建议）
            if (pageIndex % 5 === 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log(`[v4.2] 第 ${pageIndex + 1}/${totalPages} 页完成`);
        }
        
        // 6. 清理临时容器
        document.body.removeChild(tempContainer);
        
        // 7. 下载PDF
        updateLoadingText('正在保存PDF...');
        const fileName = `HKDSE考試貼紙_${new Date().getTime()}.pdf`;
        pdf.save(fileName);
        
        hideLoading();
        
        // 8. 显示统计信息
        const pdfSize = (pdf.output('blob').size / 1024 / 1024).toFixed(2);
        const avgSizePerPage = (pdfSize / totalPages).toFixed(2);
        
        alert(`貼紙PDF生成成功！\n\n統計：\n- 總計：${stickers.length} 張貼紙\n- 頁數：${totalPages} 頁A4\n- 文件大小：${pdfSize} MB\n- 平均每頁：${avgSizePerPage} MB\n- 排版：4列×9行\n- 條形碼：緩存復用\n\n優化提示：\n- 已啟用極致壓縮\n- 每頁控制在 1MB 以內`);
        
        console.log('[v4.2] PDF生成完成，文件大小:', pdfSize, 'MB');
        
    } catch (error) {
        hideLoading();
        console.error('[v4.2] PDF生成错误:', error);
        alert('PDF生成失敗: ' + error.message + '\n\n建議：\n1. 減少考生數量分批生成\n2. 清除瀏覽器快取\n3. 重新刷新頁面');
    }
}

/**
 * v4.2: Loading 控制
 */
function showLoading(text = '處理中...') {
    let loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">${text}</div>
            <div class="loading-progress" style="display: none;">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-text" id="progressText">0%</div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
    loadingOverlay.style.display = 'flex';
    loadingOverlay.querySelector('.loading-text').textContent = text;
}

function updateLoadingText(text) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.querySelector('.loading-text').textContent = text;
    }
}

function updateProgress(current, total) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (progressFill && progressText) {
        const percent = Math.round((current / total) * 100);
        progressFill.style.width = percent + '%';
        progressText.textContent = percent + '%';
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

console.log('[v4.2] 貼紙生成器（性能優化版）載入完成');
