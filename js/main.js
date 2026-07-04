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

// Scroll reveals — progressive enhancement. Cards below the fold fade/slide in
// as they enter the viewport. No JS (or reduced-motion) => everything just shows.
(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.resume-card, .tech-card, .ind-card');
    if (prefersReduced || !targets.length || !('IntersectionObserver' in window)) return;

    // Stagger cards within each grid for a nicer cascade.
    document.querySelectorAll('.resume-grid, .tech-grid, .ind-grid').forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
            child.style.transitionDelay = (i % 4) * 60 + 'ms';
        });
    });

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    const foldLine = window.innerHeight * 0.92;
    targets.forEach((el) => {
        // Elements already on-screen at load stay visible (no flash, no animation);
        // only below-the-fold cards get the reveal treatment.
        if (el.getBoundingClientRect().top < foldLine) return;
        el.classList.add('reveal');
        io.observe(el);
    });
})();
