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
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ─── Scroll-triggered animations ─────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));


console.log("Performative ahh website");
