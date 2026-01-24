# 万鹤书院 HKDSE 资讯中心

<div align="center">
  <img src="https://www.genspark.ai/api/files/s/OoOh1qCh" alt="万鹤书院" width="200">
  <h3>专注香港HKDSE课程教学的专业资讯平台</h3>
  <p>
    <strong>最新考试资讯</strong> · <strong>升学指南</strong> · <strong>备考攻略</strong> · <strong>选科建议</strong>
  </p>
</div>

---

## 📋 项目简介

万鹤书院HKDSE资讯中心是一个专业的DSE考试资讯发布平台，采用WordPress风格的内容管理系统，为学生、家长提供最新的考试资讯、升学指南、备考攻略等内容。

### ✨ 主要特色

- 🎯 **资讯中心首页** - WordPress风格的博客布局，精选轮播+列表展示
- 📊 **8大内容分类** - 考试资讯、升学指南、统计数据、选科建议、备考攻略、最新政策、经验分享
- 🔍 **强大搜索功能** - 支持标题、摘要、标签全文搜索
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- 🎨 **品牌配色** - 紫色(#5B3A9E) + 金黄色(#F5B418)
- 🚀 **轻量级CMS** - 无需数据库，纯前端内容管理
- 📝 **20+预留模板** - 涵盖各类备考、升学、政策资讯

---

## 🗂️ 项目结构

```
project/
├── index.html                    # 资讯首页（WordPress风格）
├── timetable.html               # 2026年考试时间表
├── statistics.html              # 2025年统计数据
├── admission.html               # 香港八大升学录取
├── subjects.html                # HKDSE选科指南
│
├── articles/                    # 资讯详情文件夹
│   ├── article-template.html   # 文章模板（必读）
│   └── ...                     # 其他文章
│
├── css/
│   └── style.css               # 全局样式（21KB）
│
├── js/
│   ├── articles.js             # 资讯数据库（核心）- 15KB
│   ├── news.js                 # 资讯展示功能 - 14KB
│   ├── main.js                 # 通用功能 - 4KB
│   ├── statistics.js           # 统计图表
│   ├── admission.js            # JUPAS计算器
│   └── subjects.js             # 选科交互
│
├── images/                     # 图片文件夹（推荐创建）
│   ├── thumbnails/            # 缩略图
│   └── content/               # 文章内图片
│
├── README.md                   # 项目说明（本文件）
└── README-CONTENT.md          # 内容更新指南（⭐重要）
```

---

## 🎯 核心功能

### 1️⃣ 资讯首页（index.html）

**WordPress风格的内容中心：**

- **顶部轮播图** - 5张精选资讯自动播放，带左右切换
- **分类筛选栏** - 8大分类标签，点击筛选
- **精选资讯区** - 卡片式展示，3-6篇重要资讯
- **最新资讯列表** - 列表式展示，左图右文，支持分页
- **侧边栏**
  - 搜索框
  - 热门资讯 Top 5
  - 资讯分类（带数量统计）
  - 快速链接
  - 热门标签云

### 2️⃣ 考试时间表（timetable.html）

- 2026年DSE完整时间表（4月8日 - 5月6日）
- 核心科目 + 20+选修科目
- 按学科筛选（理科/商科/文科）
- 重要日期提醒

### 3️⃣ 统计数据（statistics.html）

- 2025年最新统计数据
  - 报考人数：55,500人（↑10%）
  - 日校考生：42,795人
  - 出席率：97%
- 交互式图表（Chart.js）
  - 选修科目分布饼图
  - 成绩等级柱状图
  - 达标率趋势图

### 4️⃣ 升学录取（admission.html）

- 香港八大院校入学要求
  - 332A33 vs 332A22
- JUPAS计分方法对比
- **互动式分数计算器** 🧮
- 各专业参考分数线

### 5️⃣ 选科指南（subjects.html）

- 核心科目详解（中文、英文、数学、公社科）
- 16个选修科目介绍
- 按学科分类查看
- 不同升学目标的选科组合
- 评分制度说明（5**-U级别）

---

## 📝 内容管理

### 当前已有内容（5篇）

1. **2026年HKDSE考试时间表正式公布** - 考试资讯
2. **2025年HKDSE统计数据深度分析** - 统计数据
3. **香港八大院校升学录取全攻略** - 升学指南
4. **HKDSE选科完全指南** - 选科建议
5. **HKDSE考试制度全面解析** - 考试资讯

### 预留内容模板（15+篇草稿）

**备考攻略类**
- 中文科备考策略
- 英文科提分技巧
- 数学必修部分攻略
- 物理科实战攻略
- 化学科精通攻略

**最新政策类**
- 2027年DSE改革政策
- 公民与社会发展科指南
- 校本评核（SBA）全攻略

**升学资讯类**
- DSE成绩申请内地大学
- 海外升学全攻略
- JUPAS改选策略
- 大学面试技巧

**经验分享类**
- 7科5**状元经验
- 逆袭之路真实案例
- 高效时间管理

### 📚 如何添加新内容？

**详见 [README-CONTENT.md](README-CONTENT.md) - 完整内容更新指南**

**快速步骤：**

1. 在 `js/articles.js` 添加文章数据
2. 复制 `articles/article-template.html` 创建详情页
3. 修改标题、正文、标签等内容
4. 保存文件，刷新浏览器查看

---

## 🎨 技术栈

- **HTML5** - 语义化标签
- **CSS3** - Flexbox + Grid响应式布局
- **JavaScript (ES6+)** - 原生JS，无框架依赖
- **Chart.js** - 数据可视化图表
- **Font Awesome** - 图标库

---

## 🚀 部署说明

### 本地运行

1. 直接双击打开 `index.html`
2. 或使用本地服务器（推荐）：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```
3. 浏览器访问 `http://localhost:8000`

### 在线部署

**推荐平台：**

- **GitHub Pages** (免费)
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin <your-repo-url>
  git push -u origin main
  ```
  在仓库设置中启用GitHub Pages

- **Netlify** (免费)
  - 拖拽项目文件夹上传
  - 或连接GitHub仓库自动部署

- **Vercel** (免费)
  - 支持Git集成
  - 自动HTTPS + CDN

---

## 📊 数据来源

所有数据均来自官方权威渠道：

- **香港考试及评核局 (HKEAA)** - 考试时间表、统计数据
- **各大学官网** - 入学要求、录取分数
- **教育局** - 课程大纲、政策文件

---

## 🎯 后续扩展计划

### 功能增强
- [ ] 用户评论系统（第三方插件）
- [ ] 文章收藏功能（本地存储）
- [ ] 微信分享优化
- [ ] 浏览量实时统计（需后端）

### 内容扩充
- [ ] 完成20+预留文章模板
- [ ] 添加视频教程栏目
- [ ] 历年真题下载
- [ ] 线上模拟考试

### 技术优化
- [ ] Service Worker离线缓存
- [ ] 图片懒加载优化
- [ ] CDN加速
- [ ] SEO进一步优化

---

## 📞 联系我们

**万鹤书院**

- 📧 邮箱：info@wanhe-academy.hk
- ☎️ 电话：+852 1234 5678
- 💬 WhatsApp：+852 9876 5432
- 📍 地址：香港九龙旺角XX大厦

---

## 📄 开源协议

本项目采用 MIT License 开源协议。

---

## 🙏 致谢

- 考试数据：香港考试及评核局 (HKEAA)
- 图片素材：Unsplash, Pexels
- 图标库：Font Awesome
- 图表库：Chart.js

---

<div align="center">
  <p><strong>万鹤书院 · 助力你的DSE之路</strong></p>
  <p>© 2026 万鹤书院. 保留所有权利.</p>
</div>
