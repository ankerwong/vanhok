// Main JavaScript for HKTVmall Analysis Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
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

    // Observe elements with animation
    document.querySelectorAll('.executive-card, .finding-card, .scope-item, .model-card, .stat-card, .financial-card, .segment-card, .category-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-number, .big-stat, .financial-number');
    
    const animateCounter = (counter) => {
        const target = counter.textContent.trim();
        const isPercentage = target.includes('%');
        const isCurrency = target.includes('HK$') || target.includes('$');
        const isMultiplier = target.includes('x');
        
        let numericValue;
        if (isCurrency) {
            numericValue = parseFloat(target.replace(/[HK$,BM]/g, ''));
        } else if (isPercentage) {
            numericValue = parseFloat(target.replace('%', ''));
        } else if (isMultiplier) {
            numericValue = parseFloat(target.replace('x', ''));
        } else {
            numericValue = parseFloat(target.replace(/[,M]/g, ''));
        }

        if (isNaN(numericValue)) return;

        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                current = numericValue;
                clearInterval(timer);
            }

            let displayValue;
            if (isCurrency) {
                if (target.includes('B')) {
                    displayValue = 'HK$' + current.toFixed(2) + 'B';
                } else if (target.includes('M')) {
                    displayValue = 'HK$' + current.toFixed(1) + 'M';
                } else {
                    displayValue = 'HK$' + Math.round(current).toLocaleString();
                }
            } else if (isPercentage) {
                displayValue = current.toFixed(1) + '%';
            } else if (isMultiplier) {
                displayValue = current.toFixed(1) + 'x';
            } else if (target.includes('M')) {
                displayValue = current.toFixed(1) + 'M';
            } else {
                displayValue = Math.round(current).toLocaleString();
            }

            counter.textContent = displayValue;
        }, duration / steps);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Progress bar animation for segment fills
    const progressBars = document.querySelectorAll('.segment-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Export for use in other scripts
window.formatNumber = formatNumber;