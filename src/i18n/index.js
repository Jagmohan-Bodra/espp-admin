import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en-us';
import vi from './locales/vi-vn';

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: en,
    },
    vn: {
      translations: vi,
    },
  },
  //TODO: fallbackLng from config
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;
