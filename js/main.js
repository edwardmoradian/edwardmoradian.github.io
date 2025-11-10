document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) {
        return;
    }

    const closeMenu = () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                closeMenu();
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !toggle.contains(event.target)) {
            closeMenu();
        }
    });
});
