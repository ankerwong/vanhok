categories = {
    "相关资讯": [
        ("万鹤书院2025届成绩与统计（加密）", "Vanhok_DSEresult_2025.html"),
        ("浸会大学JS2960面试培训题目答案", "JS2960_Interview.html"),
        ("香港JUPAS2025年志愿修改后官方数据", "JUPAS2025.html"),
    ],
    "课程介绍": [
        ("万鹤书院副学士陪跑服务介绍", "AD.html"),
        ("万鹤书院DSE语文摘星班介绍", "Chinese_Class.html"),
        ("HKDSE中二英语教学规划", "F2_Eng_teaching.html"),
        ("HKDSE中三英语教学规划", "F3_Eng_teaching.html"),
        ("万鹤书院DSE 英语暑期集训营", "hkdse_english_intensive_course_final.html"),
        ("万鹤书院DSE 2025年复读班招生简章", "fuduban2025.html"),
    ],
    "工具": [
        ("线性规划计算器", "linear_programming_v3.0.html"),
    ],
    "家校联系": [
        ("2025年毕业班家长会", "parent_meeting_July12_2025.html"),
    ]
}

html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>万鹤书院首页目录</title>
<style>
body { font-family: "微软雅黑", Arial, sans-serif; margin: 30px; }
h1 { color: #2d62a7; }
h2 { color: #3b3b3b; }
ul { margin-bottom: 30px; }
li { margin: 6px 0; }
a { text-decoration: none; color: #276ac9; }
a:hover { text-decoration: underline; }
</style>
</head>
<body>
<h1>万鹤书院首页目录</h1>
"""

for cat, items in categories.items():
    html += f"<h2>{cat}</h2>\n<ul>"
    for name, file in items:
        html += f'<li><a href="{file}">{name}</a></li>\n'
    html += "</ul>\n"

html += """
<hr>
<p style="color:#888;font-size:14px;">本页面由 GitHub Actions 自动生成。</p>
</body></html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
说明：
你后续如果增加新页面，只需在 categories 里加一行即可，脚本会自动生成首页。

3. 把脚本推送到仓库
把 generate_index.py 文件放到你的仓库根目录，和其它 html 文件同级。
本地运行一次，确保没报错，并生成了一个新的 index.html。
执行：
Copygit add generate_index.py index.html
git commit -m "添加自动生成首页脚本"
git push
（如果你不会用 git，可以在 GitHub 网页端上传这两个文件，然后在网页端直接生成 commit）
4. 配置 GitHub Actions
在你的仓库里，点击上方菜单“Actions”。

点击 “set up a workflow yourself” 或 “新建 workflow”。

在 .github/workflows/ 目录下新建一个文件，比如 auto-generate-index.yml，内容如下：

Copyname: Auto Generate index.html

on:
  push:
    branches:
      - main   # 或者你的主分支名
  workflow_dispatch:   # 允许手动触发

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.x'

      - name: Run generate_index.py
        run: python generate_index.py

      - name: Commit and push changes
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email '41898282+github-actions[bot]@users.noreply.github.com'
          git add index.html
          git diff --cached --quiet || git commit -m "自动更新首页 index.html"
          git push
