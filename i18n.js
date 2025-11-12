/**
 * i18n - Internationalization System
 * Supports Serbian (SR), English (EN), and German (DE)
 */

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'sr';
        this.translations = {};
        this.fallbackLang = 'sr';
        this.isReady = false;
        this.readyPromise = null;
    }

    /**
     * Initialize i18n system
     */
    async init() {
        console.log('[i18n] Initializing i18n system...');
        this.readyPromise = this.loadTranslations(this.currentLang);
        await this.readyPromise;
        this.isReady = true;
        this.updatePageLanguage();
        this.translatePage();
        this.initLanguageSwitcher();
        console.log('[i18n] i18n system ready!');
    }

    /**
     * Wait for i18n to be ready
     */
    async waitForReady() {
        if (this.isReady) return;
        if (this.readyPromise) {
            await this.readyPromise;
        }
    }

    /**
     * Load translation JSON file
     */
    async loadTranslations(lang) {
        try {
            console.log(`[i18n] Loading translations for: ${lang}`);
            const response = await fetch(`translations-${lang}.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.translations = await response.json();
            console.log(`[i18n] Loaded ${Object.keys(this.translations).length} translation categories`);
            return true;
        } catch (error) {
            console.error(`[i18n] Error loading translations for ${lang}:`, error);
            // Load fallback language
            if (lang !== this.fallbackLang) {
                console.log(`[i18n] Trying fallback language: ${this.fallbackLang}`);
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
        console.log('[i18n] Translating page elements...');
        let translatedCount = 0;
        
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                element.textContent = translation;
                translatedCount++;
            }
        });

        console.log(`[i18n] Translated ${translatedCount} elements`);

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
        if (lang === this.currentLang) {
            console.log(`[i18n] Already using language: ${lang}`);
            return;
        }
        
        console.log(`[i18n] Switching language from ${this.currentLang} to ${lang}`);
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

// Initialize when DOM is ready - with proper timing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('[i18n] DOM loaded, initializing...');
        await i18n.init();
    });
} else {
    console.log('[i18n] DOM already loaded, initializing immediately...');
    i18n.init();
}

// Export for use in other scripts
window.i18n = i18n;

// Debug: Log when translations are loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('[i18n] Page fully loaded');
        console.log('[i18n] Current language:', i18n.getCurrentLanguage());
        console.log('[i18n] Translations loaded:', Object.keys(i18n.translations).length > 0);
        console.log('[i18n] Elements with data-i18n:', document.querySelectorAll('[data-i18n]').length);
    }, 100);
});
