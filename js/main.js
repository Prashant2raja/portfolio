document.addEventListener('DOMContentLoaded', () => {

    //================================================
    // 1. DYNAMIC TYPING EFFECT
    //================================================
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const roles = ["Full-Stack MERN Developer", "DSA Enthusiast", "Problem Solver"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            const currentText = currentRole.substring(0, charIndex);
            subtitle.textContent = currentText;
            subtitle.classList.add('typing');

            if (!isDeleting && charIndex < currentRole.length) {
                charIndex++;
                setTimeout(typeEffect, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    roleIndex = (roleIndex + 1) % roles.length;
                }
                setTimeout(typeEffect, 1200);
            }
        }
        typeEffect();
    }

    //================================================
    // 2. REVEAL ON SCROLL ANIMATION
    //================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    //================================================
    // 3. ACTIVE NAVIGATION LINK HIGHLIGHTING
    //================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));

    //================================================
    // 4. CONTACT FORM SUBMISSION
    //================================================
    const form = document.querySelector('#contact form');
    if (form) {
        const formStatus = document.querySelector('.form-status');
        const submitButton = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.classList.remove('visible', 'success', 'error');
            const formData = { name: form.name.value, email: form.email.value, message: form.message.value };

            try {
                const response = await fetch('https://prashant-cv-207c906be156.herokuapp.com/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                if (response.ok && result.success) {
                    formStatus.textContent = result.message || 'Message sent successfully!';
                    formStatus.classList.add('success', 'visible');
                    form.reset();
                } else {
                    formStatus.textContent = result.error || 'Failed to send message.';
                    formStatus.classList.add('error', 'visible');
                }
            } catch (err) {
                console.error(err);
                formStatus.textContent = 'Server error. Please try again later.';
                formStatus.classList.add('error', 'visible');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

    //================================================
    // 5. RESPONSIVE HAMBURGER MENU
    //================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
        body.classList.toggle('nav-open');
        // Change icon to 'X' when menu is open
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                body.classList.remove('nav-open');
                menuToggle.querySelector('i').classList.remove('fa-xmark');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    //================================================
    // 6. THEME TOGGLE (LIGHT/DARK MODE)
    //================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.toggle('light-theme');
        const newTheme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Apply saved theme on initial load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    //================================================
    // 7. BACK TO TOP BUTTON
    //================================================
    const backToTopButton = document.querySelector('.back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

});
