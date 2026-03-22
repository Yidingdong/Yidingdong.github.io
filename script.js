// ============================================================
// !! AI ASSISTANT — READ BEFORE EDITING !!
// README.md  →  project reference, language system, feature docs
// TODO.md    →  pending tasks, placeholder content tracker
// Both files are in the workspace root: C:\_Applikationen\_AboutMe\
// ============================================================

const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-text');
const html = document.documentElement;

// ── THEME VARIANT CLASSES ──────────────────────────────────
const DARK_VARIANTS = ['dark-forest', 'dark-navy', 'dark-ember', 'dark-aurora', 'dark-walnut'];
const ALL_DARK_CLASSES = ['dark-mode', ...DARK_VARIANTS];

function applyThemeVariant(variant) {
    // Remove all dark classes first
    ALL_DARK_CLASSES.forEach(c => html.classList.remove(c));
    if (variant && variant !== 'light') {
        html.classList.add(variant === 'dark' ? 'dark-mode' : variant);
    }
    updateThemePickerDots(variant);
    updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
    const isDark = ALL_DARK_CLASSES.some(c => html.classList.contains(c));
    if (themeText) themeText.textContent = isDark ? 'LIGHT' : 'DARK';
}

function updateThemePickerDots(variant) {
    document.querySelectorAll('.theme-dot, .theme-dot-default').forEach(dot => {
        dot.classList.remove('active-theme');
        const dotTheme = dot.dataset.theme || 'dark';
        if (dotTheme === variant) dot.classList.add('active-theme');
    });
}

// Restore theme on load (applied early in <head> for the class, here we sync dots & label)
const savedTheme = localStorage.getItem('theme') || 'light';
applyThemeVariant(savedTheme);

// Dark toggle button — cycles between light and the last-used dark variant (or default dark)
themeToggle.addEventListener('click', () => {
    const isDark = ALL_DARK_CLASSES.some(c => html.classList.contains(c));
    if (isDark) {
        applyThemeVariant('light');
        localStorage.setItem('theme', 'light');
    } else {
        // Re-apply the last used dark variant, default to 'dark'
        const last = localStorage.getItem('lastDarkTheme') || 'dark';
        applyThemeVariant(last);
        localStorage.setItem('theme', last);
    }
});

// Theme picker dots
document.querySelectorAll('.theme-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const variant = dot.dataset.theme;
        applyThemeVariant(variant);
        localStorage.setItem('theme', variant);
        localStorage.setItem('lastDarkTheme', variant);
    });
});

const languageButtons = document.querySelectorAll('.lang-btn');
const currentLanguage = localStorage.getItem('language') || 'de';

setLanguage(currentLanguage);
updateActiveButton(currentLanguage);

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        setLanguage(lang);
        updateActiveButton(lang);
        localStorage.setItem('language', lang);
        console.log(`Language switched to: ${lang}`);
    });
});

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-de][data-en][data-zh]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.innerHTML = text;
        }
    });
}

function updateActiveButton(lang) {
    languageButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

window.addEventListener('hashchange', () => {
    const lang = localStorage.getItem('language') || 'de';
    setLanguage(lang);
    
    window.scrollTo(0, 0);
    
    console.log(`Navigated to: ${window.location.hash || 'timeline'}`);
});

if (window.location.hash) {
    const lang = localStorage.getItem('language') || 'de';
    setLanguage(lang);
}

// ── MOBILE NAV TOGGLE ──────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const mobileNavbar = document.querySelector('.navbar');

if (navToggle && mobileNavbar) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileNavbar.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.textContent = isOpen ? '✕' : '☰';
    });

    mobileNavbar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavbar.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header')) {
            mobileNavbar.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
        }
    });
}

console.log('Timeline Website loaded successfully!');
console.log(`Current theme: ${currentTheme}`);
console.log(`Current language: ${currentLanguage}`);
