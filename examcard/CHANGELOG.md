# 版本更新日誌 - HKDSE準考證生成系統

## v2.0 - 多科目支持重大更新 (2026-02-06)

### 🎯 核心問題
**原問題**：v1.0 版本中，每個科目需要創建獨立的準考證，導致一名考生應考多科時會有多張準考證，不符合實際使用需求。

**用戶需求**：一個學生可以同時應考多個科目，所有科目應該顯示在同一張準考證上。

### ✅ 解決方案

#### 1. 數據結構重構
**舊結構（v1.0）**：
```javascript
// 每個科目一條獨立記錄
candidates = [
    { candidateNumber: "A123456", name: "張偉明", subject: "English" },
    { candidateNumber: "A123456", name: "張偉明", subject: "Chinese" },
    { candidateNumber: "A123456", name: "張偉明", subject: "Math" }
]
// 問題：生成3張準考證
```

**新結構（v2.0）**：
```javascript
// 每個考生一條記錄，包含多個科目
candidates = [
    {
        candidateNumber: "A123456",
        name: "張偉明",
        nameEn: "ZHANG Weiming",
        gender: "M",
        subjects: [
            { subject: "English", examLanguage: "英文", ... },
            { subject: "Chinese", examLanguage: "中文", ... },
            { subject: "Math", examLanguage: "英文", ... }
        ]
    }
]
// 解決：生成1張準考證，包含3個科目
```

#### 2. Excel導入邏輯改進
**方法**：使用 Map 按考生編號分組合併

```javascript
// 核心合併邏輯
const candidateMap = new Map();

jsonData.forEach(row => {
    const candidateNumber = row['考生編號'];
    const subject = {
        subject: row['科目'],
        examLanguage: row['應考語言'],
        venue: row['考場'],
        examDate: row['考試日期'],
        examTime: row['考試時間']
    };
    
    if (candidateMap.has(candidateNumber)) {
        // 考生已存在，添加科目
        candidateMap.get(candidateNumber).subjects.push(subject);
    } else {
        // 新考生
        candidateMap.set(candidateNumber, {
            candidateNumber,
            name: row['姓名'],
            nameEn: row['英文姓名'],
            gender: row['性別'],
            subjects: [subject]
        });
    }
});

candidates = Array.from(candidateMap.values());
```

#### 3. 準考證排版調整
**變更重點**：
- 科目表格從固定單行改為動態多行
- 使用循環生成多個 `<tr>` 行
- 表格高度自動擴展
- 保持A4紙張大小

**實現**：
```javascript
function generateSubjectRows() {
    return candidate.subjects.map(subject => `
        <tr>
            <td>${subject.subject}</td>
            <td>${subject.examLanguage}</td>
            <td>${subject.venue}</td>
            <td>-</td>
            <td>${formatDate(subject.examDate)}</td>
            <td>${subject.examTime}</td>
        </tr>
    `).join('');
}
```

#### 4. 手動輸入功能優化
**改進**：
- 添加第一個科目後，保留考生基本信息
- 用戶可以繼續添加更多科目（無需重複填寫姓名、編號等）
- 自動檢測考生是否已存在，智能添加或創建

**邏輯**：
```javascript
const existingCandidate = candidates.find(c => c.candidateNumber === candidateNumber);

if (existingCandidate) {
    // 為現有考生添加新科目
    existingCandidate.subjects.push(subjectInfo);
} else {
    // 創建新考生
    candidates.push({
        candidateNumber,
        name, nameEn, gender,
        subjects: [subjectInfo]
    });
}
```

#### 5. 列表顯示增強
**新增功能**：
- 顯示考生總數和總科目數：`10位考生（28科）`
- 每個考生項顯示其科目列表：`科目: English、Chinese、Math (3科)`
- 更直觀的數據概覽

### 📋 Excel模板更新

**舊模板問題**：
- 單行模式，一個考生一行
- 多科目需要重複填寫考生信息，容易出錯

**新模板特點**：
- **多行模式**：同一考生多行，每行一個科目
- **示例完整**：提供張偉明(3科)和李小華(2科)的完整示例
- **易於理解**：通過示例直接展示使用方法

**示例**：
```
姓名      | 考生編號  | 科目              | 應考語言
張偉明    | A123456  | English Language  | 英文
張偉明    | A123456  | Chinese Language  | 中文
張偉明    | A123456  | Mathematics       | 英文
李小華    | A123457  | English Language  | 英文
李小華    | A123457  | Biology           | 中文
```

### 🎨 準考證排版改進

**調整前（v1.0）**：
- 固定單行科目表格
- 高度不變
- 一張準考證一個科目

**調整後（v2.0）**：
- 動態多行科目表格
- 高度自動擴展
- 一張準考證多個科目
- 仍保持A4大小

**CSS優化**：
```css
.exam-table tbody tr {
    /* 每個科目一行 */
    border: 1px solid #000;
}

.subject-cell {
    font-weight: bold;
    font-size: 10px;
    line-height: 1.4;
}
```

### 🧪 測試案例

#### 測試1：單科目考生
- **輸入**：1名考生，1個科目
- **期望**：1張準考證，1行科目
- **結果**：✅ 通過

#### 測試2：多科目考生（3科）
- **輸入**：1名考生，3個科目
- **期望**：1張準考證，3行科目
- **結果**：✅ 通過

#### 測試3：多名考生混合
- **輸入**：
  - 張偉明：3科
  - 李小華：2科
  - 王大明：1科
- **期望**：3張準考證，科目數分別為3/2/1行
- **結果**：✅ 通過

#### 測試4：Excel批量導入
- **輸入**：包含5名考生、共12個科目的Excel
- **期望**：正確合併為5張準考證
- **結果**：✅ 通過，顯示「5位考生（12科）」

#### 測試5：手動連續添加
- **輸入**：手動為考生A123456添加3個科目
- **期望**：1張準考證，3行科目
- **結果**：✅ 通過

### 📊 功能對比

| 功能 | v1.0 | v2.0 |
|------|------|------|
| 多科目支持 | ❌ 每科目獨立準考證 | ✅ 一張準考證含多科目 |
| Excel導入 | ✅ 單行單科目 | ✅ 多行自動合併 |
| 手動輸入 | ✅ 每次輸入完整信息 | ✅ 保留信息連續添加 |
| 數據結構 | 扁平化 | 嵌套式（考生→科目） |
| 列表顯示 | 考生數 | 考生數+科目數 |
| 準考證排版 | 固定單行 | 動態多行 |

### 🔄 遷移指南

**從 v1.0 升級到 v2.0**：

1. **數據不兼容**：v1.0的數據無法直接導入v2.0
2. **重新整理Excel**：
   - 將同一考生的多條記錄保留在多行
   - 確保考生編號完全一致
3. **重新生成**：使用v2.0重新生成所有準考證

### 📝 技術細節

#### 合併算法復雜度
- **時間復雜度**：O(n)，其中n為Excel行數
- **空間復雜度**：O(m)，其中m為考生數量
- **效率**：使用Map實現O(1)查找

#### 條形碼生成
- 保持不變，仍使用JsBarcode
- 每張準考證生成一個條形碼（考生編號）

#### PDF生成
- 每張準考證轉為一頁PDF
- 使用html2canvas捕捉完整內容（包括多行科目）
- 自動適應不同高度

### 🐛 已修復問題

1. ✅ **問題**：多科目考生生成多張準考證
   - **修復**：重構數據結構，按考生合併科目
   
2. ✅ **問題**：Excel導入重複考生信息
   - **修復**：使用Map按考生編號去重合併

3. ✅ **問題**：準考證高度不適應多行
   - **修復**：表格改為動態生成，高度自適應

4. ✅ **問題**：手動輸入需要重複填寫基本信息
   - **修復**：保留基本信息，僅更新科目字段

### 📈 性能優化

- 使用Map替代Array.find()，提升查找效率
- 批量生成條形碼時增加延遲，避免渲染阻塞
- PDF生成時顯示進度，提升用戶體驗

### 🎯 未來計劃

- [ ] 支持照片上傳功能（可選）
- [ ] 增加準考證二維碼
- [ ] 支持更多身份證明類型
- [ ] 導出Excel名單功能
- [ ] 歷史記錄保存

---

## v1.0 - 初始版本 (2026-02-05)

### ✅ 已實現功能
- 基於HKDSE官方格式
- Excel批量導入
- 手動輸入
- 萬鶴書院品牌定制
- 條形碼生成
- PDF批量下載

### ⚠️ 已知限制
- 每個科目生成獨立準考證（v2.0已解決）
- 不支持一名考生多科目（v2.0已解決）

---

**開發團隊**：萬鶴書院技術部  
**文檔更新**：2026-02-06
