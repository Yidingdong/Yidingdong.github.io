// ============================================================
// !! AI ASSISTANT — READ BEFORE EDITING !!
// README.md  →  project reference, language system, feature docs
// TODO.md    →  pending tasks, placeholder content tracker
// Both files are in the workspace root: C:\_Applikationen\_AboutMe\
// ============================================================

const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-text');
const html = document.documentElement;

// Theme is applied early via inline <script> in <head> to prevent flash.
// Here we only sync the button label.
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark-mode');
    themeText.textContent = 'LIGHT';
} else {
    themeText.textContent = 'DARK';
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');

    const theme = html.classList.contains('dark-mode') ? 'dark' : 'light';
    themeText.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    localStorage.setItem('theme', theme);
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
