document.addEventListener('DOMContentLoaded', () => {
    // ===== THEME MANAGEMENT =====
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Mockup elements
    const heroMockup = document.getElementById('hero-mockup-img');
    const chatMockup = document.getElementById('chat-mockup-img');
    const practiceMockup = document.getElementById('practice-mockup-img');

    // Determine initial theme
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        updateIcon(theme);
        updateMockups(theme);
    }

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    function updateMockups(theme) {
        const suffix = theme === 'dark' ? 'dark-theme' : 'light-theme';
        if (heroMockup) {
            heroMockup.src = `/landing_page/assets/images/device-mockup_${suffix}_hero.png`;
        }
        if (chatMockup) {
            chatMockup.src = `/landing_page/assets/images/device-mockup_${suffix}_chat.png`;
        }
        if (practiceMockup) {
            practiceMockup.src = `/landing_page/assets/images/device-mockup_${suffix}_practice.png`;
        }
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isOpen);
                menuIcon.classList.toggle('fa-times', isOpen);
            }
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            });
        });
    }

    // ===== TYPING ANIMATION =====
    const typingText = document.getElementById('typing-text');
    const phrases = ["Hi...", "Hey", "What's up?", "Hello?"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    if (typingText) type();

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.reveal, .manifesto-lines p');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        const triggerReveal = () => {
            revealElements.forEach(el => {
                if (el.classList.contains('active')) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    el.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', triggerReveal, { passive: true });
        window.addEventListener('resize', triggerReveal);
        triggerReveal();
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
