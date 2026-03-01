// Set active nav link based on current page
const path = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (path.endsWith('/' + href) || (path === '/' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
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
}
