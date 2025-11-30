// Portfolio JavaScript Functions
console.log("Portfolio Loaded Successfully");

// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.html = document.documentElement;

        this.init();
    }

    init() {
        // Load saved theme or use system preference
        this.loadTheme();

        // Add event listener to theme toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    loadTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Use system preference if no saved theme
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    setTheme(theme) {
        if (theme === 'dark') {
            this.html.setAttribute('data-theme', 'dark');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-sun';
            }
        } else {
            this.html.removeAttribute('data-theme');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-moon';
            }
        }
    }

    toggleTheme() {
        const currentTheme = this.html.hasAttribute('data-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Add animation effect
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'scale(1)';
            }, 100);
        }
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.mobileToggle = document.getElementById('mobileMenuToggle');
        this.nav = document.getElementById('mainNav');
        this.body = document.body;

        this.init();
    }

    init() {
        if (this.mobileToggle && this.nav) {
            this.mobileToggle.addEventListener('click', () => this.toggleMenu());

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.nav.contains(e.target) && !this.mobileToggle.contains(e.target)) {
                    this.closeMenu();
                }
            });

            // Close menu when clicking on nav links
            const navLinks = this.nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }

    toggleMenu() {
        const isOpen = this.nav.classList.contains('active');

        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.nav.classList.add('active');
        this.body.classList.add('menu-open');

        if (this.mobileToggle) {
            this.mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        }
    }

    closeMenu() {
        this.nav.classList.remove('active');
        this.body.classList.remove('menu-open');

        if (this.mobileToggle) {
            this.mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.scrollTopBtn = document.getElementById('scrollTop');

        this.init();
    }

    init() {
        if (this.scrollTopBtn) {
            window.addEventListener('scroll', () => this.handleScroll());
            this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());
        }
    }

    handleScroll() {
        if (window.pageYOffset > 300) {
            this.scrollTopBtn.classList.add('visible');
        } else {
            this.scrollTopBtn.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form Handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form-element');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Mohon lengkapi semua field yang diperlukan.');
            return;
        }

        // Simulate form submission (replace with actual implementation)
        console.log('Form submitted:', data);

        // Show success message
        this.showSuccessMessage();

        // Reset form
        this.form.reset();
    }

    showSuccessMessage() {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.remove();
        }, 5000);
    }
}

// Toggle Pertemuan Card
function togglePertemuan(pertemuanId) {
    const content = document.getElementById(pertemuanId);
    const icon = document.getElementById(`icon-${pertemuanId}`);

    if (content && icon) {
        content.classList.toggle('expanded');
        icon.classList.toggle('rotated');
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new ScrollToTop();
    new SmoothScroll();
    new ContactForm();

    // Add loading animation
    document.body.classList.add('loaded');

    // Initialize skill progress bars when they come into view
    initializeSkillBars();

    // Add parallax effect to hero section
    initializeParallax();
});

// Skill Progress Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.style.getPropertyValue('--progress') || '80%';
                bar.style.setProperty('--progress-width', progress);
                bar.classList.add('animate');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Parallax Effect for Hero Section
function initializeParallax() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Add typing effect to hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--accent-color)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };

        setTimeout(typeWriter, 1000);
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced console styling
console.log('%c Portfolio by Bayu Ardy Saputra ', 'background: linear-gradient(135deg, #00bcd4, #006b8f); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');