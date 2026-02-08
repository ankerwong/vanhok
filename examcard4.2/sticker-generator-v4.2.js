// ============================================
// v4.2: 考試貼紙生成功能 - 優化佈局版本
// Exam Sticker Generation Functions - v4.2 Optimized Layout
// ============================================

/**
 * v4.2: 根據DSE分卷規則創建貼紙數據
 * 英文科目：4張貼紙（Paper 1-4）
 * 其他科目：2張貼紙（Paper 1-2）
 */
function createStickersData() {
    const stickers = [];
    
    candidates.forEach(candidate => {
        candidate.subjects.forEach(subjectData => {
            // 判斷是否為英文科目
            const isEnglish = /英文|English/i.test(subjectData.subject);
            const copyCount = isEnglish ? 4 : 2;
            
            // 分割科目為英文和中文
            const subjectParts = splitSubjectName(subjectData.subject);
            
            // 根據規則複製貼紙
            for (let i = 0; i < copyCount; i++) {
                stickers.push({
                    name: candidate.name, // 僅中文姓名
                    candidateNumber: candidate.candidateNumber,
                    subjectEn: subjectParts.en,
                    subjectCh: subjectParts.ch,
                    venue: subjectData.venue || '待定',
                    seatNumber: String(subjectData.seatNumber || '00').trim() // v4.2: 確保座位號為字符串
                });
            }
        });
    });
    
    console.log('[v4.2] 貼紙數據生成完成:', stickers.length, '張');
    return stickers;
}

/**
 * v4.2: 分割科目名稱為英文和中文
 */
function splitSubjectName(subject) {
    // 常見科目映射
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
    
    // 先檢查完整匹配
    if (subjectMap[subject]) {
        return subjectMap[subject];
    }
    
    // 嘗試分割 (中英文之間可能有空格或其他分隔符)
    const match = subject.match(/^([^A-Za-z]+)\s*([A-Za-z\s]+)$/);
    if (match) {
        return {
            ch: match[1].trim(),
            en: match[2].trim()
        };
    }
    
    // 如果都不匹配，檢查是否只有中文或英文
    if (/^[A-Za-z\s]+$/.test(subject)) {
        return { en: subject, ch: '' };
    } else {
        return { ch: subject, en: '' };
    }
}

/**
 * v4.2: 生成單個貼紙的HTML
 * 尺寸：45mm × 30mm
 * 
 * 佈局結構：
 * - 第一行：英文科目名稱
 * - 第二行：中文科目名稱
 * - 第三行：中文姓名 + 考號
 * - 第四行：考號條形碼
 * - 第五行：考場 + 座位號
 */
function createStickerHTML(sticker, id) {
    return `
        <div class="exam-sticker">
            <!-- 第一、二行：科目雙行顯示 -->
            <div class="sticker-subject-header">
                ${sticker.subjectEn ? `<div class="subject-line subject-en">${sticker.subjectEn}</div>` : ''}
                ${sticker.subjectCh ? `<div class="subject-line subject-ch">${sticker.subjectCh}</div>` : ''}
            </div>
            
            <!-- 第三行：姓名 + 考號 -->
            <div class="sticker-name-number">
                <span class="sticker-name">${sticker.name}</span>
                <span class="sticker-separator">|</span>
                <span class="sticker-candidate-num">${sticker.candidateNumber}</span>
            </div>
            
            <!-- 第四行：考號條形碼 -->
            <div class="sticker-barcode-area">
                <svg id="barcode-sticker-${id}" class="sticker-barcode-svg"></svg>
            </div>
            
            <!-- 第五行：考場 + 座位號 -->
            <div class="sticker-venue-seat">
                <span class="venue-text">${sticker.venue}</span>
                <span class="seat-label">座位:</span>
                <span class="seat-number">${sticker.seatNumber}</span>
            </div>
        </div>
    `;
}

/**
 * v4.2: 渲染A4貼紙頁面
 * 排版：4列 × 9行 = 36張/頁 (修正從10行改為9行)
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
 * v4.2: 生成條形碼 (為考號生成)
 */
function generateStickerBarcode(elementId, candidateNumber) {
    try {
        JsBarcode(`#${elementId}`, candidateNumber, {
            format: 'CODE128',
            width: 1.2,
            height: 30,
            displayValue: false,
            margin: 0
        });
    } catch (error) {
        console.error('[v4.2] 條形碼生成失敗:', elementId, error);
    }
}

/**
 * v4.2: 預覽貼紙
 */
function previewStickers() {
    if (candidates.length === 0) {
        alert('請先導入考生資料！');
        return;
    }
    
    console.log('[v4.2] 開始預覽貼紙...');
    
    // 創建貼紙數據
    const stickers = createStickersData();
    
    console.log('[v4.2] 貼紙數據:', stickers); // 調試用
    
    // 獲取預覽容器
    const stickerPreviewContainer = document.getElementById('stickerPreviewContainer');
    if (!stickerPreviewContainer) {
        console.error('[v4.2] 找不到貼紙預覽容器');
        return;
    }
    
    // 渲染到預覽容器
    stickerPreviewContainer.innerHTML = renderStickerPages(stickers);
    stickerPreviewContainer.style.display = 'block';
    
    // 生成條形碼
    setTimeout(() => {
        stickers.forEach((sticker, index) => {
            generateStickerBarcode(`barcode-sticker-${index}`, sticker.candidateNumber);
        });
        console.log('[v4.2] 條形碼生成完成');
    }, 100);
    
    // 滾動到預覽區域
    stickerPreviewContainer.scrollIntoView({ behavior: 'smooth' });
    
    alert(`已生成 ${stickers.length} 張貼紙（共 ${Math.ceil(stickers.length / 36)} 頁A4）\n\n說明：\n- 英文科目：4張貼紙\n- 其他科目：2張貼紙\n- 排版：4列×9行=36張/頁\n- 條形碼：基於考號生成`);
}

/**
 * v4.2: 下載貼紙PDF - 性能優化版本
 */
async function downloadStickersPDF() {
    if (candidates.length === 0) {
        alert('請先導入考生資料！');
        return;
    }
    
    console.log('[v4.2] 開始生成貼紙PDF...');
    
    // 顯示Loading
    showLoading('正在準備貼紙數據...');
    
    try {
        const stickers = createStickersData();
        
        // 創建臨時容器
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.innerHTML = renderStickerPages(stickers);
        document.body.appendChild(tempContainer);
        
        updateLoadingText('正在生成條形碼...');
        
        // 生成條形碼
        stickers.forEach((sticker, index) => {
            generateStickerBarcode(`barcode-sticker-${index}`, sticker.candidateNumber);
        });
        
        // 等待條形碼渲染
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // 使用jsPDF生成PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const pages = tempContainer.querySelectorAll('.a4-sticker-page');
        console.log('[v4.2] 總頁數:', pages.length);
        
        // v4.2: 優化渲染參數以提高速度
        for (let i = 0; i < pages.length; i++) {
            if (i > 0) pdf.addPage();
            
            updateLoadingText(`正在生成第 ${i + 1}/${pages.length} 頁...`);
            
            const canvas = await html2canvas(pages[i], {
                scale: 1.5, // v4.2: 從2降至1.5，提高生成速度
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                removeContainer: false
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 0.65); // v4.2: 從0.8降至0.65，減小文件大小
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }
        
        // 清理臨時容器
        document.body.removeChild(tempContainer);
        
        updateLoadingText('正在保存PDF...');
        
        // 下載PDF
        pdf.save(`HKDSE考試貼紙_${new Date().getTime()}.pdf`);
        
        hideLoading();
        alert(`貼紙PDF生成成功！\n\n統計：\n- 總計：${stickers.length} 張貼紙\n- 頁數：${pages.length} 頁A4\n- 排版：4列×9行\n- 條形碼：基於考號`);
        
    } catch (error) {
        hideLoading();
        alert('PDF生成失敗: ' + error.message);
        console.error('[v4.2] PDF生成錯誤:', error);
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

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

console.log('[v4.2] 貼紙生成器載入完成');
