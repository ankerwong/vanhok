import os

def scan_html_files(root_dir="."):
    grouped = {}
    for root, dirs, files in os.walk(root_dir):
        rel_dir = os.path.relpath(root, root_dir)
        rel_dir = "" if rel_dir == "." else rel_dir
        html_files = [f for f in files if f.endswith('.html') and f != "index.html"]
        if html_files:
            grouped.setdefault(rel_dir, [])
            for file in html_files:
                file_path = os.path.join(rel_dir, file) if rel_dir else file
                grouped[rel_dir].append(file_path)
    return grouped

def generate_html(grouped):
    html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>万鹤书院 - 首页索引</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { font-family: "微软雅黑", Arial, sans-serif; background: #f6f9fb; margin: 0; padding: 0; }
.container { max-width: 900px; margin: 40px auto 40px auto; background: #fff; border-radius: 14px; box-shadow: 0 2px 16px #dbe5ef; padding: 40px;}
h1 { color: #276ac9; border-bottom: 2px solid #eee; padding-bottom: 8px; margin-bottom: 28px;}
h2 { color: #555; background: #f0f4f8; padding: 8px 16px; border-radius: 8px; margin: 28px 0 12px 0; font-size: 1.22em;}
ul { margin: 0 0 18px 0; padding-left: 24px;}
li { margin: 10px 0; font-size: 1.09em;}
a { color: #276ac9; text-decoration: none; transition: color .2s;}
a:hover { color: #0d2e5b; text-decoration: underline;}
@media (max-width: 600px) {
  .container { padding: 12px; }
}
</style>
</head>
<body>
<div class="container">
<h1>万鹤书院 - 首页索引</h1>
"""

    # 根目录的文件优先显示
    if "" in grouped:
        html += "<h2>根目录/未分组</h2>\n<ul>"
        for file in sorted(grouped[""]):
            html += f'<li><a href="{file}">{file}</a></li>\n'
        html += "</ul>\n"

    # 其它分组
    for group in sorted(k for k in grouped if k != ""):
        html += f"<h2>{group}</h2>\n<ul>"
        for file in sorted(grouped[group]):
            html += f'<li><a href="{file}">{file}</a></li>\n'
        html += "</ul>\n"

    html += """
<hr>
<p style="color:#888;font-size:14px;">本页面由 GitHub Actions 自动生成。</p>
</div>
</body></html>
"""
    return html

if __name__ == "__main__":
    grouped = scan_html_files(".")
    html = generate_html(grouped)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("index.html 已生成！")

