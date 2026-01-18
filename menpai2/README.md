# 万鹤书院门牌生成器（Vanhok Academy Door Sign Generator）

一个纯静态（HTML/CSS/JS）的网站，用于快速生成 **A4 纸张**打印的门牌图片：在一张 A4 上**上下两张 A5 门牌**（便于裁切），并提供 **3 种高质量设计方案**可选。

> 本项目完全在浏览器端使用 **HTML5 Canvas** 渲染，无需后端。

## 已完成的功能

- A4 输出画布：**768×1024px**（3:4 比例）
- 上下两张 A5 门牌：每张 **768×512px**
- 两张门牌分别填写：
  - Room Number
  - Priority User（英文姓名）
  - Role（英文角色，如 Student/Teacher）
  - Start Date / End Date
- 表单校验：必填、结束日期必须晚于开始日期
- 三种设计风格（可随时切换，预览实时更新）：
  1. **Modern Geometric（默认）**：深紫渐变 + 六边形纹理 + 玻璃拟态卡片 + 金色高对比
  2. **Elegant Minimal**：紫到蓝渐变 + 斜向光束纹理 + 极简分割线 + 留白
  3. **Dynamic Tech**：紫到青渐变 + 点阵/电路感 + 霓虹辉光 + 科技几何装饰
- Logo 融合优化：
  - 使用 Canvas 的 `globalCompositeOperation='multiply'` 降低白底突兀
  - 或在半透明玻璃卡片/圆形徽章内放置，使其自然融入背景
- 下载导出：PNG（推荐打印）/ JPG

## 入口与使用方法（功能 URI）

- 页面入口：
  - `/index.html`

页面内交互：
- 选择风格（单选）：`modern | minimal | tech`
- 点击“生成 A4 图片”后启用下载按钮

## 资源与公共 URL

- Logo 图片（外链）：
  - `https://www.genspark.ai/api/files/s/JU9AT3kH`

> 说明：本项目不使用任何需要鉴权的第三方 API。

## 数据模型与存储

- 无持久化存储
- 所有数据均在浏览器内存中处理并绘制到 Canvas

## 尚未实现

- 300DPI 严格 A4（2480×3508px）高清导出
- 批量导入/导出（CSV）
- 可编辑模板（保存常用用户、日期格式自定义）
- 自动生成更多门牌（不仅 2 张）

## 推荐下一步

1. 增加“高清导出（300DPI）”开关：用于更精确的物理尺寸打印
2. 增加“仅复制上半张到下半张”快捷按钮（同一房间重复时更快）
3. 增加“安全边距/裁切线样式”设置（虚线、实线、裁切标记）

## 开发说明

文件结构：
```
index.html
css/style.css
js/app.js
README.md
```

本地运行：直接用浏览器打开 `index.html` 即可。

## 部署

要发布上线，请使用项目的 **Publish tab** 一键发布，系统会生成可访问的线上链接。
