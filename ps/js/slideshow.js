// 教学课件幻灯片功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slideNavBtns = document.querySelectorAll('.slide-nav-btn');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // 显示指定幻灯片
    function showSlide(index) {
        // 边界检查
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 移除所有导航按钮的活动状态
        slideNavBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        // 移除所有指示器的活动状态
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // 显示当前幻灯片
        slides[currentSlide].classList.add('active');
        slideNavBtns[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');

        // 滚动侧边导航到当前按钮
        slideNavBtns[currentSlide].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    // 侧边导航按钮点击
    slideNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // 上一页按钮
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }

    // 下一页按钮
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
    }

    // 指示器点击
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // 键盘导航
    document.addEventListener('keydown', function(e) {
        // 检查是否在教学区域
        const teachingSection = document.querySelector('#teaching');
        const rect = teachingSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlide + 1);
            }
        }
    });

    // 触摸滑动支持(移动端)
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slidesContainer = document.querySelector('.slides');
    
    if (slidesContainer) {
        slidesContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        slidesContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // 最小滑动距离
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // 向左滑动 - 下一页
            showSlide(currentSlide + 1);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // 向右滑动 - 上一页
            showSlide(currentSlide - 1);
        }
    }

    // 初始化:显示第一张幻灯片
    showSlide(0);
});