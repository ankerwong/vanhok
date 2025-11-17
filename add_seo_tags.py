#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SEO Meta Tags 批量添加脚本
为万鹤书院所有 HTML 页面添加完整的 SEO meta 标签
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup

# 页面配置字典：根据文件名定义每个页面的 SEO 信息
PAGE_CONFIG = {
    "JUPAS2025.html": {
        "title": "香港九大学2025年JUPAS志愿改选深度调查报告 | 万鹤书院升学部",
        "description": "基于2025年JUPAS志愿改选最新数据的深度分析报告，提供香港大学申请竞争态势、专业选择建议等权威升学参考。万鹤书院专业升学指导团队出品。",
        "keywords": "JUPAS,JUPAS 2025,香港大学,升学指导,志愿填报,香港升学,万鹤书院,大学申请,八大院校",
        "og_type": "article"
    },
    "JS2960_Interview.html": {
        "title": "JS2960面试指导 | 香港大学入学面试准备 | 万鹤书院",
        "description": "专业的JS2960香港大学入学面试指导服务，提供面试技巧、模拟训练、常见问题解答等全方位面试准备支持。",
        "keywords": "JS2960,面试指导,香港大学,入学面试,JUPAS面试,万鹤书院,升学咨询",
        "og_type": "article"
    },
    "Vanhok_DSEresult_2025.html": {
        "title": "2025年DSE成绩分析与升学规划 | 万鹤书院",
        "description": "2025年香港DSE考试成绩深度分析，提供成绩评估、升学路径规划、院校选择建议等专业升学指导服务。",
        "keywords": "DSE,DSE 2025,香港中学文凭考试,成绩分析,升学规划,万鹤书院,升学指导",
        "og_type": "article"
    },
    "2025_english_summer_course.html": {
        "title": "2025年英语暑期课程 | English Summer Course | 万鹤书院",
        "description": "万鹤书院2025年暑期英语强化课程，专注提升英语听说读写能力，为DSE、IELTS考试及升学做好准备。",
        "keywords": "英语课程,暑期班,English Course,DSE英语,IELTS,万鹤书院,英语培训",
        "og_type": "article"
    },
    "Chinese_CLass.html": {
        "title": "中文课程 | DSE中文科辅导 | 万鹤书院",
        "description": "专业的DSE中文科辅导课程，涵盖阅读、写作、聆听、说话四大卷别，助力学生中文科取得佳绩。",
        "keywords": "中文课程,DSE中文,中文辅导,语文培训,万鹤书院,香港中文",
        "og_type": "article"
    },
    "fuduban.html": {
        "title": "辅导班课程 | 学科辅导 | 万鹤书院",
        "description": "万鹤书院提供全科辅导服务，包括中英数理化等主要学科，小班教学，针对性辅导，助力学生学业进步。",
        "keywords": "辅导班,补习班,学科辅导,DSE辅导,万鹤书院,香港补习",
        "og_type": "article"
    },
    "fuduban2025.html": {
        "title": "2025辅导班招生 | 新学年课程 | 万鹤书院",
        "description": "万鹤书院2025学年辅导班现正招生，提供DSE各科目专业辅导，资深教师团队，小班教学，个性化学习方案。",
        "keywords": "2025辅导班,招生,补习课程,DSE辅导,万鹤书院,新学年",
        "og_type": "article"
    },
    "ai_education_revolution.html": {
        "title": "人工智能革新教育：从政策到实践的全球视角 | 万鹤书院",
        "description": "深度解读人工智能如何革新教育领域，从全球政策到教学实践的全面分析，探讨AI在教育中的应用与未来趋势。",
        "keywords": "人工智能,AI教育,教育革新,教育科技,EdTech,万鹤书院,智能教学",
        "og_type": "article"
    },
    "asso_service.html": {
        "title": "副学士服务 | Associate Degree咨询 | 万鹤书院",
        "description": "提供香港副学士课程咨询、申请指导、升学规划等专业服务，助力副学士学生继续升读本科学位。",
        "keywords": "副学士,Associate Degree,升学咨询,本科升学,万鹤书院,香港教育",
        "og_type": "article"
    },
    "teacher_training.html": {
        "title": "教师培训课程 | Teacher Training | 万鹤书院",
        "description": "万鹤书院提供专业教师培训课程，涵盖教学方法、课程设计、学生管理等内容，提升教师专业素养。",
        "keywords": "教师培训,Teacher Training,教学方法,专业发展,万鹤书院,教育培训",
        "og_type": "article"
    },
    "scheduler.html": {
        "title": "课程安排系统 | 排课工具 | 万鹤书院",
        "description": "万鹤书院在线课程安排系统，方便学生查询课程时间表、预约课程、管理学习进度。",
        "keywords": "课程安排,排课系统,时间表,万鹤书院,在线工具",
        "og_type": "website"
    },
    "google_sheets_channel_system.html": {
        "title": "Google Sheets频道系统 | 数据管理工具 | 万鹤书院",
        "description": "基于Google Sheets的频道管理系统，用于教学数据管理、学生信息记录等教育管理场景。",
        "keywords": "Google Sheets,数据管理,教学工具,万鹤书院,频道系统",
        "og_type": "website"
    },
    "hkss.html": {
        "title": "香港学校服务 | HKSS | 万鹤书院",
        "description": "为香港学校提供专业教育服务支持，包括课程设计、教学资源、学生辅导等综合教育解决方案。",
        "keywords": "香港学校,HKSS,教育服务,学校支持,万鹤书院,教育方案",
        "og_type": "article"
    },
    "sg.html": {
        "title": "新加坡升学服务 | Singapore Education | 万鹤书院",
        "description": "提供新加坡升学咨询、院校申请、留学规划等专业服务，助力学生实现新加坡留学梦想。",
        "keywords": "新加坡升学,留学咨询,Singapore,海外升学,万鹤书院,留学服务",
        "og_type": "article"
    },
    "local_student_definition_2025.html": {
        "title": "2025本地学生定义 | 香港升学资格 | 万鹤书院",
        "description": "详解2025年香港本地学生定义标准，JUPAS申请资格要求，帮助学生了解升学资格认定。",
        "keywords": "本地学生,资格认定,JUPAS资格,香港升学,万鹤书院,2025",
        "og_type": "article"
    },
    "local_student_definition_2025_v2.html": {
        "title": "2025本地学生定义（更新版）| 香港升学资格 | 万鹤书院",
        "description": "2025年香港本地学生定义最新更新版本，详细解读资格认定标准与申请要求。",
        "keywords": "本地学生,资格认定,JUPAS,香港升学,万鹤书院,2025更新",
        "og_type": "article"
    },
    "linear_programming_v4.0.html": {
        "title": "线性规划教学工具 v4.0 | Linear Programming | 万鹤书院",
        "description": "互动式线性规划教学工具，帮助学生理解和掌握线性规划概念，适用于DSE数学延伸部分。",
        "keywords": "线性规划,Linear Programming,数学工具,DSE数学,万鹤书院,教学工具",
        "og_type": "website"
    }
}

# 子目录页面配置
SUBDIR_CONFIG = {
    "ielts/index.html": {
        "title": "IELTS雅思模考平台 | Mock Test System | 万鹤书院",
        "description": "万鹤书院IELTS雅思在线模考系统，提供全真模拟测试、即时评分、详细解析，助力雅思考试高分通过。",
        "keywords": "IELTS,雅思,模考,Mock Test,英语考试,万鹤书院,雅思培训",
        "og_type": "website"
    },
    "F2English25/index.html": {
        "title": "F2 English Course 2025 | 中二英语课程 | 万鹤书院",
        "description": "专为中二学生设计的英语强化课程，涵盖语法、阅读、写作、听说训练，为DSE英语科打好基础。",
        "keywords": "F2英语,中二英语,English Course,DSE英语,万鹤书院,英语培训",
        "og_type": "article"
    },
    "teacher_assessment/index.html": {
        "title": "教师评估系统 | Teacher Assessment | 万鹤书院",
        "description": "在线教师评估与反馈系统，用于教学质量评估、教师表现分析、教学改进建议等。",
        "keywords": "教师评估,Teacher Assessment,教学评估,质量管理,万鹤书院,教育工具",
        "og_type": "website"
    }
}

def has_seo_meta_tags(soup):
    """检查页面是否已经有SEO meta标签"""
    # 检查是否有 description meta 标签
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    # 检查是否有 og:title
    og_title = soup.find('meta', attrs={'property': 'og:title'})
    
    return meta_desc is not None or og_title is not None

def create_seo_meta_tags(config, file_path):
    """创建SEO meta标签HTML"""
    canonical_url = f"https://page.vanhok.com/{file_path.replace('./','')}"
    
    seo_tags = f"""
    <!-- SEO Meta Tags -->
    <meta name="description" content="{config['description']}">
    <meta name="keywords" content="{config['keywords']}">
    <meta name="author" content="万鹤书院 Vanhok Academy">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="{canonical_url}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{config['og_type']}">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:title" content="{config['title']}">
    <meta property="og:description" content="{config['description']}">
    <meta property="og:site_name" content="万鹤书院 Vanhok Academy">
    <meta property="og:locale" content="zh_HK">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{canonical_url}">
    <meta name="twitter:title" content="{config['title']}">
    <meta name="twitter:description" content="{config['description']}">
    
    <!-- Additional SEO -->
    <meta name="language" content="zh-CN">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">
    <meta name="rating" content="general">
"""
    return seo_tags

def process_html_file(file_path):
    """处理单个HTML文件"""
    print(f"处理文件: {file_path}")
    
    # 读取文件
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用 BeautifulSoup 解析
    soup = BeautifulSoup(content, 'html.parser')
    
    # 检查是否已有SEO标签（除了index.html）
    if 'index.html' not in file_path and has_seo_meta_tags(soup):
        print(f"  ✓ 已有SEO标签，跳过")
        return False
    
    # 获取配置
    filename = os.path.basename(file_path)
    relative_path = file_path.replace('./','')
    
    config = None
    if relative_path in SUBDIR_CONFIG:
        config = SUBDIR_CONFIG[relative_path]
    elif filename in PAGE_CONFIG:
        config = PAGE_CONFIG[filename]
    elif filename == 'index.html' and relative_path == 'index.html':
        print(f"  ✓ 主页已单独优化，跳过")
        return False
    else:
        print(f"  ⚠ 未找到配置，跳过")
        return False
    
    # 查找 head 标签
    head = soup.find('head')
    if not head:
        print(f"  ✗ 未找到 <head> 标签")
        return False
    
    # 更新或创建 title
    title_tag = head.find('title')
    if title_tag:
        title_tag.string = config['title']
    else:
        new_title = soup.new_tag('title')
        new_title.string = config['title']
        head.insert(0, new_title)
    
    # 查找 viewport meta 标签位置（作为插入点）
    viewport = head.find('meta', attrs={'name': 'viewport'})
    if not viewport:
        # 如果没有 viewport，在 charset 后面插入
        charset = head.find('meta', attrs={'charset': True})
        viewport = charset if charset else head.find('meta')
    
    # 创建SEO标签
    seo_html = create_seo_meta_tags(config, relative_path)
    
    # 将SEO标签插入到viewport之后
    if viewport:
        # 在viewport后插入
        seo_soup = BeautifulSoup(seo_html, 'html.parser')
        for tag in reversed(list(seo_soup.children)):
            if tag.name:  # 只处理标签，跳过文本节点
                viewport.insert_after(tag)
    else:
        # 如果找不到插入点，就添加到head末尾
        head.append(BeautifulSoup(seo_html, 'html.parser'))
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    print(f"  ✓ SEO标签添加成功")
    return True

def main():
    """主函数"""
    print("=" * 60)
    print("万鹤书院 SEO Meta Tags 批量添加工具")
    print("=" * 60)
    print()
    
    # 收集所有HTML文件
    html_files = []
    
    # 根目录HTML文件
    for filename in PAGE_CONFIG.keys():
        file_path = f"./{filename}"
        if os.path.exists(file_path):
            html_files.append(file_path)
    
    # 子目录HTML文件
    for subdir_path in SUBDIR_CONFIG.keys():
        file_path = f"./{subdir_path}"
        if os.path.exists(file_path):
            html_files.append(file_path)
    
    print(f"找到 {len(html_files)} 个HTML文件需要处理\n")
    
    # 处理文件
    processed = 0
    skipped = 0
    
    for file_path in html_files:
        if process_html_file(file_path):
            processed += 1
        else:
            skipped += 1
        print()
    
    # 总结
    print("=" * 60)
    print(f"处理完成！")
    print(f"成功添加SEO标签: {processed} 个文件")
    print(f"跳过: {skipped} 个文件")
    print("=" * 60)

if __name__ == "__main__":
    main()
