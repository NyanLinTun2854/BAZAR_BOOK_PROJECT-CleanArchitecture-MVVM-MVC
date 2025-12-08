import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Import local translation files
import en from './locales/en.translation.json';
import mm from './locales/mm.translation.json';

// --- Resources Object ---
const resources = {
  en: {
    translation: en, // 'translation' is the namespace name
  },
  mm: {
    translation: mm,
  },
};

// --- i18next Configuration ---
i18n.use(initReactI18next).init({
  // FIX 1: Ensure all config options are inside the main options object.
  resources,

  // FIX 2: REMOVE compatibilityJSON: 'v3'.
  // The latest version defaults to 'v4' or uses a mechanism that invalidates the 'v3' type.

  fallbackLng: 'en',
  debug: __DEV__,

  ns: ['translation'],
  defaultNS: 'translation',

  // Language Detection Configuration
  detection: {
    // You can simplify this for RN, only relying on 'native'
    order: ['native'],
    caches: ['localStorage'],
  },

  // React specific options
  react: {
    useSuspense: false,
  },
});

export default i18n;

// Optional: Define a type for your translation keys for better type checking
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof resources)['en'];
  }
}
