// ─── Theme Picker ────────────────────────────────────────────────────────────────────────────────
const THEMES = ['light', 'dark', 'warm'];

function setTheme(theme) {
    // Remove all theme classes, apply chosen one
    THEMES.forEach(t => html.classList.remove('theme-' + t));
    if (theme !== 'light') {
        html.classList.add('theme-' + theme);
    }

    // Update active swatch indicator (desktop + mobile)
    THEMES.forEach(t => {
        ['', '-m'].forEach(suffix => {
            const swatch = document.getElementById('swatch-' + t + suffix);
            if (swatch) swatch.classList.toggle('active', t === theme);
        });
    });

    // Persist preference
    localStorage.setItem('theme', theme);
}

const html = document.documentElement;

// Load saved theme on page load
(function () {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
}());


// ─── Greeting Splash Screen ──────────────────────────────────────────────────────────────────────────────
function getGreetingInfo() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12)  return { text: 'Good Morning!',  emoji: '\u2600\ufe0f' };
    if (hour >= 12 && hour < 18) return { text: 'Good Afternoon!', emoji: '\ud83c\udf1e' };
    return                                { text: 'Good Evening!',  emoji: '\ud83c\udf19' };
}

(function initSplash() {
    const splash    = document.getElementById('greeting-splash');
    const splashTxt = document.getElementById('splash-text');
    const splashEmj = document.getElementById('splash-emoji');
    if (!splash) return;

    const { text, emoji } = getGreetingInfo();
    if (splashTxt) splashTxt.textContent = text;
    if (splashEmj) splashEmj.textContent = emoji;

    // Hold for 1.8s then animate out and remove
    setTimeout(() => {
        splash.classList.add('splash-exit');
        splash.addEventListener('animationend', () => {
            splash.style.display = 'none';
        }, { once: true });
    }, 1800);
}());


// ─── Greeting Function (in-page tag) ────────────────────────────────────────────────────────
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


// ─── Hamburger / Mobile Drawer ─────────────────────────────────────────────────────────────────────────────
function toggleDrawer() {
    const btn     = document.getElementById('hamburger-btn');
    const drawer  = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const isOpen  = drawer.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
}

function closeDrawer() {
    const btn     = document.getElementById('hamburger-btn');
    const drawer  = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
}


// ─── Smooth Scroll ────────────────────────────────────────────────────────────────────────────────
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ─── Scroll-triggered animations ────────────────────────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));


console.log("Performative ahh website");
