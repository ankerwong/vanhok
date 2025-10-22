# EmailJS 配置指南

## 📧 邮件发送功能说明

系统已集成EmailJS服务，用于在测试完成后自动将详细的测评报告发送到指定邮箱。

## 🔧 当前配置

- **管理员邮箱**: 1003150716@qq.com
- **EmailJS Service ID**: service_vt8sfji
- **EmailJS Template ID**: template_5j4rvqh
- **EmailJS Public Key**: CrfCSc4YbJoFKjVaM

## 📝 邮件模板设置

### 推荐的邮件模板内容

**邮件主题**:
```
新教师入职测评报告 - {{candidate_name}}
```

**邮件正文**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 20px; }
        .score-box { background: #f8f9fa; border-left: 4px solid #2563eb; padding: 15px; margin: 15px 0; }
        .score-item { margin: 10px 0; }
        .score-value { font-size: 1.5em; font-weight: bold; color: #2563eb; }
        .trait-item { margin: 8px 0; padding: 8px; background: #e9ecef; border-radius: 5px; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎓 教师入职综合能力测评报告</h1>
    </div>
    
    <div class="content">
        <h2>📋 考生信息</h2>
        <p><strong>姓名：</strong>{{candidate_name}}</p>
        <p><strong>联系电话：</strong>{{candidate_phone}}</p>
        <p><strong>测试时间：</strong>{{test_date}}</p>
        
        <h2>📊 综合评估结果</h2>
        <div class="score-box">
            <div class="score-item">
                <strong>综合得分：</strong>
                <span class="score-value">{{overall_score}}/100</span>
            </div>
        </div>
        
        <h2>📈 各项能力详细得分</h2>
        <div class="score-item">
            <strong>认知能力 (IQ)：</strong>
            <span class="score-value">{{cognitive_score}}/100</span>
        </div>
        <div class="score-item">
            <strong>情绪智力 (压力情商)：</strong>
            <span class="score-value">{{emotional_score}}/100</span>
        </div>
        <div class="score-item">
            <strong>性格适配度：</strong>
            <span class="score-value">{{personality_score}}/100</span>
        </div>
        <div class="score-item">
            <strong>情境判断能力：</strong>
            <span class="score-value">{{situational_score}}/100</span>
        </div>
        <div class="score-item">
            <strong>教育情境应对：</strong>
            <span class="score-value">{{education_score}}/100</span>
        </div>
        
        <h2>🎨 性格特质分析 (Big Five)</h2>
        <div class="trait-item">开放性 (Openness): <strong>{{openness}}%</strong></div>
        <div class="trait-item">尽责性 (Conscientiousness): <strong>{{conscientiousness}}%</strong></div>
        <div class="trait-item">外向性 (Extraversion): <strong>{{extraversion}}%</strong></div>
        <div class="trait-item">宜人性 (Agreeableness): <strong>{{agreeableness}}%</strong></div>
        <div class="trait-item">情绪稳定性 (Emotional Stability): <strong>{{stability}}%</strong></div>
        
        <h2>📄 详细报告</h2>
        <pre>{{report_content}}</pre>
        
        <hr>
        <p style="text-align: center; color: #6b7280; font-size: 0.9em;">
            此报告由教师入职综合能力测评系统自动生成<br>
            基于CIA/FBI专业测评体系 | Big Five人格模型 | MSCEIT情绪智力理论
        </p>
    </div>
</body>
</html>
```

## 🚀 如何使用自己的EmailJS账号（可选）

如果您想使用自己的EmailJS账号，请按以下步骤操作：

### 第一步：注册EmailJS账号
1. 访问 https://www.emailjs.com/
2. 点击 "Sign Up" 注册免费账号
3. 验证邮箱

### 第二步：添加邮件服务
1. 登录后点击 "Email Services"
2. 点击 "Add New Service"
3. 选择您的邮件服务商（推荐Gmail或QQ邮箱）
4. 按照提示连接您的邮箱
5. 记录下 Service ID

### 第三步：创建邮件模板
1. 点击 "Email Templates"
2. 点击 "Create New Template"
3. 复制上面推荐的模板内容
4. 设置模板参数（确保包含所有{{变量名}}）
5. 保存并记录 Template ID

### 第四步：获取Public Key
1. 点击 "Account" -> "General"
2. 找到 "Public Key"
3. 复制保存

### 第五步：修改配置
在 `js/main.js` 文件中找到以下代码并修改：

```javascript
// EmailJS配置
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';        // 替换为您的Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';      // 替换为您的Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // 替换为您的Public Key
const ADMIN_EMAIL = 'your-email@example.com';        // 替换为您的接收邮箱
```

同时修改 `index.html` 中的初始化代码：

```html
<script type="text/javascript">
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY");  // 替换为您的Public Key
    })();
</script>
```

## 📧 邮件内容说明

系统会自动发送包含以下信息的邮件：

### 基本信息
- 考生姓名
- 联系电话
- 测试时间

### 得分信息
- 综合得分
- 认知能力得分
- 情绪智力得分
- 性格适配度得分
- 情境判断得分
- 教育情境得分

### 性格特质
- Big Five五大人格维度得分

### 详细报告
- 完整的文本格式测评报告
- 各项能力的评语
- 具体的改进建议
- 综合评价

## ⚠️ 注意事项

1. **EmailJS免费版限制**
   - 每月200封邮件
   - 如需更多，请升级付费版

2. **邮件可能进入垃圾箱**
   - 首次收到邮件时检查垃圾箱
   - 将发件地址添加到白名单

3. **发送失败处理**
   - 即使邮件发送失败，系统仍会显示提交成功
   - 错误信息会记录在浏览器控制台
   - 可以稍后手动查看控制台排查问题

4. **测试邮件发送**
   - 建议先完成一次完整测试
   - 检查邮箱是否收到报告
   - 确认邮件格式是否正确

## 🔍 故障排查

### 问题1：邮件未收到
- 检查垃圾邮件箱
- 确认EmailJS配置正确
- 查看浏览器控制台错误信息
- 确认EmailJS账号状态正常

### 问题2：邮件格式错误
- 检查模板变量名是否正确
- 确认模板HTML格式正确
- 测试发送简单模板

### 问题3：发送频率限制
- 查看EmailJS账号使用额度
- 考虑升级付费计划
- 或使用多个EmailJS账号轮换

## 📞 技术支持

如需帮助，请：
1. 查看EmailJS官方文档：https://www.emailjs.com/docs/
2. 检查浏览器控制台的错误信息
3. 验证EmailJS服务状态

---

**配置完成后，系统将自动在测试提交时发送详细的测评报告到指定邮箱！** 📨
