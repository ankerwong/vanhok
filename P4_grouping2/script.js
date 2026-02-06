// 全局變量
let students = [];
let examRoomCount = 3;
let teachers = [];
let groupingResult = null;
let currentBatch = 1;
let totalBatches = 1;

// DOM元素
const studentListTextarea = document.getElementById('studentList');
const studentCountSpan = document.getElementById('studentCount');
const examRoomCountSelect = document.getElementById('examRoomCount');
const teacherInputsDiv = document.getElementById('teacherInputs');
const startGroupingBtn = document.getElementById('startGrouping');
const clearDataBtn = document.getElementById('clearDataBtn');
const setupPage = document.getElementById('setupPage');
const drawingPage = document.getElementById('drawingPage');
const resultPage = document.getElementById('resultPage');
const resultContent = document.getElementById('resultContent');
const backBtn = document.getElementById('backBtn');
const totalStudentsSpan = document.getElementById('totalStudents');
const totalGroupsSpan = document.getElementById('totalGroups');
const prevBatchBtn = document.getElementById('prevBatchBtn');
const nextBatchBtn = document.getElementById('nextBatchBtn');
const currentBatchSpan = document.getElementById('currentBatch');
const totalBatchesSpan = document.getElementById('totalBatches');
const studentShuffleDiv = document.getElementById('studentShuffle');

// Cookie 工具函數
const CookieManager = {
    // 保存數據到 Cookie
    save(key, data) {
        const jsonData = JSON.stringify(data);
        // 設置過期時間為 7 天
        const expires = new Date();
        expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `${key}=${encodeURIComponent(jsonData)};expires=${expires.toUTCString()};path=/`;
    },
    
    // 從 Cookie 讀取數據
    load(key) {
        const nameEQ = key + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
                try {
                    return JSON.parse(value);
                } catch(e) {
                    return null;
                }
            }
        }
        return null;
    },
    
    // 刪除 Cookie
    delete(key) {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    },
    
    // 清空所有相關 Cookie
    clearAll() {
        this.delete('vanhok_students');
        this.delete('vanhok_teachers');
        this.delete('vanhok_examRoomCount');
        this.delete('vanhok_groupingResult');
        this.delete('vanhok_currentBatch');
    }
};

// 初始化
function init() {
    // 嘗試從 Cookie 恢復數據
    restoreFromCookie();
    
    updateTeacherInputs();
    addEventListeners();
    
    // 如果有保存的結果，詢問是否恢復
    if (groupingResult) {
        showResultPage();
    }
}

// 從 Cookie 恢復數據
function restoreFromCookie() {
    const savedStudents = CookieManager.load('vanhok_students');
    const savedTeachers = CookieManager.load('vanhok_teachers');
    const savedExamRoomCount = CookieManager.load('vanhok_examRoomCount');
    const savedGroupingResult = CookieManager.load('vanhok_groupingResult');
    const savedCurrentBatch = CookieManager.load('vanhok_currentBatch');
    
    if (savedStudents) {
        students = savedStudents;
        studentListTextarea.value = students.join('\n');
        updateStudentCount();
    }
    
    if (savedTeachers) {
        teachers = savedTeachers;
    }
    
    if (savedExamRoomCount) {
        examRoomCount = savedExamRoomCount;
        examRoomCountSelect.value = examRoomCount;
    }
    
    if (savedGroupingResult) {
        groupingResult = savedGroupingResult;
    }
    
    if (savedCurrentBatch) {
        currentBatch = savedCurrentBatch;
    }
}

// 保存數據到 Cookie
function saveDataToCookie() {
    CookieManager.save('vanhok_students', students);
    CookieManager.save('vanhok_teachers', teachers);
    CookieManager.save('vanhok_examRoomCount', examRoomCount);
    if (groupingResult) {
        CookieManager.save('vanhok_groupingResult', groupingResult);
        CookieManager.save('vanhok_currentBatch', currentBatch);
    }
}

// 清空所有數據
function clearAllData() {
    if (confirm('確定要清空所有數據嗎？這將清除學生名單、教師信息和分組結果。')) {
        students = [];
        teachers = [];
        examRoomCount = 3;
        groupingResult = null;
        currentBatch = 1;
        
        studentListTextarea.value = '';
        examRoomCountSelect.value = 3;
        updateStudentCount();
        updateTeacherInputs();
        
        CookieManager.clearAll();
        
        alert('數據已清空！');
    }
}

// 添加事件監聽器
function addEventListeners() {
    studentListTextarea.addEventListener('input', () => {
        updateStudentCount();
        saveDataToCookie();
    });
    
    examRoomCountSelect.addEventListener('change', () => {
        updateTeacherInputs();
        saveDataToCookie();
    });
    
    startGroupingBtn.addEventListener('click', startGrouping);
    clearDataBtn.addEventListener('click', clearAllData);
    backBtn.addEventListener('click', goBack);
    prevBatchBtn.addEventListener('click', showPrevBatch);
    nextBatchBtn.addEventListener('click', showNextBatch);
}

// 更新學生計數
function updateStudentCount() {
    const text = studentListTextarea.value.trim();
    if (text === '') {
        students = [];
    } else {
        students = text.split('\n')
            .map(name => name.trim())
            .filter(name => name !== '');
    }
    studentCountSpan.textContent = students.length;
}

// 更新教師輸入框
function updateTeacherInputs() {
    examRoomCount = parseInt(examRoomCountSelect.value);
    teacherInputsDiv.innerHTML = '';
    
    for (let i = 1; i <= examRoomCount; i++) {
        const div = document.createElement('div');
        div.className = 'teacher-input-group';
        div.innerHTML = `
            <label>考場 ${i}：</label>
            <input type="text" id="teacher${i}" class="teacher-input" placeholder="請輸入負責老師姓名" value="${teachers[i-1] || ''}">
        `;
        teacherInputsDiv.appendChild(div);
    }
    
    // 為新生成的輸入框添加事件監聽
    document.querySelectorAll('.teacher-input').forEach(input => {
        input.addEventListener('input', saveDataToCookie);
    });
}

// 開始分組
function startGrouping() {
    // 驗證輸入
    updateStudentCount();
    
    if (students.length === 0) {
        alert('請輸入學生名單！');
        return;
    }
    
    if (students.length < 3) {
        alert('學生人數至少需要3人才能進行分組！');
        return;
    }
    
    // 獲取教師姓名
    teachers = [];
    for (let i = 1; i <= examRoomCount; i++) {
        const teacherName = document.getElementById(`teacher${i}`).value.trim();
        if (teacherName === '') {
            alert(`請輸入考場 ${i} 的負責老師姓名！`);
            return;
        }
        teachers.push(teacherName);
    }
    
    // 保存數據
    saveDataToCookie();
    
    // 顯示抽籤動畫
    showDrawingAnimation();
    
    // 1.5秒後執行分組並顯示結果
    setTimeout(() => {
        groupingResult = performGrouping();
        currentBatch = 1;
        totalBatches = Math.max(...groupingResult.examRooms.map(room => room.groups.length));
        
        saveDataToCookie();
        showResultPage();
    }, 1800);
}

// 顯示抽籤動畫
function showDrawingAnimation() {
    setupPage.classList.remove('active');
    drawingPage.classList.add('active');
    
    // 隨機顯示學生姓名的動畫效果
    let shuffleIndex = 0;
    const shuffleInterval = setInterval(() => {
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        studentShuffleDiv.textContent = randomStudent;
        shuffleIndex++;
        
        if (shuffleIndex > 15) {
            clearInterval(shuffleInterval);
        }
    }, 100);
}

// 分組邏輯
function performGrouping() {
    // 隨機打亂學生順序
    const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
    
    const totalStudents = shuffledStudents.length;
    let groups = [];
    
    // 計算分組策略（確保每組3-4人，不會出現1人或2人組）
    const remainder = totalStudents % 4;
    let numGroups4 = Math.floor(totalStudents / 4);
    let numGroups3 = 0;
    
    if (remainder === 0) {
        // 剛好整除4，全部4人組
        numGroups4 = totalStudents / 4;
    } else if (remainder === 1) {
        // 餘1：減少2個4人組，變成3個3人組（8+1=9=3+3+3）
        if (numGroups4 >= 2) {
            numGroups4 -= 2;
            numGroups3 = 3;
        } else {
            // 總數小於8（如5人、6人、7人等），無法形成有效分組
            // 這種情況在驗證階段已排除（最少3人）
            numGroups3 = 1;
        }
    } else if (remainder === 2) {
        // 餘2：減少1個4人組，變成2個3人組（4+2=6=3+3）
        if (numGroups4 > 0) {
            numGroups4 -= 1;
            numGroups3 = 2;
        } else {
            // 總數小於4（如5人、6人），無法形成有效分組
            numGroups3 = 1;
        }
    } else if (remainder === 3) {
        // 餘3：直接1個3人組
        numGroups3 = 1;
    }
    
    // 創建分組
    let currentIndex = 0;
    
    for (let i = 0; i < numGroups4; i++) {
        groups.push(shuffledStudents.slice(currentIndex, currentIndex + 4));
        currentIndex += 4;
    }
    
    for (let i = 0; i < numGroups3; i++) {
        groups.push(shuffledStudents.slice(currentIndex, currentIndex + 3));
        currentIndex += 3;
    }
    
    // 將分組分配到各個考場
    const examRooms = [];
    for (let i = 0; i < examRoomCount; i++) {
        examRooms.push({
            roomNumber: i + 1,
            teacher: teachers[i],
            groups: []
        });
    }
    
    groups.forEach((group, index) => {
        const roomIndex = index % examRoomCount;
        examRooms[roomIndex].groups.push({
            groupNumber: index + 1,
            students: group,
            batchNumber: examRooms[roomIndex].groups.length + 1
        });
    });
    
    return {
        examRooms: examRooms,
        totalGroups: groups.length
    };
}

// 顯示結果頁面
function showResultPage() {
    drawingPage.classList.remove('active');
    setupPage.classList.remove('active');
    resultPage.classList.add('active');
    
    displayResults();
    updateBatchControls();
}

// 顯示結果
function displayResults() {
    resultContent.innerHTML = '';
    
    groupingResult.examRooms.forEach(room => {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'exam-room';
        
        let groupsHTML = '';
        room.groups.forEach(group => {
            const isHidden = group.batchNumber > currentBatch ? 'batch-hidden' : '';
            const studentsHTML = group.students.map(student => 
                `<div class="student">${student}</div>`
            ).join('');
            
            groupsHTML += `
                <div class="group ${isHidden}" data-batch="${group.batchNumber}">
                    <div class="group-header">
                        <span class="group-number">第 ${group.groupNumber} 組</span>
                        <span>批次 ${group.batchNumber} | ${group.students.length}人</span>
                    </div>
                    <div class="student-list">
                        ${studentsHTML}
                    </div>
                </div>
            `;
        });
        
        roomDiv.innerHTML = `
            <div class="room-header">
                <h2>考場 ${room.roomNumber}</h2>
                <div class="teacher">負責老師：${room.teacher}</div>
            </div>
            <div class="groups-container">
                ${groupsHTML}
            </div>
        `;
        
        resultContent.appendChild(roomDiv);
    });
    
    totalStudentsSpan.textContent = students.length;
    totalGroupsSpan.textContent = groupingResult.totalGroups;
}

// 更新批次控制
function updateBatchControls() {
    currentBatchSpan.textContent = currentBatch;
    totalBatchesSpan.textContent = totalBatches;
    
    prevBatchBtn.disabled = currentBatch === 1;
    nextBatchBtn.disabled = currentBatch === totalBatches;
}

// 顯示上一批
function showPrevBatch() {
    if (currentBatch > 1) {
        currentBatch--;
        updateBatchDisplay();
        saveDataToCookie();
    }
}

// 顯示下一批
function showNextBatch() {
    if (currentBatch < totalBatches) {
        currentBatch++;
        updateBatchDisplay();
        saveDataToCookie();
    }
}

// 更新批次顯示
function updateBatchDisplay() {
    const allGroups = document.querySelectorAll('.group');
    
    allGroups.forEach(group => {
        const batchNumber = parseInt(group.dataset.batch);
        
        if (batchNumber <= currentBatch) {
            group.classList.remove('batch-hidden');
        } else {
            group.classList.add('batch-hidden');
        }
    });
    
    updateBatchControls();
}

// 返回設置頁面
function goBack() {
    if (confirm('返回將清除當前分組結果，確定要返回嗎？')) {
        groupingResult = null;
        currentBatch = 1;
        CookieManager.delete('vanhok_groupingResult');
        CookieManager.delete('vanhok_currentBatch');
        
        resultPage.classList.remove('active');
        setupPage.classList.add('active');
    }
}

// 初始化應用
init();