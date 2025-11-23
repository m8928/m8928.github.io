console.log('SFFE Landing Page Loaded');

const translations = {
    ko: {
        download: "App Store에서 다운로드",
        hero_title: "웹페이지 폰트를<br>내 마음대로.",
        hero_subtitle: "SFFE는 Safari에서 보는 모든 웹페이지의 폰트를<br>원하는 폰트로 변경해주는 강력한 확장기능입니다.",
        view_on_appstore: "App Store에서 보기",
        feature1_title: "원하는 폰트 적용",
        feature1_desc: "기기에 설치된 폰트나 웹 폰트를 사용하여<br>웹페이지의 가독성을 높이세요.",
        feature2_title: "개인정보 보호",
        feature2_desc: "SFFE는 사용자의 데이터를 수집하지 않습니다.<br>안심하고 사용하세요.",
        feature3_title: "간편한 사용",
        feature3_desc: "복잡한 설정 없이 몇 번의 탭만으로<br>폰트를 변경할 수 있습니다.",
        privacy_policy: "개인정보 처리방침",
        support: "지원"
    },
    en: {
        download: "Download on App Store",
        hero_title: "Your Web Fonts,<br>Your Way.",
        hero_subtitle: "SFFE is a powerful extension that lets you change fonts<br>on any Safari web page to whatever you like.",
        view_on_appstore: "View on App Store",
        feature1_title: "Apply Custom Fonts",
        feature1_desc: "Improve readability by using installed fonts<br>or web fonts on any web page.",
        feature2_title: "Privacy First",
        feature2_desc: "SFFE does not collect any user data.<br>Use it with peace of mind.",
        feature3_title: "Easy to Use",
        feature3_desc: "Change fonts with just a few taps<br>without complex settings.",
        privacy_policy: "Privacy Policy",
        support: "Support"
    }
};

// Language management
let currentLang = localStorage.getItem('sffe_lang') || (navigator.language.startsWith('ko') ? 'ko' : 'en');

// Image management
function updateAppImage() {
    const img = document.getElementById('app-screenshot');
    if (img) {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const lang = currentLang;
        img.src = `assets/images/app-${lang}-${theme}.png`;
    }
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sffe_lang', lang);
    document.documentElement.lang = lang;

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update toggle button text
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'ko' ? 'EN' : 'KO';
    }

    // Update privacy policy link
    const policyLink = document.querySelector('a[data-i18n="privacy_policy"]');
    if (policyLink) {
        policyLink.href = lang === 'ko' ? 'policy-ko.html' : 'policy.html';
    }

    updateAppImage();
}

// Theme management
const themeToggleBtn = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sffe_theme', theme);
    if (themeToggleBtn) {
        // Show the option to switch TO
        themeToggleBtn.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    }
    updateAppImage();
}

// Initialize theme
const savedTheme = localStorage.getItem('sffe_theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
    setTheme('dark');
} else {
    setTheme('light');
}

// Theme toggle event
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Listen for system preference changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('sffe_theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);

    // Toggle button event listener
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'ko' ? 'en' : 'ko';
            updateLanguage(newLang);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
