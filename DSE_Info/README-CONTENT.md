# 万鹤书院 HKDSE 资讯中心 - 内容更新指南

## 📋 目录

1. [系统概述](#系统概述)
2. [快速开始](#快速开始)
3. [添加新资讯](#添加新资讯)
4. [资讯分类说明](#资讯分类说明)
5. [图片规范](#图片规范)
6. [内容编写规范](#内容编写规范)
7. [SEO优化建议](#seo优化建议)
8. [常见问题](#常见问题)

---

## 系统概述

万鹤书院HKDSE资讯中心采用**轻量级内容管理系统**，所有资讯数据统一存储在 `js/articles.js` 文件中，无需数据库即可管理内容。

### 系统特点

- ✅ **简单易用** - 无需编程基础，复制模板即可添加内容
- ✅ **响应式设计** - 自动适配手机、平板、电脑
- ✅ **SEO友好** - 支持搜索引擎优化
- ✅ **分类管理** - 8大分类清晰明了
- ✅ **标签系统** - 支持多标签筛选
- ✅ **搜索功能** - 全文搜索快速定位

### 文件结构

```
project/
├── index.html                    # 资讯首页
├── articles/                     # 资讯详情文件夹
│   ├── article-template.html    # 文章模板（必读）
│   ├── chinese-study-tips.html  # 示例：中文科攻略
│   └── ...                      # 其他文章
├── css/
│   └── style.css                # 样式文件
├── js/
│   ├── articles.js              # 资讯数据库（核心文件）
│   ├── news.js                  # 资讯展示功能
│   └── main.js                  # 通用功能
├── images/                       # 图片文件夹（推荐创建）
│   ├── thumbnails/              # 缩略图
│   └── content/                 # 文章内图片
└── README-CONTENT.md            # 本文档
```

---

## 快速开始

### 方法一：添加新资讯（推荐新手）

**步骤1：在 `js/articles.js` 中添加数据**

1. 打开 `js/articles.js` 文件
2. 找到 `articlesData` 数组
3. 复制以下模板，粘贴到数组末尾（注意逗号）

```javascript
{
    id: 501,  // 使用未占用的ID（建议从500开始）
    title: "您的文章标题",
    category: "备考攻略",  // 从8个分类中选择
    date: "2026-02-15",    // 发布日期 YYYY-MM-DD
    thumbnail: "https://images.unsplash.com/photo-xxxxx?w=800&h=450&fit=crop",
    summary: "文章摘要，2-3句话概括文章内容，建议100-150字...",
    content: "articles/your-article-name.html",  // 详情页路径
    featured: false,       // true=精选（显示在轮播图）
    views: 0,             // 初始浏览量
    tags: ["标签1", "标签2", "标签3"],  // 3-5个标签
    author: "作者名称",
    status: "published"   // published=发布, draft=草稿（不显示）
}
```

**步骤2：创建详情页**

1. 复制 `articles/article-template.html`
2. 重命名为 `articles/your-article-name.html`
3. 修改文章内容（详见下文）

**步骤3：保存并测试**

1. 保存所有文件
2. 在浏览器中打开 `index.html`
3. 检查新资讯是否正确显示

---

## 添加新资讯

### 完整示例

假设我们要添加一篇"物理科实战攻略"的文章：

#### 1. 在 `js/articles.js` 添加数据

```javascript
{
    id: 501,
    title: "物理科实战攻略：实验题与计算题制胜法宝",
    category: "备考攻略",
    date: "2026-02-15",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop",
    summary: "物理科备考指南：力学、电学、光学、热学各单元要点、实验设计与分析、计算题步骤规范、常见易错点总结，助你在DSE物理科取得优异成绩！",
    content: "articles/physics-study-tips.html",
    featured: false,
    views: 0,
    tags: ["物理科", "实验题", "计算题", "备考攻略", "DSE"],
    author: "物理科主任",
    status: "published"
}
```

#### 2. 创建详情页 `articles/physics-study-tips.html`

```html
<!DOCTYPE html>
<html lang="zh-HK">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>物理科实战攻略 - 万鹤书院 HKDSE 资讯中心</title>
    <meta name="description" content="物理科备考指南：力学、电学、光学、热学各单元要点...">
    <meta name="keywords" content="物理科, 实验题, 计算题, DSE, HKDSE">
    <link rel="stylesheet" href="../css/style.css">
    <!-- 其他head内容参考模板 -->
</head>
<body>
    <!-- 导航栏 - 从模板复制 -->
    <nav class="navbar">...</nav>

    <main class="container">
        <article class="article-detail">
            <header class="article-header">
                <div class="article-detail-category">
                    <i class="fas fa-lightbulb"></i> 备考攻略
                </div>
                <h1 class="article-detail-title">
                    物理科实战攻略：实验题与计算题制胜法宝
                </h1>
                <div class="article-detail-meta">
                    <span><i class="fas fa-calendar"></i> 2026-02-15</span>
                    <span><i class="fas fa-user"></i> 物理科主任</span>
                    <span><i class="fas fa-eye"></i> 0 次阅读</span>
                </div>
            </header>

            <div class="article-body">
                <h2>一、力学单元要点</h2>
                <p>力学是物理科的基础...</p>
                
                <h3>1.1 牛顿运动定律</h3>
                <p>详细内容...</p>
                
                <!-- 更多章节 -->
            </div>

            <footer class="article-footer">
                <div class="article-tags-section">
                    <h4>相关标签</h4>
                    <div class="featured-tags">
                        <span class="tag">#物理科</span>
                        <span class="tag">#实验题</span>
                        <span class="tag">#计算题</span>
                    </div>
                </div>
            </footer>
        </article>
    </main>

    <!-- 页脚 - 从模板复制 -->
    <footer class="footer">...</footer>
</body>
</html>
```

---

## 资讯分类说明

系统预设**8大分类**，每个分类有独特的颜色和图标：

| 分类ID | 分类名称 | 颜色 | 图标 | 适用内容 |
|--------|---------|------|------|---------|
| 考试资讯 | 考试资讯 | #7B5ABE | 📋 | 考试时间、报名信息、考场安排等 |
| 升学指南 | 升学指南 | #4A90E2 | 🎓 | 大学申请、JUPAS、海外升学等 |
| 统计数据 | 统计数据 | #E94B3C | 📊 | 成绩统计、报考人数、录取率等 |
| 选科建议 | 选科建议 | #F39C12 | 📚 | 选科指导、科目介绍、组合建议 |
| 备考攻略 | 备考攻略 | #27AE60 | 💡 | 学习方法、考试技巧、科目攻略 |
| 最新政策 | 最新政策 | #E67E22 | 📢 | 考试改革、政策变动、官方通知 |
| 经验分享 | 经验分享 | #9B59B6 | ✨ | 状元经验、逆袭故事、学习心得 |

### 如何选择分类？

- **考试时间表、考场安排** → 考试资讯
- **如何申请港大、JUPAS改选** → 升学指南
- **2025年成绩分析** → 统计数据
- **物理vs化学如何选** → 选科建议
- **英文科高分技巧** → 备考攻略
- **DSE 2027改革** → 最新政策
- **7科5**状元访谈** → 经验分享

---

## 图片规范

### 缩略图（Thumbnail）

**用途**：资讯列表、卡片展示

**尺寸要求**：
- 推荐比例：16:9
- 推荐尺寸：800×450 像素
- 最小尺寸：640×360 像素
- 文件格式：JPG / PNG / WebP
- 文件大小：< 200KB

**图片来源**：

1. **免费图库（推荐）**
   - [Unsplash](https://unsplash.com/) - 高质量免费图片
   - [Pexels](https://www.pexels.com/) - 商用免费
   - [Pixabay](https://pixabay.com/) - 多语言支持

2. **使用方法**
   ```javascript
   // 方法1：直接使用Unsplash链接（推荐）
   thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop"
   
   // 方法2：上传到项目文件夹
   thumbnail: "images/thumbnails/physics-study-2026.jpg"
   ```

### 文章内图片

**用途**：文章正文配图

**规范**：
- 宽度：600-900 像素
- 格式：JPG / PNG
- 大小：< 300KB
- 存放位置：`images/content/` 文件夹

**插入方法**：
```html
<img src="../images/content/physics-formula.jpg" alt="物理公式示意图">
```

### 图片命名规范

```
# 缩略图命名
physics-study-tips.jpg         # 物理科攻略
english-speaking-2026.jpg      # 英文口试
jupas-admission-2025.jpg       # JUPAS录取

# 内容图命名
physics-formula-1.jpg          # 物理公式1
math-graph-example.jpg         # 数学图表示例
```

---

## 内容编写规范

### 文章标题

**格式要求**：
- 长度：10-30 字符
- 关键词前置
- 避免标点符号（除了冒号、破折号）
- 吸引眼球但不夸张

**优秀示例**：
- ✅ "2026年HKDSE考试时间表正式公布"
- ✅ "物理科实战攻略：实验题与计算题制胜法宝"
- ✅ "香港八大院校升学录取全攻略"

**不佳示例**：
- ❌ "重要！！！必看！！！"（过度夸张）
- ❌ "一些考试信息"（太笼统）
- ❌ "关于HKDSE的一些事情"（不具体）

### 文章摘要

**格式要求**：
- 长度：80-150 字符
- 2-3句话概括全文
- 包含关键信息
- 自然流畅，避免堆砌关键词

**示例**：
```
物理科备考指南：力学、电学、光学、热学各单元要点、实验设计与分析、计算题步骤规范、常见易错点总结，助你在DSE物理科取得优异成绩！
```

### 正文结构

**推荐框架**：

```
一、引言/概述（1-2段）
   - 背景介绍
   - 文章目的

二、主体内容（3-6个章节）
   - 2.1 小节标题
   - 2.2 小节标题
   - ...

三、实用建议/总结
   - 行动步骤
   - 注意事项

四、总结
   - 要点回顾
   - 鼓励语
```

**排版要点**：
- 段落不超过5行
- 善用列表（ul / ol）
- 重要内容加粗
- 适当使用引用框（blockquote）

### 标签设置

**数量**：3-5个标签

**选择原则**：
- 主标签：科目名称（如"物理科"）
- 内容标签：文章类型（如"备考攻略"）
- 具体标签：细分话题（如"实验题"）
- 时间标签：年份（如"DSE2026"）

**示例**：
```javascript
tags: ["物理科", "备考攻略", "实验题", "计算题", "DSE2026"]
```

---

## SEO优化建议

### 页面标题（Title）

**格式**：`文章标题 - 万鹤书院 HKDSE 资讯中心`

**示例**：
```html
<title>物理科实战攻略：实验题与计算题制胜法宝 - 万鹤书院 HKDSE 资讯中心</title>
```

### Meta描述（Description）

**要求**：
- 长度：120-160 字符
- 包含关键词
- 吸引点击

**示例**：
```html
<meta name="description" content="物理科备考指南：力学、电学、光学、热学各单元要点、实验设计与分析、计算题步骤规范，助你在DSE物理科取得优异成绩！">
```

### 关键词（Keywords）

**示例**：
```html
<meta name="keywords" content="物理科, 实验题, 计算题, DSE, HKDSE, 备考攻略, 万鹤书院">
```

### 内容优化

- ✅ 关键词自然出现在标题、摘要、正文
- ✅ 使用语义化HTML标签（h2, h3, p, ul等）
- ✅ 图片添加alt属性描述
- ✅ 内部链接到相关文章
- ✅ 外部链接到权威来源（如考评局官网）

---

## 常见问题

### Q1: 如何设置精选资讯（轮播图）？

**答**：在 `js/articles.js` 中设置 `featured: true`

```javascript
{
    id: 1,
    title: "2026年HKDSE考试时间表正式公布",
    featured: true,  // 👈 设为true
    // ...
}
```

**注意**：
- 最多显示5篇精选资讯
- 按日期倒序排列
- 需要高质量缩略图

### Q2: 如何隐藏草稿（未完成的文章）？

**答**：设置 `status: "draft"`

```javascript
{
    id: 102,
    title: "尚未完成的文章",
    status: "draft",  // 👈 草稿状态，前端不显示
    // ...
}
```

发布时改为：
```javascript
status: "published"  // 或直接删除此行（默认已发布）
```

### Q3: 如何修改现有文章？

**步骤**：
1. 在 `js/articles.js` 找到对应文章（通过ID或标题）
2. 修改需要更新的字段（标题、摘要、标签等）
3. 如需修改正文，编辑对应的HTML文件（如 `articles/physics-study-tips.html`）
4. 保存文件，刷新浏览器查看效果

### Q4: 如何删除文章？

**方法1：完全删除**
1. 在 `js/articles.js` 中删除对应的文章对象
2. 删除对应的HTML文件（如 `articles/xxx.html`）

**方法2：隐藏文章（推荐）**
1. 在 `js/articles.js` 中设置 `status: "draft"`
2. 文章不会显示，但数据保留，可随时恢复

### Q5: 如何批量添加文章？

**建议流程**：
1. 先在Excel/Google Sheets整理所有文章信息（标题、摘要、标签等）
2. 一次性在 `js/articles.js` 添加所有数据
3. 逐篇创建详情页HTML文件
4. 可以先设置 `status: "draft"`，完成后再改为 `published`

### Q6: 图片加载慢怎么办？

**解决方案**：

1. **压缩图片**
   - 使用在线工具：[TinyPNG](https://tinypng.com/)
   - 压缩至 < 200KB

2. **使用CDN**
   - Unsplash自带CDN（推荐）
   - 或使用图床服务

3. **懒加载**
   - 系统已内置懒加载功能，无需额外设置

### Q7: 如何添加新的分类？

**步骤**：

1. 在 `js/articles.js` 的 `categories` 数组中添加：

```javascript
const categories = [
    // 现有分类...
    { 
        id: '新分类', 
        name: '新分类', 
        color: '#FF5733',  // 选择颜色
        icon: '🔥'         // 选择图标
    }
];
```

2. 在 `css/style.css` 中添加对应颜色样式（可选）

### Q8: 如何统计文章浏览量？

**当前实现**：
- 浏览量存储在 `articles.js` 的 `views` 字段
- 需要手动更新（静态网站限制）

**未来升级**：
- 集成第三方统计服务（如Google Analytics）
- 或升级为动态网站（需后端支持）

### Q9: 手机端显示异常？

**检查清单**：
- ✅ 图片尺寸是否过大？
- ✅ 文章标题是否过长？
- ✅ 表格是否有横向滚动？
- ✅ CSS是否正确加载？

**调试方法**：
1. Chrome浏览器按F12打开开发者工具
2. 点击手机图标切换到移动视图
3. 调整屏幕尺寸测试响应式效果

### Q10: 如何备份内容？

**重要文件**：
- `js/articles.js` - 所有文章数据
- `articles/` 文件夹 - 所有详情页
- `images/` 文件夹 - 所有图片

**备份建议**：
- 定期复制整个项目文件夹
- 或使用Git版本控制
- 云盘同步（如Google Drive、Dropbox）

---

## 联系支持

如遇到技术问题或需要帮助，请联系：

- **邮箱**：tech@wanhe-academy.hk
- **电话**：+852 1234 5678
- **WhatsApp**：+852 9876 5432

---

## 版本历史

- **v1.0.0** (2026-01-24) - 初始版本
  - 资讯管理系统上线
  - 8大分类，20+预留文章模板
  - 轮播图、筛选、搜索功能

---

**祝您内容管理顺利！** 🎉

万鹤书院技术团队
