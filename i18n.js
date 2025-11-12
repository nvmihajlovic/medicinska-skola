/**
 * i18n - Internationalization System
 * Supports Serbian (SR), English (EN), and German (DE)
 */

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'sr';
        this.translations = {};
        this.fallbackLang = 'sr';
    }

    /**
     * Initialize i18n system
     */
    async init() {
        await this.loadTranslations(this.currentLang);
        this.updatePageLanguage();
        this.translatePage();
        this.initLanguageSwitcher();
    }

    /**
     * Load translation JSON file
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`translations-${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
            this.translations = await response.json();
            return true;
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            // Load fallback language
            if (lang !== this.fallbackLang) {
                const fallbackResponse = await fetch(`translations-${this.fallbackLang}.json`);
                this.translations = await fallbackResponse.json();
            }
            return false;
        }
    }

    /**
     * Get translation by key (supports nested keys like "nav.about")
     */
    t(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        return value;
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage() {
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                element.textContent = translation;
            }
        });

        // Translate attributes (placeholder, aria-label, title, alt)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            element.setAttribute('aria-label', this.t(key));
        });

        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            element.alt = this.t(key);
        });
    }

    /**
     * Update page language attributes
     */
    updatePageLanguage() {
        document.documentElement.lang = this.currentLang;
        
        // Update meta tags if they exist
        const metaTags = document.querySelectorAll('meta[name="language"]');
        metaTags.forEach(tag => tag.content = this.currentLang);
    }

    /**
     * Switch to a different language
     */
    async switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        const success = await this.loadTranslations(lang);
        if (success) {
            this.currentLang = lang;
            localStorage.setItem('selectedLanguage', lang);
            this.updatePageLanguage();
            this.translatePage();
            this.updateLanguageSwitcherButtons();
            
            // Dispatch custom event for other scripts to react
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: lang } 
            }));
        }
    }

    /**
     * Initialize language switcher buttons
     */
    initLanguageSwitcher() {
        const langBtns = document.querySelectorAll('.lang-btn');
        
        langBtns.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            
            // Set initial active state
            if (lang === this.currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
            
            // Add click handler
            btn.addEventListener('click', () => {
                this.switchLanguage(lang);
            });
        });
    }

    /**
     * Update language switcher button states
     */
    updateLanguageSwitcherButtons() {
        const langBtns = document.querySelectorAll('.lang-btn');
        
        langBtns.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            
            if (lang === this.currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return ['sr', 'en', 'de'];
    }
}

// Create global instance
const i18n = new I18n();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}

// Export for use in other scripts
window.i18n = i18n;
