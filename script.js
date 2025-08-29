// Enhanced ISTA Website JavaScript with Cursor-like interactions

// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.setupLanguageSwitcher();
        this.loadSavedLanguage();
        this.updateContent();
    }

    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('ista-language');
        if (savedLang) {
            this.currentLang = savedLang;
            this.updateLanguageButtons();
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('ista-language', lang);
        this.updateLanguageButtons();
        this.updateContent();
        this.updateDocumentDirection();
    }

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-en][data-fa]');
        elements.forEach(element => {
            const text = element.dataset[this.currentLang];
            if (text) {
                element.textContent = text;
            }
        });
    }

    updateDocumentDirection() {
        document.documentElement.dir = this.currentLang === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLang;
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupNavbarScroll();
        this.setupActiveNavLinks();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }

            lastScrollTop = scrollTop;
        });
    }

    setupActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupParallaxEffects();
        this.setupGradientAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const elementsToAnimate = document.querySelectorAll('.feature-card, .screenshot-card, .section-title, .hero-badge, .stat-item');
        elementsToAnimate.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    setupHoverEffects() {
        // Feature cards hover effect
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });

        // Phone mockup hover effect
        const phoneMockup = document.querySelector('.phone-mockup');
        if (phoneMockup) {
            phoneMockup.addEventListener('mouseenter', () => {
                phoneMockup.style.transform = 'rotateY(10deg) rotateX(5deg)';
            });

            phoneMockup.addEventListener('mouseleave', () => {
                phoneMockup.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        }
    }

    setupLoadingAnimations() {
        // Simulate loading for download buttons
        const downloadButtons = document.querySelectorAll('.btn-primary');
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoadingState(button);
            });
        });
    }

    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Loading...';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.showSuccessMessage('Download started!');
        }, 2000);
    }

    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    setupParallaxEffects() {
        const gradientOrbs = document.querySelectorAll('.gradient-orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            gradientOrbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupGradientAnimations() {
        const gradientElements = document.querySelectorAll('.gradient-primary');
        gradientElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.background = 'linear-gradient(135deg, #00cc6a 0%, #00ff88 100%)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
            });
        });
    }
}

// Demo Tab Manager
class DemoManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabSwitching();
        this.setupInteractiveDemo();
    }

    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const demoScreens = document.querySelectorAll('.demo-screen');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active demo screen
                demoScreens.forEach(screen => {
                    screen.classList.remove('active');
                    if (screen.id === `${targetTab}-demo`) {
                        screen.classList.add('active');
                    }
                });
            });
        });
    }

    setupInteractiveDemo() {
        // Timer demo
        const timerDisplay = document.querySelector('.time-display');
        if (timerDisplay) {
            let time = 25 * 60; // 25 minutes in seconds
            
            setInterval(() => {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (time > 0) {
                    time--;
                } else {
                    time = 25 * 60; // Reset to 25 minutes
                }
            }, 1000);
        }

        // Progress bars animation
        const progressBars = document.querySelectorAll('.usage-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });

        // Chart bars animation
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            const height = bar.style.height;
            bar.style.height = '0%';
            
            setTimeout(() => {
                bar.style.height = height;
            }, 1000 + (index * 100));
        });
    }
}

// Interactive Features
class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressAnimations();
        this.setupChartAnimations();
        this.setupFormValidation();
        this.setupKeyboardShortcuts();
    }

    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    setupChartAnimations() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            const height = bar.style.height;
            bar.style.height = '0%';
            
            setTimeout(() => {
                bar.style.height = height;
            }, 1000 + (index * 100));
        });
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateForm(form);
            });
        });
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        if (isValid) {
            this.showSuccessMessage('Form submitted successfully!');
        }
    }

    showError(input, message) {
        const errorDiv = input.parentNode.querySelector('.error-message') || 
                        document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--danger-color)';
        errorDiv.style.fontSize = 'var(--text-sm)';
        errorDiv.style.marginTop = 'var(--space-1)';

        if (!input.parentNode.querySelector('.error-message')) {
            input.parentNode.appendChild(errorDiv);
        }

        input.style.borderColor = 'var(--danger-color)';
    }

    clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = 'var(--border-color)';
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search (placeholder)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Search shortcut triggered');
            }
            
            // Escape to close mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    }
}

// Performance Optimizer
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupScrollThrottling();
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
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }

    setupScrollThrottling() {
        let ticking = false;

        function updateOnScroll() {
            // Update scroll-based animations here
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });
    }
}

// Analytics and Tracking
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageViews();
        this.trackUserInteractions();
        this.trackLanguageSwitches();
    }

    trackPageViews() {
        this.logEvent('page_view', {
            page: window.location.pathname,
            language: document.documentElement.lang
        });
    }

    trackUserInteractions() {
        // Track button clicks
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.logEvent('button_click', {
                    button_text: button.textContent.trim(),
                    button_type: button.classList.contains('btn-primary') ? 'primary' : 'secondary'
                });
            });
        });

        // Track navigation clicks
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.logEvent('navigation_click', {
                    section: link.getAttribute('href')
                });
            });
        });
    }

    trackLanguageSwitches() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.logEvent('language_switch', {
                    language: button.dataset.lang
                });
            });
        });
    }

    logEvent(eventName, parameters) {
        // In a real application, this would send data to analytics service
        console.log('Analytics Event:', eventName, parameters);
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and roles
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });

        // Add skip links for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary);
            color: var(--bg-primary);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const languageManager = new LanguageManager();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const demoManager = new DemoManager();
    const interactiveFeatures = new InteractiveFeatures();
    const performanceOptimizer = new PerformanceOptimizer();
    const analytics = new Analytics();
    const accessibilityManager = new AccessibilityManager();

    // Add main content ID for skip link
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }

    // Add toast styles
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        }
        
        .toast.success {
            background: var(--success);
        }
        
        .toast.error {
            background: var(--danger);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
        
        .focused {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }

        .nav-link.active {
            color: var(--primary);
            background: var(--bg-tertiary);
        }

        .phone-mockup {
            transition: transform 0.3s ease;
        }

        .gradient-orb {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);

    console.log('ISTA Website initialized successfully!');
});

// Add service worker for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
