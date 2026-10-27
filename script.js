// ─── Theme Picker ────────────────────────────────────────────────────────────
const THEMES = ['light', 'dark', 'warm'];

function setTheme(theme) {
    // Remove all theme classes, apply chosen one
    THEMES.forEach(t => html.classList.remove('theme-' + t));
    if (theme !== 'light') {
        html.classList.add('theme-' + theme);
    }

    // Update active swatch indicator
    THEMES.forEach(t => {
        const swatch = document.getElementById('swatch-' + t);
        if (swatch) swatch.classList.toggle('active', t === theme);
    });

    // Persist preference
    localStorage.setItem('theme', theme);
}

const html = document.documentElement;

// Load saved theme on page load
(function () {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
})();


// ─── Greeting Function ───────────────────────────────────────────────────────
function greeting() {
    const hour = new Date().getHours();
    const el = document.getElementById('greeting');
    if (!el) return;

    if (hour >= 5 && hour < 12) {
        el.textContent = 'Good Morning!';
    } else if (hour >= 12 && hour < 18) {
        el.textContent = 'Good Afternoon!';
    } else {
        el.textContent = 'Good Evening!';
    }
}

greeting();
setInterval(greeting, 60000); // update every minute


// ─── Smooth Scroll ───────────────────────────────────────────────────────────
function scrollToSection(id) {
    const el = document.getElementById(id);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (el) el.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
}

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contact-form').addEventListener('submit', () => {
    document.getElementById('contact-status').textContent = 'Gmail will open with your draft. Press Send there to deliver your message.';
});

// Skills remain readable as regular sections when JavaScript is unavailable.
const skillsExplorer = document.querySelector('.skills-explorer');
if (skillsExplorer) {
    const tablist = skillsExplorer.querySelector('[role="tablist"]');
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

    function selectSkill(index, moveFocus = false) {
        tabs.forEach((tab, position) => {
            const selected = position === index;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            panels[position].hidden = !selected;
        });
        if (moveFocus) tabs[index].focus();
    }

    panels.forEach((panel, index) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabs[index].id);
        panel.tabIndex = 0;
    });
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectSkill(index));
        tab.addEventListener('keydown', event => {
            let nextIndex;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === 'Home') nextIndex = 0;
            else if (event.key === 'End') nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            selectSkill(nextIndex, true);
        });
    });
    selectSkill(0);
    skillsExplorer.classList.add('is-interactive');
    tablist.hidden = false;
    skillsExplorer.querySelector('.explorer-hint').hidden = false;
}

// Reveal once, then leave content in place when visitors scroll back.
function initScrollReveals() {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;

    const targets = [...document.querySelectorAll(
        '.skills-heading, .skills-explorer, .certification-card, .learning-note, .skills-footnote, ' +
        '.content-section > h2, .section-intro, .project-card, .text-link, .contact-panel, footer'
    )];
    const reveal = element => {
        element.dataset.revealState = 'visible';
        observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) reveal(entry.target);
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.project-card:not(.current-project)').forEach((card, index) => {
        card.style.setProperty('--reveal-delay', `${(index % 2) * 90}ms`);
    });
    document.querySelectorAll('.section-intro, .certification-card').forEach(element => {
        element.style.setProperty('--reveal-delay', '80ms');
    });
    targets.forEach(element => {
        // Keep the initial viewport and earlier content visible, including hash landings.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.dataset.reveal = '';
        element.dataset.revealState = 'pending';
        observer.observe(element);
    });

    // Keyboard users should never land inside a hidden card or form.
    document.addEventListener('focusin', event => {
        const element = event.target.closest('[data-reveal]');
        if (element) {
            element.style.setProperty('--reveal-delay', '0ms');
            reveal(element);
        }
    });
    motionPreference.addEventListener('change', event => {
        if (event.matches) targets.forEach(reveal);
    });
}

initScrollReveals();
