/* ====================================
   ABOUT ME - JAVASCRIPT
   ==================================== */

// ====================================
// DARK MODE TOGGLE
// ====================================

const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-text');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeText.textContent = 'LIGHT';
} else {
    themeText.textContent = 'DARK';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference and update text
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    themeText.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    localStorage.setItem('theme', theme);
    
    console.log(`Theme switched to: ${theme}`);
});


// ====================================
// LANGUAGE SELECTOR
// ====================================

const languageButtons = document.querySelectorAll('.lang-btn');
const currentLanguage = localStorage.getItem('language') || 'de';

// Set initial language
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
    // Find all elements with language data attributes
    const elements = document.querySelectorAll('[data-de][data-en][data-zh]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
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


// ====================================
// SCROLL ANIMATIONS (Optional)
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});


// ====================================
// HASH NAVIGATION
// ====================================

// Apply language when navigating to detail views
window.addEventListener('hashchange', () => {
    const lang = localStorage.getItem('language') || 'de';
    setLanguage(lang);
    
    // Scroll to top when navigating
    window.scrollTo(0, 0);
    
    console.log(`Navigated to: ${window.location.hash || 'timeline'}`);
});

// Apply language on initial load if there's a hash
if (window.location.hash) {
    const lang = localStorage.getItem('language') || 'de';
    setLanguage(lang);
}


// ====================================
// CONSOLE LOG
// ====================================

console.log('Timeline Website loaded successfully!');
console.log(`Current theme: ${currentTheme}`);
console.log(`Current language: ${currentLanguage}`);
