# 🎯 Vanhok IELTS - 专业雅思模拟考试平台

基于 **Next.js + Supabase** 架构的现代化雅思测试平台，提供完整的听力、阅读、写作、口语四项测试功能。

## 🚀 项目概述

这是一个完整的IELTS模拟考试系统，采用静态网站生成器架构，结合Supabase云数据库，为学生提供真实的考试体验和智能评分功能。

## ✨ 核心功能

### 🎧 听力测试
- ✅ **音频单次播放限制** - 模拟真实考试环境
- ✅ **多种题型支持** - 填空题、选择题、匹配题
- ✅ **实时答案保存** - 防止数据丢失
- ✅ **自动评分系统** - IELTS官方评分标准

### 📖 阅读理解
- ✅ **学术文章渲染** - 专业排版显示
- ✅ **完整题型覆盖** - True/False/Not Given, 选择题, 填空题
- ✅ **智能评分算法** - 考虑答案变体和容错
- ✅ **阅读进度跟踪** - 实时显示完成状态

### ✍️ 写作测试
- ✅ **双任务模式** - Task 1 图表描述 + Task 2 议论文
- ✅ **实时字数统计** - 达到最低要求自动变色提示
- ✅ **任务切换功能** - 便捷的Tab切换，支持快捷键
- ✅ **智能评分预估** - 基于词汇、语法、结构的综合评估

### 🔐 用户认证系统
- ✅ **安全注册登录** - Supabase Auth集成
- ✅ **用户资料管理** - 个人信息和学习记录
- ✅ **会话状态管理** - 跨页面状态保持
- ✅ **数据隐私保护** - 行级安全策略（RLS）

### 📊 进度追踪
- ✅ **历史成绩记录** - 完整的测试历史
- ✅ **最佳成绩统计** - 各单项和总分最高分
- ✅ **学习数据分析** - 答题准确率、学习天数统计
- ✅ **成绩趋势图表** - 可视化进步轨迹

## 🏗️ 技术架构

### 前端技术栈
```
HTML5 + CSS3 + Vanilla JavaScript
├── 响应式设计 (Mobile-First)
├── 模块化JS架构
├── 现代CSS Grid/Flexbox
└── Progressive Enhancement
```

### 后端服务
```
Supabase (Backend as a Service)
├── PostgreSQL 数据库
├── 实时认证服务
├── 行级安全策略 (RLS)
└── 云存储服务
```

### 部署架构
```
GitHub Pages (静态托管)
├── 静态文件服务
├── 自定义域名支持
├── HTTPS 自动配置
└── CDN 全球加速
```

## 📁 项目结构

```
ielts/
├── index.html          # 主页面 - 应用入口
├── styles.css          # 样式文件 - 完整UI设计
├── config.js           # 配置文件 - Supabase设置
├── auth.js            # 认证模块 - 用户管理
├── app.js             # 主应用 - 核心逻辑
├── listening.js       # 听力模块 - 音频测试
├── reading.js         # 阅读模块 - 文章测试  
├── writing.js         # 写作模块 - 作文测试
├── database.sql       # 数据库架构 - 表结构定义
└── README.md          # 项目文档
```

## 🎯 部署步骤

### 1. Supabase 数据库设置

1. **创建 Supabase 项目**
   - 访问 [supabase.com](https://supabase.com)
   - 创建新项目并获取 API 密钥

2. **执行数据库初始化**
   ```sql
   -- 在 Supabase SQL Editor 中执行
   -- 复制 database.sql 中的所有内容并运行
   ```

3. **配置存储桶**
   ```sql
   -- 创建音频文件存储桶
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('ielts-audio', 'ielts-audio', true);
   
   -- 创建图片存储桶
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('ielts-images', 'ielts-images', true);
   ```

### 2. GitHub Pages 配置

1. **上传文件到 GitHub 仓库**
   ```bash
   # 确保所有文件在 /ielts 目录下
   git add ielts/
   git commit -m "Deploy IELTS platform"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - 选择 Deploy from a branch
   - 选择 main 分支 / root 目录

3. **访问测试**
   - 网站地址: `https://ankerwong.github.io/vanhok/ielts`
   - 测试用户注册和登录功能

## 🎮 使用指南

### 用户注册流程
1. 访问网站，点击右上角"登录"按钮
2. 在弹窗中选择"注册"
3. 填写邮箱、密码和姓名
4. 系统自动创建用户档案

### 测试流程
1. **完整模拟考试**
   - 点击"开始模拟考试" → 选择"完整模拟考试"
   - 按顺序完成：听力(30分钟) → 阅读(60分钟) → 写作(60分钟)
   - 系统自动计算总分

2. **单项练习**
   - 选择具体模块（听力/阅读/写作）
   - 完成测试后查看详细分析
   - 查看正确答案和解析

### 成绩查看
1. 点击导航栏"成绩查看"
2. 查看最新成绩和历史记录
3. 分析各项能力发展趋势

## 🔧 开发指南

### 本地开发环境
```bash
# 1. 克隆仓库
git clone https://github.com/ankerwong/vanhok.git
cd vanhok/ielts

# 2. 启动本地服务器
python -m http.server 8000
# 或使用 Node.js
npx serve .

# 3. 访问 http://localhost:8000
```

### 自定义配置
```javascript
// config.js 中修改 Supabase 配置
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',
    anon_key: 'YOUR_SUPABASE_ANON_KEY'
};
```

### 添加新题目
```javascript
// 在相应的 JavaScript 文件中添加样题
const newQuestion = {
    id: 'Q001',
    section: 1,
    question_type: 'fill_blank',
    question_text: '题目内容...',
    correct_answer: '正确答案'
};
```

## 📊 数据库架构

### 核心表结构
- **users** - 用户信息和学习统计
- **test_sessions** - 测试会话和成绩记录
- **listening_questions** - 听力题库
- **reading_questions** - 阅读题库  
- **writing_questions** - 写作题库
- **user_answers** - 用户答题记录
- **ai_grading_results** - AI评分结果

### 安全策略
- 行级安全 (RLS) 确保数据隐私
- JWT 认证保护 API 访问
- 用户只能访问自己的数据

## 🚀 性能优化

### 前端优化
- 模块化加载减少初始包大小
- CSS 压缩和合并
- 图片懒加载和优化
- Service Worker 缓存策略

### 数据库优化  
- 关键字段创建索引
- 查询结果缓存
- 连接池管理
- 定期数据清理

## 🔮 未来规划

### 短期目标
- [ ] 口语测试模块（录音功能）
- [ ] 更多真题内容集成
- [ ] 移动端 APP 版本
- [ ] 离线模式支持

### 长期目标  
- [ ] AI 智能评分升级
- [ ] 个性化学习路径
- [ ] 实时在线考试
- [ ] 多语言界面支持

## 📞 技术支持

- **项目仓库**: https://github.com/ankerwong/vanhok
- **在线演示**: https://ankerwong.github.io/vanhok/ielts
- **技术文档**: 查看本 README.md
- **问题反馈**: 通过 GitHub Issues

## 📄 开源协议

本项目采用 MIT 协议开源，欢迎贡献代码和建议。

---

**🎯 Built with ❤️ by Vanhok Education Technology Team**

> 专业的IELTS备考平台，助力每一个学习者实现语言学习目标！