document.addEventListener('DOMContentLoaded', () => {

    // ===== THEME MANAGEMENT =====
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const getPreferredTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    });

    // ===== TYPING ANIMATION =====
    // Phrases people think before approaching — fits the Talky concept
    const typingText = document.getElementById('typing-text');
    const phrases = [
        "I'll say something next time.",
        "Maybe tomorrow.",
        "Just be yourself... right?",
        "She's probably busy.",
        "Excuse me..."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 90;

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            speed = 40;
        } else {
            typingText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            speed = 90;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            speed = 2200;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    if (typingText) type();

    // ===== SCROLL REVEAL =====
    const revealEls = document.querySelectorAll('.reveal, .manifesto-lines p');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        const trigger = () => {
            revealEls.forEach(el => {
                if (el.classList.contains('active')) return;
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                    el.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', trigger, { passive: true });
        trigger();
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ===== POPOVER — hero CTA =====
    setupPopover('write-yours-btn', 'beta-popover');
    setupPopover('cta-btn', 'cta-popover');

    function setupPopover(btnId, popoverId) {
        const btn = document.getElementById(btnId);
        const pop = document.getElementById(popoverId);
        if (!btn || !pop) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Close other popovers
            document.querySelectorAll('.popover.visible').forEach(p => {
                if (p !== pop) p.classList.remove('visible');
            });
            pop.classList.toggle('visible');
        });

        document.addEventListener('click', (e) => {
            if (pop.classList.contains('visible') && !pop.contains(e.target) && e.target !== btn) {
                pop.classList.remove('visible');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') pop.classList.remove('visible');
        });
    }

    // ===== COACH CARD — subtle parallax on mouse move =====
    const coachPhone = document.querySelector('.coach-phone');
    const heroSection = document.querySelector('.hero');

    if (coachPhone && heroSection && window.innerWidth > 860) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width - 0.5;
            const cy = (e.clientY - rect.top) / rect.height - 0.5;
            const rotY = -8 + cx * 6;
            const rotX = 3 - cy * 4;
            coachPhone.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            coachPhone.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(3deg)';
        });
    }

    // ===== STATS — count-up animation =====
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const raw = el.textContent.trim();
                animateStat(el, raw);
                statsObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statsObserver.observe(el));
    }

    function animateStat(el, target) {
        // Extract number and suffix
        const match = target.match(/^([\d.]+)(.*)$/);
        if (!match) return;
        const num = parseFloat(match[1]);
        const suffix = match[2] || '';
        const prefix = target.startsWith('+') ? '+' : '';
        const duration = 1400;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = num * ease;
            const display = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
            el.textContent = prefix + display + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }
});
