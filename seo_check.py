#!/usr/bin/env python3
"""
SEO 健康检查脚本
检查所有 HTML 页面的 SEO 配置是否完整
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
import json

def check_seo_tags(html_path):
    """检查单个 HTML 文件的 SEO 标签"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        
        # 必需的 SEO 标签
        required_tags = {
            'title': soup.find('title'),
            'description': soup.find('meta', attrs={'name': 'description'}),
            'keywords': soup.find('meta', attrs={'name': 'keywords'}),
            'og:title': soup.find('meta', attrs={'property': 'og:title'}),
            'og:description': soup.find('meta', attrs={'property': 'og:description'}),
            'og:url': soup.find('meta', attrs={'property': 'og:url'}),
            'canonical': soup.find('link', attrs={'rel': 'canonical'}),
            'robots': soup.find('meta', attrs={'name': 'robots'}),
        }
        
        results = {}
        for tag_name, tag in required_tags.items():
            if tag:
                if tag.name == 'title':
                    content = tag.string
                elif tag.name == 'link':
                    content = tag.get('href', '')
                else:
                    content = tag.get('content', '')
                
                results[tag_name] = {
                    'present': True,
                    'content': content[:100] if content else '',
                    'length': len(content) if content else 0
                }
            else:
                results[tag_name] = {'present': False}
        
        return results
    except Exception as e:
        return {'error': str(e)}

def main():
    """主函数"""
    print("🔍 SEO 健康检查开始...")
    print("=" * 80)
    
    # 查找所有 HTML 文件
    html_files = []
    
    # 根目录的 HTML 文件
    for file in Path('.').glob('*.html'):
        html_files.append(str(file))
    
    # 子目录的 index.html
    for subdir in ['ielts', 'F2English25']:
        index_file = Path(subdir) / 'index.html'
        if index_file.exists():
            html_files.append(str(index_file))
    
    html_files.sort()
    
    # 检查每个文件
    all_passed = True
    issues = []
    
    for html_file in html_files:
        print(f"\n📄 检查: {html_file}")
        results = check_seo_tags(html_file)
        
        if 'error' in results:
            print(f"   ❌ 错误: {results['error']}")
            all_passed = False
            issues.append(f"{html_file}: {results['error']}")
            continue
        
        # 检查必需标签
        missing = []
        warnings = []
        
        for tag_name, result in results.items():
            if not result.get('present', False):
                missing.append(tag_name)
            elif tag_name == 'description' and result.get('length', 0) < 50:
                warnings.append(f"{tag_name} 太短 ({result.get('length')} 字符)")
            elif tag_name == 'title' and result.get('length', 0) < 20:
                warnings.append(f"{tag_name} 太短 ({result.get('length')} 字符)")
        
        if missing:
            print(f"   ❌ 缺少标签: {', '.join(missing)}")
            all_passed = False
            issues.append(f"{html_file}: 缺少 {', '.join(missing)}")
        elif warnings:
            print(f"   ⚠️  警告: {'; '.join(warnings)}")
        else:
            print(f"   ✅ 所有 SEO 标签完整")
    
    print("\n" + "=" * 80)
    
    if all_passed:
        print("✅ SEO 健康检查通过！所有页面都有完整的 SEO 标签。")
    else:
        print("❌ SEO 健康检查发现问题：")
        for issue in issues:
            print(f"   - {issue}")
    
    print(f"\n📊 统计: 检查了 {len(html_files)} 个 HTML 文件")
    
    return 0 if all_passed else 1

if __name__ == '__main__':
    exit(main())
