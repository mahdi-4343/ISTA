// ISTA Website - English Version (LTR)
// Main JavaScript functionality

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupActiveNavLinks();
        this.setupSmoothScrolling();
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Navbar background on scroll
            if (scrollTop > 50) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                });
            });
        }
    }

    setupActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupGradientAnimations();
        this.setupPhoneMockupEffects();
    }

    setupScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });

        // Enhanced features section scrolling
        this.setupFeaturesSmoothScrolling();
    }

    setupFeaturesSmoothScrolling() {
        const featuresSection = document.querySelector('#features');
        const featureCards = document.querySelectorAll('.feature-card');
        
        if (!featuresSection) return;

        // Create a more sophisticated observer for features
        const featuresObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation of feature cards
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150); // 150ms delay between each card
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe each feature card
        featureCards.forEach(card => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            featuresObserver.observe(card);
        });

        // Add smooth scroll behavior for feature navigation
        const featureNavLinks = document.querySelectorAll('a[href="#features"]');
        featureNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.querySelector('#features');
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    
                    // Use smooth scrolling with easing
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Add a subtle highlight effect to the features section
                    setTimeout(() => {
                        featuresSection.style.boxShadow = '0 0 50px rgba(0, 204, 106, 0.3)';
                        setTimeout(() => {
                            featuresSection.style.boxShadow = 'none';
                        }, 1000);
                    }, 800);
                }
            });
        });

        // Add scroll-triggered animations for feature cards
        let isScrolling = false;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                featureCards.forEach(card => {
                    card.style.transition = 'all 0.3s ease-out';
                });
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                featureCards.forEach(card => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
            }, 150);
        });
    }

    setupParallaxEffects() {
        const gradientOrbs = document.querySelectorAll('.gradient-orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            gradientOrbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                orb.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupGradientAnimations() {
        const gradientElements = document.querySelectorAll('.gradient-text, .btn-primary');
        
        gradientElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.background = 'linear-gradient(135deg, #00cc6a 0%, #00ff88 100%)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.background = '';
            });
        });
    }

    setupPhoneMockupEffects() {
        const phoneMockup = document.querySelector('.phone-mockup');
        
        if (phoneMockup) {
            phoneMockup.addEventListener('mouseenter', () => {
                phoneMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1.05)';
            });
            
            phoneMockup.addEventListener('mouseleave', () => {
                phoneMockup.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg)';
            });
        }
    }
}

class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressAnimations();
        this.setupKeyboardShortcuts();
        this.setupToastMessages();
    }

    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.chart-bar');
        
        const animateProgress = () => {
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    const height = bar.style.height;
                    bar.style.height = '0%';
                    
                    setTimeout(() => {
                        bar.style.height = height;
                    }, 100);
                }, index * 200);
            });
        };

        // Animate on scroll into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                    observer.unobserve(entry.target);
                }
            });
        });

        const usageChart = document.querySelector('.usage-chart');
        if (usageChart) {
            observer.observe(usageChart);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Escape key to close mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    }

    setupToastMessages() {
        this.showToast = (message, type = 'info') => {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <span class="toast-message">${message}</span>
                <button class="toast-close">&times;</button>
            `;
            
            document.body.appendChild(toast);
            
            // Show toast
            setTimeout(() => toast.classList.add('show'), 100);
            
            // Auto hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
            
            // Close button
            toast.querySelector('.toast-close').addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            });
        };
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }
}

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCaching();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupImageOptimization() {
        // Add loading="lazy" to images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            if (!img.src.includes('data:image')) {
                img.loading = 'lazy';
            }
        });
    }

    setupCaching() {
        // Service Worker registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('../sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageViewTracking();
        this.setupEventTracking();
    }

    setupPageViewTracking() {
        // Track page views
        this.trackPageView();
        
        // Track navigation changes
        window.addEventListener('popstate', () => {
            this.trackPageView();
        });
    }

    setupEventTracking() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .download-btn')) {
                this.trackEvent('click', e.target.textContent.trim() || e.target.className);
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.trackEvent('scroll_depth', `${maxScroll}%`);
                }
            }
        });
    }

    trackPageView() {
        const page = window.location.pathname;
        console.log('Page view:', page);
        // Add your analytics tracking code here
    }

    trackEvent(action, label) {
        console.log('Event:', action, label);
        // Add your analytics tracking code here
    }
}

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSkipLink();
        this.setupFocusManagement();
        this.setupARIALabels();
    }

    setupSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }
    }

    setupFocusManagement() {
        // Trap focus in mobile menu when open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            navMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }

    setupARIALabels() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (button.textContent.trim()) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const interactiveFeatures = new InteractiveFeatures();
    const performanceOptimizer = new PerformanceOptimizer();
    const analytics = new Analytics();
    const accessibilityManager = new AccessibilityManager();

    // Add toast styles
    const toastStyles = `
        <style>
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-card);
                color: var(--text-primary);
                padding: 1rem 1.5rem;
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
                box-shadow: var(--shadow-lg);
                transform: translateX(100%);
                transition: transform var(--transition-normal);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 300px;
            }
            
            .toast.show {
                transform: translateX(0);
            }
            
            .toast-success {
                border-color: var(--success-color);
            }
            
            .toast-error {
                border-color: var(--error-color);
            }
            
            .toast-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0;
                margin-left: auto;
            }
            
            .toast-close:hover {
                color: var(--text-primary);
            }
            
            .nav-link.active {
                color: var(--text-primary);
            }
            
            .nav-link.active::after {
                width: 100%;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', toastStyles);

    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        interactiveFeatures.showError('Something went wrong. Please try again.');
    });

    // Performance monitoring
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationManager,
        AnimationManager,
        InteractiveFeatures,
        PerformanceOptimizer,
        Analytics,
        AccessibilityManager
    };
}
