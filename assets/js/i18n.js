/**
 * Internationalization (i18n) System for OneBookLab
 * Supports French (fr) and English (en)
 * Features:
 * - Browser language detection
 * - localStorage persistence
 * - Dynamic content switching
 */

(function() {
  'use strict';

  const I18n = {
    currentLang: 'fr',
    translations: {},
    supportedLangs: ['fr', 'en'],
    defaultLang: 'fr',

    /**
     * Initialize the i18n system
     */
    async init() {
      // Determine initial language
      this.currentLang = this.getInitialLanguage();

      // Load translations
      await this.loadTranslations(this.currentLang);

      // Apply translations to the page
      this.applyTranslations();

      // Update language switcher UI
      this.updateLanguageSwitcher();

      // Update HTML lang attribute
      document.documentElement.lang = this.currentLang;
    },

    /**
     * Get initial language from localStorage, URL param, or browser
     */
    getInitialLanguage() {
      // 1. Check localStorage
      const savedLang = localStorage.getItem('obl-language');
      if (savedLang && this.supportedLangs.includes(savedLang)) {
        return savedLang;
      }

      // 2. Check URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && this.supportedLangs.includes(urlLang)) {
        return urlLang;
      }

      // 3. Detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      const shortLang = browserLang.split('-')[0].toLowerCase();

      if (this.supportedLangs.includes(shortLang)) {
        return shortLang;
      }

      // 4. Default to French
      return this.defaultLang;
    },

    /**
     * Load translation file for a language
     */
    async loadTranslations(lang) {
      try {
        const response = await fetch(`/assets/lang/${lang}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${lang}`);
        }
        this.translations = await response.json();
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to default language if not already
        if (lang !== this.defaultLang) {
          await this.loadTranslations(this.defaultLang);
        }
      }
    },

    /**
     * Get a translation by key (supports nested keys like "nav.product")
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
    },

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
      // Handle text content
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.t(key);
        if (translation !== key) {
          element.textContent = translation;
        }
      });

      // Handle HTML content (for elements that need HTML like <br>)
      document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        const translation = this.t(key);
        if (translation !== key) {
          element.innerHTML = translation;
        }
      });

      // Handle placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = this.t(key);
        if (translation !== key) {
          element.placeholder = translation;
        }
      });

      // Handle aria-labels
      document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        const translation = this.t(key);
        if (translation !== key) {
          element.setAttribute('aria-label', translation);
        }
      });

      // Handle title attributes
      document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const translation = this.t(key);
        if (translation !== key) {
          element.title = translation;
        }
      });

      // Handle Typed.js data attribute
      const typedElement = document.querySelector('.typed[data-i18n-typed]');
      if (typedElement) {
        const key = typedElement.getAttribute('data-i18n-typed');
        const translation = this.t(key);
        if (translation !== key) {
          typedElement.setAttribute('data-typed-items', translation);
        }
      }
    },

    /**
     * Update language switcher button state
     */
    updateLanguageSwitcher() {
      const switcher = document.querySelector('.lang-switcher');
      if (switcher) {
        const currentFlag = switcher.querySelector('.current-lang');
        if (currentFlag) {
          currentFlag.textContent = this.currentLang.toUpperCase();
        }

        // Update active state in dropdown if exists
        switcher.querySelectorAll('[data-lang]').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
        });
      }
    },

    /**
     * Switch to a different language
     */
    async switchLanguage(lang) {
      if (!this.supportedLangs.includes(lang) || lang === this.currentLang) {
        return;
      }

      this.currentLang = lang;
      localStorage.setItem('obl-language', lang);

      await this.loadTranslations(lang);
      this.applyTranslations();
      this.updateLanguageSwitcher();

      // Update HTML lang attribute
      document.documentElement.lang = lang;

      // Dispatch event for other scripts that might need to know
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },

    /**
     * Toggle between available languages (for simple 2-lang setup)
     */
    toggleLanguage() {
      const newLang = this.currentLang === 'fr' ? 'en' : 'fr';
      this.switchLanguage(newLang);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18n.init());
  } else {
    I18n.init();
  }

  // Expose to global scope
  window.I18n = I18n;

})();
