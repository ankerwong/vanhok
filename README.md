# 香港中學查詢系統 (HKSS - Hong Kong Secondary Schools Query System)

> 由 **萬鶴書院 (Wanhe Academy)** 開發和維護

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 📖 項目簡介

香港中學查詢系統是一個現代化的網頁應用，提供香港479所中學的詳細信息查詢和篩選功能。用戶可以基於多種條件（如地區、種類、授課語言、性別、宗教等）快速找到符合需求的學校。

### ✨ 主要特點

- 🔍 **多維度篩選** - 支持按種類、地區、組別、授課語言、性別、宗教等條件篩選
- 📱 **響應式設計** - 完美適配桌面、平板和移動設備
- 🎨 **現代化界面** - 簡潔美觀的用戶界面，優秀的用戶體驗
- ⚡ **實時搜索** - 輸入學校名稱即時顯示結果
- 📊 **數據完整** - 包含479所香港中學的完整信息
- 🔄 **雙視圖模式** - 支持網格視圖和列表視圖切換

## 🎯 數據字段

系統包含以下學校信息：

| 字段 | 說明 |
|------|------|
| 學校名稱 | 學校的中文名稱 |
| 學校代碼 | 學校的唯一識別碼 |
| 種類 | 官立/資助/直資/私立 |
| 所屬地區 | 學校所在的香港地區 |
| 組別 | 學校組別分類 |
| 授課語言 | 中文/英文/雙語 |
| 學生性別 | 男校/女校/男女 |
| 宗教 | 學校的宗教背景 |
| 學校網址 | 官方網站鏈接 |
| 聯繫電話 | 學校聯繫電話 |

## 🚀 快速開始

### 在線訪問

訪問部署版本：[待添加部署鏈接]

### 本地運行

1. **克隆倉庫**
   ```bash
   git clone https://github.com/ankerwong/vanhok.git
   cd vanhok
   ```

2. **啟動本地服務器**

   使用 Python：
   ```bash
   python -m http.server 8000
   ```

   或使用 Node.js：
   ```bash
   npx http-server -p 8000
   ```

3. **訪問應用**
   
   打開瀏覽器訪問：`http://localhost:8000`

## 📁 項目結構

```
hkss/
├── index.html              # 主頁面
├── styles.css              # 樣式表
├── app.js                  # JavaScript 邏輯
├── schools_data.json       # 學校數據（JSON 格式）
├── hong_kong_schools.xlsx  # 原始數據（Excel 格式）
└── README.md              # 項目文檔
```

## 🛠️ 技術棧

- **前端框架**：原生 HTML5 + CSS3 + JavaScript (ES6+)
- **樣式**：CSS Grid + Flexbox + 自定義屬性
- **字體**：Noto Sans TC (Google Fonts)
- **數據格式**：JSON
- **版本控制**：Git

## 💡 使用方法

### 篩選學校

1. 使用頂部的篩選區域選擇條件
2. 可以同時使用多個篩選條件
3. 在搜索框中輸入學校名稱進行快速搜索
4. 點擊「重置篩選」按鈕清除所有條件

### 查看學校信息

- 每個學校卡片顯示完整的學校信息
- 點擊「訪問網站」按鈕打開學校官網
- 點擊電話號碼直接撥打（移動設備）

### 切換視圖

- 使用右上角的視圖切換按鈕
- 網格視圖：適合瀏覽多所學校
- 列表視圖：適合詳細對比

## 📊 數據來源

數據來源於香港教育相關公開資料，包含479所中學的詳細信息。數據最後更新時間：2025年10月

## 🤝 貢獻

歡迎貢獻代碼、報告問題或提出建議！

1. Fork 本倉庫
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📝 開發計劃

- [ ] 添加學校對比功能
- [ ] 支持數據導出（PDF/Excel）
- [ ] 添加地圖視圖顯示學校位置
- [ ] 支持用戶收藏功能
- [ ] 添加學校評價和評論系統
- [ ] 多語言支持（繁體中文/簡體中文/英文）

## 📄 許可證

本項目採用 MIT 許可證 - 詳見 [LICENSE](LICENSE) 文件

## 👥 關於萬鶴書院

**萬鶴書院 (Wanhe Academy)** 致力於教育資源的整合與分享，為學生、家長和教育工作者提供優質的教育信息服務。

## 📧 聯繫方式

- **GitHub**: [@ankerwong](https://github.com/ankerwong)
- **項目倉庫**: [vanhok](https://github.com/ankerwong/vanhok)

## 🙏 致謝

感謝所有為香港教育事業做出貢獻的機構和個人。

---

**© 2025 萬鶴書院 Wanhe Academy. 版權所有.**

Made with ❤️ in Hong Kong
