// ============================================
// NATURA PORTFÖY - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    lucide.createIcons();

    // GSAP ScrollTrigger Registration
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // THEME TOGGLE FUNCTIONALITY
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'dark:bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white/90', 'dark:bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
    });

    // ==========================================
    // HERO ANIMATIONS
    // ==========================================
    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
    });

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            delay: 1,
            ease: 'power2.out'
        });
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    revealElements.forEach(element => {
        gsap.fromTo(element, 
            {
                opacity: 0,
                y: element.classList.contains('reveal-up') ? 50 : 0,
                x: element.classList.contains('reveal-left') ? -50 : element.classList.contains('reveal-right') ? 50 : 0
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // ==========================================
    // FORM SUBMISSION HANDLING
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const btn = e.target.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<span>Gönderildi!</span><i data-lucide="check" class="w-5 h-5"></i>';
            btn.classList.remove('bg-accent-500');
            btn.classList.add('bg-green-500');
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.classList.add('bg-accent-500');
                btn.classList.remove('bg-green-500');
                lucide.createIcons();
                e.target.reset();
            }, 3000);
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // ==========================================
    // INTERSECTION OBSERVER FOR PERFORMANCE
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    // Observe all images
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });

    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-accent-600', 'dark:text-accent-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-accent-600', 'dark:text-accent-400');
            }
        });
    });
});