# Vanhok IELTS Platform - Deployment Guide

## GitHub Pages 部署指南

### 🌐 访问链接

- **主网站**: https://ankerwong.github.io/vanhok/
- **IELTS平台**: https://ankerwong.github.io/vanhok/ielts/

### 🔧 部署状态

✅ **GitHub Pages**: 已配置并部署成功  
✅ **Jekyll配置**: 已优化，排除后端文件  
✅ **静态资源**: 前端文件已正确部署到 /ielts/ 目录  
✅ **路由配置**: /ielts 路径已可用  
🔧 **部署修复**: 已复制frontend文件到ielts根目录解决404问题

### 📋 部署问题修复记录

#### 问题1: Jekyll构建失败 - node_modules冲突
**症状**: GitHub Pages尝试构建整个仓库，包括node_modules文件夹  
**解决方案**:
- 添加 `.gitignore` 排除 node_modules
- 配置 `_config.yml` 排除后端文件
- 移除 node_modules 和数据库文件的git跟踪

#### 问题2: GitHub Actions权限不足
**症状**: GitHub App无法创建workflow文件  
**解决方案**:
- 移除自定义GitHub Actions workflow
- 使用GitHub Pages默认Jekyll构建

#### 问题3: 认证失败
**症状**: 推送代码时认证失败  
**解决方案**:
- 重新配置GitHub凭据
- 使用合适的访问令牌

#### 问题4: /ielts/ 路径404错误
**症状**: https://ankerwong.github.io/vanhok/ielts/ 显示404  
**原因**: GitHub Pages需要直接访问index.html文件  
**解决方案**:
- 复制frontend文件到ielts/根目录
- 更新Jekyll配置包含静态资源
- 修改JavaScript支持GitHub Pages环境

### 🛠️ 配置文件说明

#### `.nojekyll`
空文件，告诉GitHub Pages跳过Jekyll处理（虽然我们仍使用Jekyll）

#### `_config.yml`
```yaml
title: Vanhok Education Technology
description: Professional education services and IELTS preparation platform
url: https://ankerwong.github.io
baseurl: /vanhok

exclude:
  - node_modules/
  - ielts/backend/
  - ielts/logs/
  - ielts/ecosystem.config.js
  - "*.log"
  - "*.lock"
  - package*.json
```

#### `.gitignore`
排除构建文件、依赖包、日志文件等

### 🚀 本地开发服务器

IELTS平台的完整功能需要后端服务器支持：

```bash
# 进入后端目录
cd ielts/backend

# 安装依赖
npm install

# 启动服务器
npm start

# 或使用PM2（推荐生产环境）
npm install pm2
pm2 start ecosystem.config.js
```

**本地访问**: http://localhost:3001

### 📱 功能对比

| 功能 | GitHub Pages | 本地服务器 |
|------|-------------|-----------|
| 静态前端 | ✅ 完全支持 | ✅ 完全支持 |
| 考试界面 | ✅ 基本界面 | ✅ 完整功能 |
| 题库数据 | ❌ 静态展示 | ✅ 动态加载 |
| AI批改 | ❌ 不支持 | ✅ 完全支持 |
| 成绩保存 | ❌ 不支持 | ✅ 数据库存储 |
| 实时评分 | ❌ 不支持 | ✅ 完全支持 |

### 🎯 生产部署建议

对于完整的IELTS平台功能，建议部署到支持Node.js的平台：

#### 推荐平台
1. **Heroku** - 免费层支持Node.js
2. **Vercel** - 优秀的前端+API支持
3. **Railway** - 现代化的部署平台
4. **DigitalOcean App Platform** - 简单的容器部署
5. **AWS Elastic Beanstalk** - 企业级部署

#### 环境变量配置
```bash
NODE_ENV=production
PORT=3001
```

#### PM2生产配置
```javascript
{
  name: 'vanhok-ielts-server',
  script: './backend/server.js',
  instances: 'max',
  exec_mode: 'cluster',
  autorestart: true,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'production',
    PORT: 3001
  }
}
```

### 📊 性能监控

生产环境建议添加：
- **应用监控**: PM2 Plus或New Relic
- **错误追踪**: Sentry
- **性能分析**: Google Analytics
- **健康检查**: Uptime Robot

### 🔒 安全考虑

- 配置HTTPS（Let's Encrypt）
- 设置CORS政策
- 添加速率限制
- 定期更新依赖包
- 备份数据库

### 📞 技术支持

如遇部署问题，请检查：
1. GitHub Pages构建状态
2. Jekyll配置文件
3. 静态资源路径
4. 浏览器开发者工具控制台

---

**更新日期**: 2024年9月14日  
**维护者**: Vanhok开发团队