// 平滑滚动到联系方式区域
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.teacher-section, .info-card, .schedule-section, .pricing-card, .refund-section, .contact-section'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 添加电话按钮点击统计
    const phoneButtons = document.querySelectorAll('.primary-btn, .secondary-btn, .phone-number');
    phoneButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 这里可以添加点击统计代码
            console.log('电话按钮被点击:', this.textContent);
        });
    });

    // 添加优惠政策hover效果
    const offerItems = document.querySelectorAll('.offer-item');
    offerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 5px 15px rgba(251, 191, 36, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });

    // 添加课程日期hover效果
    const dates = document.querySelectorAll('.date');
    dates.forEach(date => {
        date.addEventListener('mouseenter', function() {
            this.style.background = '#fbbf24';
            this.style.color = '#1f2937';
            this.style.transform = 'scale(1.1)';
        });

        date.addEventListener('mouseleave', function() {
            this.style.background = '#1e3a8a';
            this.style.color = 'white';
            this.style.transform = 'scale(1)';
        });
    });

    // 添加成就项目动画
    const achievements = document.querySelectorAll('.achievement');
    achievements.forEach((achievement, index) => {
        achievement.style.animationDelay = `${index * 0.1}s`;
        achievement.addEventListener('mouseenter', function() {
            this.style.background = '#f0f9ff';
            this.style.borderRadius = '8px';
            this.style.padding = '12px';
            this.style.marginLeft = '10px';
        });

        achievement.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.padding = '10px 0';
            this.style.marginLeft = '0';
        });
    });
});

// 添加页面滚动时的头部固定效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        header.style.backdropFilter = 'blur(10px)';
        header.style.background = 'rgba(30, 58, 138, 0.95)';
        document.body.style.paddingTop = header.offsetHeight + 'px';
    } else {
        header.style.position = 'static';
        header.style.backdropFilter = 'none';
        header.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
        document.body.style.paddingTop = '0';
    }
});

// 表单验证和提交功能（如果需要添加报名表单）
function validateForm(formData) {
    const required = ['name', 'phone', 'grade'];
    for (let field of required) {
        if (!formData[field] || formData[field].trim() === '') {
            return false;
        }
    }
    return true;
}

// 添加点击统计功能
function trackClick(element, action) {
    // 这里可以集成Google Analytics或其他统计工具
    console.log('用户点击:', action, element);
}

// 响应式菜单功能（如果需要添加导航菜单）
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// 平滑滚动到指定元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭任何打开的模态框
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// 添加触摸设备优化
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 移除hover效果，使用触摸优化
    const hoverElements = document.querySelectorAll('.info-card, .contact-card, .month-schedule');
    hoverElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}