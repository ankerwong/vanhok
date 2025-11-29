// 主应用逻辑

// 导航切换功能
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.calculator-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // 移除所有活动状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');

            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 添加回车键支持
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // 找到最近的计算按钮并点击
                const card = this.closest('.calculator-card');
                const calcButton = card.querySelector('.calc-btn');
                if (calcButton) {
                    calcButton.click();
                }
            }
        });
    });

    // 添加输入验证
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            // 移除之前的错误消息
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });

    // 添加示例数据功能（可选）
    addExampleDataButtons();

    // 显示欢迎提示
    showWelcomeMessage();
});

// 添加示例数据按钮
function addExampleDataButtons() {
    const examples = {
        'pv': {
            'pv-fv': 10000,
            'pv-r': 5,
            'pv-n': 10
        },
        'fv': {
            'fv-pv': 10000,
            'fv-r': 5,
            'fv-n': 10
        },
        'perp': {
            'perp-c': 1000,
            'perp-r': 5
        },
        'ann': {
            'ann-c': 1000,
            'ann-r': 5,
            'ann-n': 10
        },
        'anndue': {
            'anndue-c': 1000,
            'anndue-r': 5,
            'anndue-n': 10
        },
        'bond': {
            'bond-fv': 1000,
            'bond-coupon': 6,
            'bond-ytm': 5,
            'bond-years': 10,
            'bond-freq': 2
        },
        'npv': {
            'npv-initial': 100000,
            'npv-rate': 10,
            'npv-cashflows': '30000,35000,40000,45000,50000'
        },
        'irr': {
            'irr-initial': -100000,
            'irr-cashflows': '30000,35000,40000,45000,50000'
        },
        'pi': {
            'pi-initial': 100000,
            'pi-rate': 10,
            'pi-cashflows': '30000,35000,40000,45000,50000'
        },
        'wacc': {
            'wacc-equity': 600000,
            'wacc-debt': 400000,
            'wacc-re': 12,
            'wacc-rd': 6,
            'wacc-tax': 25
        },
        'capm': {
            'capm-rf': 3,
            'capm-rm': 10,
            'capm-beta': 1.2
        }
    };

    // 为每个计算器卡片添加示例按钮
    document.querySelectorAll('.calculator-card').forEach(card => {
        const firstInput = card.querySelector('input');
        if (firstInput) {
            const inputId = firstInput.id;
            const prefix = inputId.split('-')[0];
            
            if (examples[prefix]) {
                const exampleBtn = document.createElement('button');
                exampleBtn.className = 'calc-btn';
                exampleBtn.style.background = '#10b981';
                exampleBtn.style.marginTop = '10px';
                exampleBtn.innerHTML = '<i class="fas fa-lightbulb"></i> 填充示例数据';
                
                exampleBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const data = examples[prefix];
                    for (let key in data) {
                        const input = document.getElementById(key);
                        if (input) {
                            input.value = data[key];
                        }
                    }
                    // 显示提示
                    showNotification('示例数据已填充，点击计算按钮查看结果', 'success');
                });
                
                const calcBtn = card.querySelector('.calc-btn');
                calcBtn.parentNode.insertBefore(exampleBtn, calcBtn);
            }
        }
    });
}

// 显示通知消息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 显示欢迎消息
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('欢迎使用金融课程计算器！每个计算器都有示例数据按钮可供参考。', 'info');
    }, 1000);
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + 数字键切换计算器
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const sections = ['time-value', 'bond', 'investment', 'capital-cost'];
        const index = parseInt(e.key) - 1;
        if (index < sections.length) {
            const button = document.querySelector(`[data-section="${sections[index]}"]`);
            if (button) button.click();
        }
    }
});

// 添加打印功能
function printResult(resultId) {
    const result = document.getElementById(resultId);
    if (result && result.classList.contains('show')) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>计算结果</title>');
        printWindow.document.write('<style>body{font-family:Arial;padding:20px;}h4{color:#2563eb;}.value{font-size:2rem;color:#10b981;margin:20px 0;}.details{margin:20px 0;}.detail-item{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h2>金融计算器结果</h2>');
        printWindow.document.write(result.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}

// 导出结果为JSON
function exportResults() {
    const results = {};
    document.querySelectorAll('.result.show').forEach(result => {
        const id = result.id;
        const value = result.querySelector('.value')?.textContent;
        if (value) {
            results[id] = value;
        }
    });
    
    if (Object.keys(results).length > 0) {
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'finance_calculator_results.json';
        link.click();
        showNotification('结果已导出为JSON文件', 'success');
    } else {
        showNotification('没有可导出的结果', 'error');
    }
}

// 清除所有结果
function clearAllResults() {
    document.querySelectorAll('.result.show').forEach(result => {
        result.classList.remove('show');
    });
    showNotification('所有结果已清除', 'info');
}

// 响应式优化：检测移动设备
function isMobile() {
    return window.innerWidth <= 768;
}

// 自适应调整
window.addEventListener('resize', function() {
    if (isMobile()) {
        // 移动设备特殊优化
        document.querySelectorAll('.calculator-card').forEach(card => {
            card.style.padding = '20px';
        });
    }
});

console.log('金融课程计算器已加载完成！');
console.log('快捷键：Ctrl/Cmd + 1-4 切换不同的计算器分类');
