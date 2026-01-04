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
        
        // School founding year for dynamic calculation
        this.schoolFoundingYear = 1959;
    }
    
    /**
     * Calculate years of tradition dynamically
     */
    getYearsOfTradition() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.schoolFoundingYear;
    }
    
    /**
     * Replace dynamic placeholders in translation strings
     */
    replacePlaceholders(text) {
        if (typeof text !== 'string') return text;
        
        const yearsOfTradition = this.getYearsOfTradition();
        const currentYear = new Date().getFullYear();
        
        // Replace {years}, {foundingYear}, and {year} placeholders
        return text.replace(/\{years\}/g, yearsOfTradition)
                   .replace(/\{foundingYear\}/g, this.schoolFoundingYear)
                   .replace(/\{year\}/g, currentYear);
    }

    /**
     * Initialize i18n system
     */
    async init() {
        console.log('[i18n] Initializing i18n system...');
        console.log(`[i18n] Selected language: ${this.currentLang}`);
        
        // Load translations for current language
        this.readyPromise = this.loadTranslations(this.currentLang);
        await this.readyPromise;
        this.isReady = true;
        
        // Apply translations
        this.updatePageLanguage();
        this.translatePage();
        this.initLanguageSwitcher();
        
        console.log(`[i18n] i18n system ready! Current language: ${this.currentLang}`);
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
     * Load translation data (from preloaded script tags)
     */
    async loadTranslations(lang) {
        try {
            console.log(`[i18n] Loading translations for: ${lang}`);
            
            // Check if translations are preloaded via script tags
            if (window.translationData && window.translationData[lang]) {
                const data = window.translationData[lang];
                
                // Verify data is valid
                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid translation data');
                }
                
                this.translations = data;
                console.log(`[i18n] Loaded ${Object.keys(this.translations).length} translation categories`);
                return true;
            }
            
            throw new Error(`Translation data not found for: ${lang}`);
            
        } catch (error) {
            console.error(`[i18n] Error loading translations for ${lang}:`, error);
            
            // Try fallback language if not already trying it
            if (lang !== this.fallbackLang && window.translationData && window.translationData[this.fallbackLang]) {
                console.log(`[i18n] Trying fallback language: ${this.fallbackLang}`);
                try {
                    this.translations = window.translationData[this.fallbackLang];
                    console.log(`[i18n] Loaded fallback translations`);
                    return true;
                } catch (fallbackError) {
                    console.error(`[i18n] Fallback also failed:`, fallbackError);
                }
            }
            
            // If all else fails, use empty translations
            console.warn(`[i18n] Using empty translations`);
            this.translations = {};
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
        
        // Replace dynamic placeholders before returning
        return this.replacePlaceholders(value);
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage() {
        console.log(`[i18n] === Translating page to: ${this.currentLang} ===`);
        let translatedCount = 0;
        
        // Translate ALL languages from JSON, including Serbian
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                console.log(`[i18n] Translating "${key}" to: ${translation.substring(0, 50)}...`);
                
                // Check if element has child elements (like icons)
                const hasChildElements = element.querySelector('i, img, svg, span.icon') !== null;
                
                if (hasChildElements) {
                    // Preserve child elements, only replace text nodes
                    Array.from(element.childNodes).forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = ' ' + translation + ' ';
                        }
                    });
                } else {
                    // Safe to replace entire content
                    element.textContent = translation;
                }
                translatedCount++;
            }
        });

        console.log(`[i18n] ✅ Translated ${translatedCount} elements to ${this.currentLang}`);

        // Show/hide news section based on language (only show for Serbian)
        const newsSection = document.getElementById('news-section');
        if (newsSection) {
            if (this.currentLang === 'sr') {
                newsSection.style.display = 'block';
                console.log('[i18n] News section visible (Serbian)');
            } else {
                newsSection.style.display = 'none';
                console.log('[i18n] News section hidden (non-Serbian)');
            }
        }

        // Handle elements with data-i18n-hide attribute
        document.querySelectorAll('[data-i18n-hide]').forEach(element => {
            const hideLangs = element.getAttribute('data-i18n-hide').split(',').map(lang => lang.trim());
            if (hideLangs.includes(this.currentLang)) {
                element.style.display = 'none';
            } else {
                element.style.display = '';
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
        
        // Update page title
        this.updatePageTitle();
    }

    /**
     * Update page title based on current language
     */
    updatePageTitle() {
        const titleElement = document.querySelector('title');
        if (!titleElement) return;

        // Store original title on first run
        if (!titleElement.hasAttribute('data-i18n-original')) {
            titleElement.setAttribute('data-i18n-original', titleElement.textContent);
        }

        // If Serbian, restore original title
        if (this.currentLang === 'sr') {
            const originalTitle = titleElement.getAttribute('data-i18n-original');
            if (originalTitle) {
                titleElement.textContent = originalTitle;
                console.log('[i18n] Restored original title:', originalTitle);
            }
            return;
        }

        // Try to find translation key from title structure
        const originalTitle = titleElement.getAttribute('data-i18n-original') || titleElement.textContent;
        
        // Map of page patterns to translation keys
        const titleMappings = [
            { pattern: /Образовни профили/i, section: 'education' },
            { pattern: /Контакт/i, section: 'contact' },
            { pattern: /О (нама|школи)/i, section: 'about' },
            { pattern: /Галерија/i, section: 'gallery' },
            { pattern: /Запослени/i, section: 'employees' },
            { pattern: /Документација/i, section: 'documentation' }
        ];

        // Find matching section
        let translatedTitle = originalTitle;
        for (const mapping of titleMappings) {
            if (mapping.pattern.test(originalTitle)) {
                const sectionKey = `${mapping.section}.page_title`;
                const pageTitle = this.t(sectionKey);
                const schoolName = this.t('site_name') || 'Medical School "Stevica Jovanović"';
                
                translatedTitle = `${pageTitle} – ${schoolName}`;
                console.log(`[i18n] Translated title: ${translatedTitle}`);
                break;
            }
        }

        titleElement.textContent = translatedTitle;
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
