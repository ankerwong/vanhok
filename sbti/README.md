# SBTI 人格测试网站

> **Silly Big Personality Test** — MBTI已经过时，SBTI来了！

## 项目简介

本项目是基于2026年4月爆火的网络流行恶搞人格测试 **SBTI**（Silly Big Personality Test）制作的互动测试网站。SBTI原作者为B站UP主 @蛆肉儿串儿，以MBTI为框架但结果全是"死者"、"愤世者"、"送钱者"等抽象自嘲标签，因精准击中当代年轻人内心而迅速登上微博热搜。

---

## ✅ 已完成功能

### 页面结构
- **Hero首页**：动态渐变背景、醒目标语、数据展示、开始测试按钮
- **介绍区域**：SBTI起源、核心玩法、爆火原因、传播现象的四卡片介绍
- **MBTI vs SBTI 对比**：直观展示两种测试的风格差异
- **测试区域**：20道题目、进度条、动态选项、凭直觉提示
- **结果页面**：人格代码+名称+emoji+描述+系统备注+8维度雷达图
- **分享功能**：一键复制结果文本（含人格类型+网址）
- **反馈系统**：准确度/趣味性1-5星评分 + 文字留言 + 数据库持久化
- **社区展示**：展示其他用户的测试结果和反馈

### 人格类型（12种）
| 代码 | 名称 | Emoji |
|------|------|-------|
| SHIT | 愤世者 | 💩 |
| ATM | 送钱者 | 🏧 |
| DEAD | 死者 | 💀 |
| CTRL | 拿捏者 | 🎮 |
| SOLO | 孤儿 | 🏝️ |
| MUM | 妈妈 | 🤱 |
| IMSB | 自我攻击者 | 🤦 |
| JOKE | 小丑 | 🤡 |
| FAKE | 伪人 | 🎭 |
| WIFI | 信号人 | 📶 |
| BOSS | 大佬 | 👑 |
| NPC | NPC | 🤖 |

---

## 📁 项目结构

```
index.html          主页面（单页应用）
css/
  style.css         全局样式（暗黑风格、动效、响应式）
js/
  data.js           测试数据（题目、人格类型定义）
  app.js            主逻辑（测试流程、结果计算、反馈、API）
README.md
```

---

## 🔗 功能入口

| 路径 | 说明 |
|------|------|
| `/` (index.html) | 主页面，含介绍、测试、结果 |
| `tables/sbti_feedback` | 反馈数据REST API |

### API 示例

```js
// 提交反馈
POST tables/sbti_feedback
{
  "result_type": "DEAD",
  "result_name": "死者",
  "username": "打工人",
  "comment": "太准了",
  "accuracy_rating": 5,
  "funny_rating": 5
}

// 获取社区反馈列表
GET tables/sbti_feedback?limit=10&sort=created_at
```

---

## 🗂️ 数据模型

### sbti_feedback 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | text | 唯一标识（UUID） |
| result_type | text | 人格代码（SHIT/ATM/DEAD等） |
| result_name | text | 人格名称 |
| username | text | 用户昵称（可选） |
| comment | rich_text | 评论内容 |
| accuracy_rating | number | 准确度评分（1-5） |
| funny_rating | number | 趣味性评分（1-5） |
| created_at | datetime | 创建时间（自动） |

---

## ⏳ 待完善功能

- 结果页面可生成图片（用于朋友圈分享）
- 各人格类型的稀有度实时统计图表
- 多语言支持（繁体中文/英文）
- 根据答案百分比展示更精确的维度分析
- 管理员后台查看反馈统计

---

## 🎨 设计特色

- **暗黑渐变风格**：紫色主色调，符合年轻人审美
- **全响应式**：手机端完美适配
- **流畅动效**：题目切换动画、结果揭晓动画、维度条进度动画
- **社区感**：展示其他用户测试结果，增加互动感
- **纯前端SPA**：单页无刷新体验

---

## 🚀 部署

请前往 **Publish Tab** 一键发布，即可获得可分享的在线链接。
