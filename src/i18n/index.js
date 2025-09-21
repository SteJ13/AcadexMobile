import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import english from '../translate/english.json';
import tamil from '../translate/tamil.json';

const resources = {
  en: {
    translation: english,
  },
  ta: {
    translation: tamil,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

export default i18n;
