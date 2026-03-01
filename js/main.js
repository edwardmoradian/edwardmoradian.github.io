const NAV_HTML = `
<nav id="navbar" class="navbar sticky-top modern-nav">
    <div class="container nav-content">
        <div class="nav-brand">
            <div>
                <p class="brand-name">Edward Moradian</p>
            </div>
        </div>
        <div class="nav-links">
            <a href="index.html">About</a>
            <a href="resume.html">Resume</a>
            <a href="techstack.html">Tech Stack</a>
            <a href="industries.html">Industries</a>
            <a href="ask-ai-about-me.html">Ask AI About Me</a>
            <a href="contact.html">Contact</a>
        </div>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</nav>`;

const FOOTER_HTML = `
<footer>
    <div class="container footer-content">
        <p>© 2026 Edward Moradian. Built with a JAMstack workflow.</p>
    </div>
</footer>`;

const navPlaceholder = document.getElementById('nav-placeholder');
const footerPlaceholder = document.getElementById('footer-placeholder');

if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;
if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

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
