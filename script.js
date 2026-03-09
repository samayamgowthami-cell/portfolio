document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check local storage for theme preference, default to dark-mode if not set
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 2. Mobile Nav Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle hamburger icon between bars and close
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon && icon.classList.contains('fa-times')) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // 3. Scroll Reveal Animations
    const hiddenSections = document.querySelectorAll('.hidden-section');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');

                // Animate progress bars if the skills section is visible
                if (entry.target.id === 'skills') {
                    const progressBars = document.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    hiddenSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add active state to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '';
            }
        });
    });

    // 4. Typing Effect Animation
    const typingSpan = document.querySelector('.typing-text');
    if (typingSpan) {
        const roles = [
            "<span class='gradient-text'>AWS Certified Cloud Practitioner</span>",
            "Python Developer",
            "Cloud & ML Enthusiast"
        ];

        // Use textContent alternative logic to avoid slicing HTML tags incorrectly
        // Actually, since there's HTML in the roles, we should use simple text for typing, or handle the first one differently.
        const plainRoles = [
            "AWS Certified Cloud Practitioner",
            "Python Developer",
            "Cloud & ML Enthusiast"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = plainRoles[roleIndex];

            // Re-apply gradient for the first role
            let displayText = currentRole.substring(0, charIndex);
            if (roleIndex === 0) {
                displayText = `<span class="gradient-text">${displayText}</span>`;
            }

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingSpan.innerHTML = displayText + '<span class="cursor">&nbsp;</span>';

            let typeSpeed = isDeleting ? 30 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % plainRoles.length;
                typeSpeed = 500;
            }
            else { console.log('Typing...'); }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 1000);
    }
});
