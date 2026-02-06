// 全局變量
let students = [];
let examRoomCount = 3;
let teachers = [];

// DOM元素
const studentListTextarea = document.getElementById('studentList');
const studentCountSpan = document.getElementById('studentCount');
const examRoomCountSelect = document.getElementById('examRoomCount');
const teacherInputsDiv = document.getElementById('teacherInputs');
const startGroupingBtn = document.getElementById('startGrouping');
const setupPage = document.getElementById('setupPage');
const resultPage = document.getElementById('resultPage');
const resultContent = document.getElementById('resultContent');
const backBtn = document.getElementById('backBtn');
const totalStudentsSpan = document.getElementById('totalStudents');
const totalGroupsSpan = document.getElementById('totalGroups');

// 初始化
function init() {
    updateTeacherInputs();
    addEventListeners();
}

// 添加事件監聽器
function addEventListeners() {
    studentListTextarea.addEventListener('input', updateStudentCount);
    examRoomCountSelect.addEventListener('change', updateTeacherInputs);
    startGroupingBtn.addEventListener('click', startGrouping);
    backBtn.addEventListener('click', goBack);
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
            <input type="text" id="teacher${i}" placeholder="請輸入負責老師姓名" value="${teachers[i-1] || ''}">
        `;
        teacherInputsDiv.appendChild(div);
    }
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
    
    // 執行分組邏輯
    const groupingResult = performGrouping();
    
    // 顯示結果
    displayResults(groupingResult);
    
    // 切換頁面
    setupPage.classList.remove('active');
    resultPage.classList.add('active');
}

// 分組邏輯
function performGrouping() {
    // 隨機打亂學生順序
    const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
    
    const totalStudents = shuffledStudents.length;
    let groups = [];
    
    // 計算分組策略
    const remainder = totalStudents % 4;
    let numGroups4 = Math.floor(totalStudents / 4);
    let numGroups3 = 0;
    
    if (remainder === 0) {
        // 剛好整除4，全部4人組
        numGroups4 = totalStudents / 4;
    } else if (remainder === 1) {
        // 餘1：減少1個4人組，變成2個3人組（4+1=3+3-1=5，需要-1個4人組）
        if (numGroups4 > 0) {
            numGroups4 -= 1;
            numGroups3 = 2;
        } else {
            // 如果總數小於4，這種情況不應該出現（已在開始時檢查）
            numGroups3 = 1;
        }
    } else if (remainder === 2) {
        // 餘2：減少1個4人組，變成2個3人組（4+2=3+3）
        if (numGroups4 > 0) {
            numGroups4 -= 1;
            numGroups3 = 2;
        } else {
            // 如果總數小於4，這種情況不應該出現
            numGroups3 = 1;
        }
    } else if (remainder === 3) {
        // 餘3：直接1個3人組
        numGroups3 = 1;
    }
    
    // 創建分組
    let currentIndex = 0;
    
    // 先創建4人組
    for (let i = 0; i < numGroups4; i++) {
        groups.push(shuffledStudents.slice(currentIndex, currentIndex + 4));
        currentIndex += 4;
    }
    
    // 再創建3人組
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
    
    // 輪流分配組到各個考場
    groups.forEach((group, index) => {
        const roomIndex = index % examRoomCount;
        examRooms[roomIndex].groups.push({
            groupNumber: index + 1,
            students: group
        });
    });
    
    return {
        examRooms: examRooms,
        totalGroups: groups.length
    };
}

// 顯示結果
function displayResults(result) {
    resultContent.innerHTML = '';
    
    result.examRooms.forEach(room => {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'exam-room';
        
        let groupsHTML = '';
        room.groups.forEach(group => {
            const studentsHTML = group.students.map(student => 
                `<div class="student">${student}</div>`
            ).join('');
            
            groupsHTML += `
                <div class="group">
                    <div class="group-header">
                        <span class="group-number">第 ${group.groupNumber} 組</span>
                        <span>${group.students.length}人</span>
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
    totalGroupsSpan.textContent = result.totalGroups;
}

// 返回設置頁面
function goBack() {
    resultPage.classList.remove('active');
    setupPage.classList.add('active');
}

// 初始化應用
init();