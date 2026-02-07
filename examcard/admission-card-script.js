// 全局變量
let candidates = []; // 修改為存儲考生對象，每個考生包含多個科目
let currentMethod = 'excel';

// 考生數據結構：
// {
//   candidateNumber: "A123456",
//   name: "張偉明",
//   nameEn: "ZHANG Weiming",
//   gender: "M",
//   subjects: [
//     {
//       subject: "English Language",
//       examLanguage: "英文 English",
//       venue: "Room 101",
//       examDate: "2025-04-15",
//       examTime: "09:00 - 11:30"
//     },
//     {
//       subject: "Chinese Language",
//       examLanguage: "中文 Chinese",
//       venue: "Room 102",
//       examDate: "2025-04-16",
//       examTime: "14:00 - 16:30"
//     }
//   ]
// }

// DOM元素
const excelMethod = document.getElementById('excelMethod');
const manualMethod = document.getElementById('manualMethod');
const excelUploadArea = document.getElementById('excelUploadArea');
const manualInputArea = document.getElementById('manualInputArea');
const excelFileInput = document.getElementById('excelFile');
const candidateList = document.getElementById('candidateList');
const listContainer = document.getElementById('listContainer');
const candidateCountSpan = document.getElementById('candidateCount');
const generateCardsBtn = document.getElementById('generateCards');
const clearAllBtn = document.getElementById('clearAll');
const addCandidateBtn = document.getElementById('addCandidate');
const downloadTemplateBtn = document.getElementById('downloadTemplate');
const setupPage = document.getElementById('setupPage');
const previewPage = document.getElementById('previewPage');
const previewContainer = document.getElementById('previewContainer');
const backToEditBtn = document.getElementById('backToEdit');
const downloadAllBtn = document.getElementById('downloadAll');

// 初始化
function init() {
    setupEventListeners();
}

// 設置事件監聽器
function setupEventListeners() {
    excelMethod.addEventListener('click', () => switchMethod('excel'));
    manualMethod.addEventListener('click', () => switchMethod('manual'));
    excelFileInput.addEventListener('change', handleExcelUpload);
    
    const uploadBox = document.querySelector('.upload-box');
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            excelFileInput.files = files;
            handleExcelUpload();
        }
    });
    
    addCandidateBtn.addEventListener('click', addCandidateManually);
    downloadTemplateBtn.addEventListener('click', downloadExcelTemplate);
    generateCardsBtn.addEventListener('click', generateAdmissionCards);
    clearAllBtn.addEventListener('click', clearAllCandidates);
    backToEditBtn.addEventListener('click', () => {
        previewPage.classList.remove('active');
        setupPage.classList.add('active');
    });
    downloadAllBtn.addEventListener('click', downloadAllPDF);
}

// 切換輸入方式
function switchMethod(method) {
    currentMethod = method;
    
    if (method === 'excel') {
        excelMethod.classList.add('active');
        manualMethod.classList.remove('active');
        excelUploadArea.style.display = 'block';
        manualInputArea.style.display = 'none';
    } else {
        manualMethod.classList.add('active');
        excelMethod.classList.remove('active');
        excelUploadArea.style.display = 'none';
        manualInputArea.style.display = 'block';
    }
}

// 處理Excel上傳 - 修改為支持多科目
function handleExcelUpload() {
    const file = excelFileInput.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            // 按考生編號分組合併科目
            const candidateMap = new Map();
            
            jsonData.forEach(row => {
                const candidateNumber = row['考生編號'] || row['Candidate Number'] || '';
                
                if (!candidateNumber) return;
                
                // 科目信息
                const subject = {
                    subject: row['科目'] || row['Subject'] || '',
                    examLanguage: row['應考語言'] || row['Exam Language'] || '',
                    venue: row['考場'] || row['Venue'] || '',
                    examDate: row['考試日期'] || row['Exam Date'] || '',
                    examTime: row['考試時間'] || row['Exam Time'] || ''
                };
                
                // 如果考生已存在，添加科目
                if (candidateMap.has(candidateNumber)) {
                    candidateMap.get(candidateNumber).subjects.push(subject);
                } else {
                    // 新考生
                    candidateMap.set(candidateNumber, {
                        candidateNumber: candidateNumber,
                        name: row['姓名'] || row['Name'] || '',
                        nameEn: row['英文姓名'] || row['Name (English)'] || '',
                        gender: row['性別'] || row['Gender'] || '',
                        subjects: [subject]
                    });
                }
            });
            
            // 轉換為數組
            candidates = Array.from(candidateMap.values());
            
            updateCandidateList();
            alert(`成功導入 ${candidates.length} 位考生資料，共 ${jsonData.length} 個科目！`);
        } catch (error) {
            alert('Excel檔案格式錯誤，請使用提供的模板！');
            console.error(error);
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// 手動添加考生 - 修改為支持多科目
function addCandidateManually() {
    const name = document.getElementById('candidateName').value.trim();
    const candidateNumber = document.getElementById('candidateNumber').value.trim();
    const gender = document.getElementById('gender').value;
    const subject = document.getElementById('subject').value.trim();
    const examLanguage = document.getElementById('examLanguage').value;
    const venue = document.getElementById('venue').value.trim();
    const examDate = document.getElementById('examDate').value;
    const examTime = document.getElementById('examTime').value.trim();
    
    if (!name || !candidateNumber || !gender || !subject) {
        alert('請填寫所有必填項目（姓名、考生編號、性別、科目）！');
        return;
    }
    
    // 分割中英文姓名
    const nameParts = name.split(/\s+/);
    let nameCh = name;
    let nameEn = '';
    
    if (nameParts.length > 1) {
        nameEn = nameParts[nameParts.length - 1];
        nameCh = nameParts.slice(0, -1).join(' ');
    }
    
    // 科目信息
    const subjectInfo = {
        subject,
        examLanguage,
        venue,
        examDate,
        examTime
    };
    
    // 檢查是否已存在該考生
    const existingCandidate = candidates.find(c => c.candidateNumber === candidateNumber);
    
    if (existingCandidate) {
        // 添加科目到現有考生
        existingCandidate.subjects.push(subjectInfo);
        alert(`已為考生 ${candidateNumber} 添加新科目！`);
    } else {
        // 新考生
        const candidate = {
            candidateNumber,
            name: nameCh,
            nameEn: nameEn,
            gender,
            subjects: [subjectInfo]
        };
        candidates.push(candidate);
    }
    
    updateCandidateList();
    
    // 清空科目相關表單（保留考生基本信息以便添加更多科目）
    document.getElementById('subject').value = '';
    document.getElementById('examLanguage').value = '';
    document.getElementById('venue').value = '';
    document.getElementById('examDate').value = '';
    document.getElementById('examTime').value = '';
}

// 更新考生列表
function updateCandidateList() {
    if (candidates.length === 0) {
        candidateList.style.display = 'none';
        generateCardsBtn.disabled = true;
        return;
    }
    
    candidateList.style.display = 'block';
    generateCardsBtn.disabled = false;
    
    // 計算總科目數
    const totalSubjects = candidates.reduce((sum, c) => sum + c.subjects.length, 0);
    candidateCountSpan.textContent = `${candidates.length}（${totalSubjects}科）`;
    
    listContainer.innerHTML = '';
    candidates.forEach((candidate, index) => {
        const item = document.createElement('div');
        item.className = 'candidate-item';
        
        // 顯示所有科目
        const subjectsList = candidate.subjects.map(s => s.subject).join('、');
        
        item.innerHTML = `
            <div class="candidate-info">
                <strong>${candidate.name} ${candidate.nameEn}</strong>
                <p>編號: ${candidate.candidateNumber} | 性別: ${candidate.gender}</p>
                <p class="subjects-list">科目: ${subjectsList} (${candidate.subjects.length}科)</p>
            </div>
            <button class="btn-delete" onclick="deleteCandidate(${index})">刪除</button>
        `;
        listContainer.appendChild(item);
    });
}

// 刪除考生
function deleteCandidate(index) {
    if (confirm('確定要刪除此考生？')) {
        candidates.splice(index, 1);
        updateCandidateList();
    }
}

// 清空所有考生
function clearAllCandidates() {
    if (confirm('確定要清空所有考生資料？')) {
        candidates = [];
        updateCandidateList();
    }
}

// 下載Excel模板 - 修改為多科目示例
function downloadExcelTemplate() {
    const template = [
        {
            '姓名': '張偉明',
            '英文姓名': 'ZHANG Weiming',
            '考生編號': 'A123456',
            '性別': 'M',
            '科目': 'English Language 英國語文',
            '應考語言': '英文 English',
            '考場': 'Room 101, Vanhok Academy',
            '考試日期': '2025-04-15',
            '考試時間': '09:00 - 11:30'
        },
        {
            '姓名': '張偉明',
            '英文姓名': 'ZHANG Weiming',
            '考生編號': 'A123456',
            '性別': 'M',
            '科目': 'Chinese Language 中國語文',
            '應考語言': '中文 Chinese',
            '考場': 'Room 102, Vanhok Academy',
            '考試日期': '2025-04-16',
            '考試時間': '14:00 - 16:30'
        },
        {
            '姓名': '張偉明',
            '英文姓名': 'ZHANG Weiming',
            '考生編號': 'A123456',
            '性別': 'M',
            '科目': 'Mathematics 數學',
            '應考語言': '英文 English',
            '考場': 'Room 103, Vanhok Academy',
            '考試日期': '2025-04-17',
            '考試時間': '09:00 - 11:30'
        },
        {
            '姓名': '李小華',
            '英文姓名': 'LEE Siu Wah',
            '考生編號': 'A123457',
            '性別': 'F',
            '科目': 'English Language 英國語文',
            '應考語言': '英文 English',
            '考場': 'Room 101, Vanhok Academy',
            '考試日期': '2025-04-15',
            '考試時間': '09:00 - 11:30'
        },
        {
            '姓名': '李小華',
            '英文姓名': 'LEE Siu Wah',
            '考生編號': 'A123457',
            '性別': 'F',
            '科目': 'Biology 生物',
            '應考語言': '中文 Chinese',
            '考場': 'Room 104, Vanhok Academy',
            '考試日期': '2025-04-18',
            '考試時間': '14:00 - 16:30'
        }
    ];
    
    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '考生資料');
    
    worksheet['!cols'] = [
        { wch: 12 },  // 姓名
        { wch: 20 },  // 英文姓名
        { wch: 12 },  // 考生編號
        { wch: 8 },   // 性別
        { wch: 30 },  // 科目
        { wch: 20 },  // 應考語言
        { wch: 35 },  // 考場
        { wch: 12 },  // 考試日期
        { wch: 18 }   // 考試時間
    ];
    
    XLSX.writeFile(workbook, '準考證考生資料模板_多科目.xlsx');
}

// 生成準考證
function generateAdmissionCards() {
    if (candidates.length === 0) {
        alert('請先添加考生資料！');
        return;
    }
    
    previewContainer.innerHTML = '';
    
    candidates.forEach((candidate, index) => {
        const card = createAdmissionCard(candidate, index);
        previewContainer.appendChild(card);
    });
    
    setupPage.classList.remove('active');
    previewPage.classList.add('active');
}

// 創建準考證卡片
function createAdmissionCard(candidate, index) {
    const card = document.createElement('div');
    card.className = 'admission-card';
    card.id = `card-${index}`;
    
    card.innerHTML = generateCardHTML(candidate);
    
    // 生成條形碼
    setTimeout(() => {
        try {
            JsBarcode(`#barcode-${index}`, candidate.candidateNumber, {
                format: 'CODE128',
                width: 2,
                height: 60,
                displayValue: false
            });
        } catch (e) {
            console.error('條形碼生成失敗:', e);
        }
    }, 100);
    
    return card;
}

init();// 生成準考證HTML內容 - 支持多科目
function generateCardHTML(candidate) {
    // 格式化日期 (YYYY-MM-DD -> DD-MMM)
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        return `${day}-${month}`;
    }
    
    // 生成科目表格行
    function generateSubjectRows() {
        return candidate.subjects.map(subject => `
            <tr>
                <td class="subject-cell">${subject.subject || ''}</td>
                <td class="center-align">${subject.examLanguage || ''}</td>
                <td class="venue-cell">${subject.venue || ''}</td>
                <td class="center-align">-</td>
                <td class="center-align">${formatDate(subject.examDate)}</td>
                <td class="center-align">${subject.examTime || ''}</td>
            </tr>
        `).join('');
    }
    
    const cardIndex = candidates.indexOf(candidate);
    
    return `
        <div class="card-content">
            <!-- 頂部區域 -->
            <div class="card-header">
                <!-- Logo區域 -->
                <div class="header-left">
                    <img src="./logo.png" alt="Vanhok Academy Logo" class="card-logo">
                </div>
                
                <!-- 中間標題區域 -->
                <div class="header-center">
                    <div class="year">2025</div>
                    <div class="title-ch">萬鶴書院</div>
                    <div class="title-en">VANHOK ACADEMY</div>
                    <div style="height: 8px;"></div>
                    <div class="form-title-ch">香港中學文憑考試准考證</div>
                    <div class="form-title-en">HKDSE Admission Form</div>
                </div>
                
                <!-- 右側條形碼區域 -->
                <div class="header-right">
                    <svg id="barcode-${cardIndex}"></svg>
                    <div class="candidate-number-display">${candidate.candidateNumber}</div>
                </div>
            </div>
            
            <!-- 考生基本信息 -->
            <div class="basic-info">
                <!-- 第一行：姓名和性別 -->
                <div class="info-row">
                    <div class="info-field" style="flex: 3;">
                        <div class="field-label">
                            <div class="label-ch">考生姓名</div>
                            <div class="label-en">Name of Candidate</div>
                        </div>
                        <div class="field-value">${candidate.name}</div>
                    </div>
                    <div class="info-field" style="flex: 1;">
                        <div class="field-label">
                            <div class="label-ch">性別</div>
                            <div class="label-en">Sex</div>
                        </div>
                        <div class="field-value">${candidate.gender}</div>
                    </div>
                </div>
                
                <!-- 第二行：英文姓名 -->
                <div class="info-row">
                    <div class="info-field full-width">
                        <div class="field-label">
                            <div class="label-ch">英文姓名</div>
                            <div class="label-en">Name in English</div>
                        </div>
                        <div class="field-value">${candidate.nameEn}</div>
                    </div>
                </div>
                
                <!-- 第三行：考生編號 -->
                <div class="info-row">
                    <div class="info-field full-width">
                        <div class="field-label">
                            <div class="label-ch">考生編號</div>
                            <div class="label-en">Candidate Number</div>
                        </div>
                        <div class="field-value candidate-number">${candidate.candidateNumber}</div>
                    </div>
                </div>
                
                <!-- 第四行：身份證明文件 -->
                <div class="info-row">
                    <div class="info-field" style="flex: 2;">
                        <div class="field-label">
                            <div class="label-ch">身份證明文件</div>
                            <div class="label-en">Identity Document</div>
                        </div>
                        <div class="field-value">入境許可證</div>
                    </div>
                    <div class="info-field" style="flex: 1.5;">
                        <div class="field-label">
                            <div class="label-ch">號碼</div>
                            <div class="label-en">Number</div>
                        </div>
                        <div class="field-value">XX12345678</div>
                    </div>
                </div>
            </div>
            
            <!-- 考試科目表格 -->
            <table class="exam-table">
                <thead>
                    <tr>
                        <th class="col-subject">
                            <div class="th-ch">科目</div>
                            <div class="th-en">Subject</div>
                        </th>
                        <th class="col-version">
                            <div class="th-ch">應考語言</div>
                            <div class="th-en">Language</div>
                        </th>
                        <th class="col-exam-center">
                            <div class="th-ch">試場</div>
                            <div class="th-en">Examination Venue</div>
                        </th>
                        <th class="col-center-no">
                            <div class="th-ch">試場編號</div>
                            <div class="th-en">Centre No.</div>
                        </th>
                        <th class="col-date">
                            <div class="th-ch">日期</div>
                            <div class="th-en">Date</div>
                        </th>
                        <th class="col-time col-time-header">
                            <div class="th-ch">時間</div>
                            <div class="th-en">Time</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${generateSubjectRows()}
                </tbody>
            </table>
            
            <!-- 備註 -->
            <div class="remarks-section">
                <div class="remarks-title">
                    <span class="title-ch">備註：</span>
                    <span class="title-en">Remarks:</span>
                </div>
                <div class="remarks-content">
                    <div class="remark-item">
                        <strong>1.</strong> 考生必須於考試開始前十五分鐘到達試場。遲到考生可能不獲准進入試場。<br>
                        <em>Candidates should arrive at the examination venue 15 minutes before the examination starts. Late candidates may not be permitted to enter the venue.</em>
                    </div>
                    <div class="remark-item">
                        <strong>2.</strong> 考生必須攜帶此准考證及有效身份證明文件應試。<br>
                        <em>Candidates must bring this admission form and a valid identity document to the examination.</em>
                    </div>
                    <div class="remark-item">
                        <strong>3.</strong> 考生不得攜帶任何違禁物品進入試場，包括手提電話、智能手錶等電子器材。違者可被取消考試資格。<br>
                        <em>Candidates are not allowed to bring any prohibited items into the examination venue, including mobile phones, smart watches and other electronic devices. Offenders may be disqualified.</em>
                    </div>
                    <div class="remark-item">
                        <strong>4.</strong> 請於考試開始前關閉所有電子器材的鬧鐘功能。<br>
                        <em>Please turn off the alarm function of all electronic devices before the examination starts.</em>
                    </div>
                    <div class="remark-item">
                        <strong>5.</strong> 考試期間，考生不得與他人交談、傳遞物品或作出任何可能干擾其他考生的行為。<br>
                        <em>During the examination, candidates must not talk to others, pass items, or engage in any behaviour that may disturb other candidates.</em>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// PDF批量下載功能
async function downloadAllPDF() {
    if (candidates.length === 0) {
        alert('沒有準考證可供下載！');
        return;
    }
    
    downloadAllBtn.disabled = true;
    downloadAllBtn.textContent = '生成中...';
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        let isFirstPage = true;
        
        for (let i = 0; i < candidates.length; i++) {
            const cardElement = document.getElementById(`card-${i}`);
            
            if (!cardElement) {
                console.warn(`找不到準考證 #${i}`);
                continue;
            }
            
            // 更新進度
            downloadAllBtn.textContent = `生成中... ${i + 1}/${candidates.length}`;
            
            // 將HTML轉換為Canvas
            const canvas = await html2canvas(cardElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4寬度
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // 第一頁不需要添加新頁
            if (!isFirstPage) {
                pdf.addPage();
            }
            isFirstPage = false;
            
            // 添加圖片到PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }
        
        // 下載PDF
        const timestamp = new Date().toISOString().split('T')[0];
        pdf.save(`HKDSE準考證_${timestamp}.pdf`);
        
        alert(`成功生成 ${candidates.length} 張準考證！`);
        
    } catch (error) {
        console.error('PDF生成失敗:', error);
        alert('PDF生成失敗，請檢查瀏覽器控制台！');
    } finally {
        downloadAllBtn.disabled = false;
        downloadAllBtn.textContent = '📥 批量下載PDF';
    }
}

// 單張準考證下載
async function downloadSingleCard(cardIndex) {
    const cardElement = document.getElementById(`card-${cardIndex}`);
    
    if (!cardElement) {
        alert('找不到此準考證！');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const canvas = await html2canvas(cardElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        const candidate = candidates[cardIndex];
        pdf.save(`HKDSE準考證_${candidate.candidateNumber}.pdf`);
        
    } catch (error) {
        console.error('PDF生成失敗:', error);
        alert('PDF生成失敗！');
    }
}
