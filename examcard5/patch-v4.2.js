// ============================================
// v4.2: 補丁腳本 - 修復版本
// Patch Script v4.2 - Fixed
// ============================================

console.log('[v4.2] 補丁腳本載入...');

// 等待DOM完全載入
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initV42Patch);
} else {
    initV42Patch();
}

// 確保所有資源載入完成後再次初始化
window.addEventListener('load', function() {
    console.log('[v4.2] 頁面資源全部載入完成');
    ensureStickerButtonsWork();
});

function initV42Patch() {
    console.log('[v4.2] 初始化補丁');
    
    // 獲取貼紙相關元素 - 使用正確的ID
    const previewStickerBtn = document.getElementById('previewStickers');
    const downloadStickerBtn = document.getElementById('downloadStickers');
    const stickerInfoCard = document.getElementById('stickerInfoCard');
    const stickerActions = document.getElementById('stickerActions');
    const seatNumberInput = document.getElementById('seatNumber');
    
    // 綁定貼紙按鈕事件
    if (previewStickerBtn) {
        previewStickerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[v4.2] 預覽貼紙按鈕被點擊');
            if (typeof previewStickers === 'function') {
                previewStickers();
            } else {
                console.error('[v4.2] previewStickers 函數未定義');
            }
        });
        console.log('[v4.2] 預覽貼紙按鈕已綁定');
    } else {
        console.warn('[v4.2] 找不到預覽貼紙按鈕 (ID: previewStickers)');
    }
    
    if (downloadStickerBtn) {
        downloadStickerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[v4.2] 下載貼紙按鈕被點擊');
            if (typeof downloadStickersPDF === 'function') {
                downloadStickersPDF();
            } else {
                console.error('[v4.2] downloadStickersPDF 函數未定義');
            }
        });
        console.log('[v4.2] 下載貼紙按鈕已綁定');
    } else {
        console.warn('[v4.2] 找不到下載貼紙按鈕 (ID: downloadStickers)');
    }
    
    // 覆蓋原有的 updateCandidateList 函數，添加貼紙按鈕顯示/隱藏邏輯
    const originalUpdateCandidateList = window.updateCandidateList;
    window.updateCandidateList = function() {
        if (originalUpdateCandidateList) {
            originalUpdateCandidateList();
        }
        
        // 更新貼紙按鈕可見性
        if (stickerInfoCard && stickerActions) {
            const shouldShow = candidates.length > 0;
            stickerInfoCard.style.display = shouldShow ? 'block' : 'none';
            stickerActions.style.display = shouldShow ? 'flex' : 'none';
            console.log('[v4.2] 貼紙區域可見性:', shouldShow ? '顯示' : '隱藏');
        }
        
        console.log('[v4.2] 考生列表已更新，當前考生數：', candidates.length);
    };
    
    // 覆蓋原有的 addCandidateManually 函數，添加座位號支持
    const originalAddCandidateManually = window.addCandidateManually;
    window.addCandidateManually = function() {
        const name = document.getElementById('candidateName').value.trim();
        const candidateNumber = document.getElementById('candidateNumber').value.trim();
        const gender = document.getElementById('gender').value;
        const subject = document.getElementById('subject').value.trim();
        const examLanguage = document.getElementById('examLanguage').value;
        const venue = document.getElementById('venue').value.trim();
        const seatNumber = seatNumberInput ? seatNumberInput.value.trim() : '';
        const examDate = document.getElementById('examDate').value;
        const examTime = document.getElementById('examTime').value.trim();
        
        if (!name || !candidateNumber || !gender || !subject) {
            alert('請填寫所有必填項目（姓名、考生編號、性別、科目）！');
            return;
        }
        
        // 分割中英文姓名
        const nameParts = name.split(/\s+/);
        const nameCh = nameParts.length > 1 ? nameParts[0] : name;
        const nameEn = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        
        // 構建科目信息（包含座位號）
        const subjectInfo = {
            subject: subject,
            examLanguage: examLanguage,
            venue: venue,
            seatNumber: seatNumber, // v4.2: 添加座位號
            examDate: examDate,
            examTime: examTime
        };
        
        // 檢查考生是否已存在
        const existingCandidate = candidates.find(c => c.candidateNumber === candidateNumber);
        
        if (existingCandidate) {
            // 添加新科目到現有考生
            existingCandidate.subjects.push(subjectInfo);
        } else {
            // 新增考生
            candidates.push({
                candidateNumber: candidateNumber,
                name: nameCh,
                nameEn: nameEn,
                gender: gender,
                subjects: [subjectInfo]
            });
        }
        
        updateCandidateList();
        
        // 清空輸入
        document.getElementById('subject').value = '';
        document.getElementById('examLanguage').value = '';
        document.getElementById('venue').value = '';
        if (seatNumberInput) {
            seatNumberInput.value = '';
        }
        document.getElementById('examDate').value = '';
        document.getElementById('examTime').value = '';
        
        console.log('[v4.2] 已添加考生/科目（含座位號）');
    };
}

function ensureStickerButtonsWork() {
    const previewBtn = document.getElementById('previewStickers');
    const downloadBtn = document.getElementById('downloadStickers');
    
    if (previewBtn && !previewBtn.onclick) {
        previewBtn.onclick = function() {
            console.log('[v4.2] 預覽貼紙 (onclick)');
            if (typeof previewStickers === 'function') {
                previewStickers();
            }
        };
    }
    
    if (downloadBtn && !downloadBtn.onclick) {
        downloadBtn.onclick = function() {
            console.log('[v4.2] 下載貼紙PDF (onclick)');
            if (typeof downloadStickersPDF === 'function') {
                downloadStickersPDF();
            }
        };
    }
}

console.log('[v4.2] 補丁腳本載入完成');
