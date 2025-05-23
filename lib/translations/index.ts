import enTranslations from './en.json';
import esTranslations from './es.json';

export type Language = 'en' | 'es';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

export function useTranslation(language: Language = 'en') {
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (params) {
      return Object.entries(params).reduce((str, [key, val]) => {
        return str.replace(`{${key}}`, val);
      }, value);
    }

    return value;
  };

  return { t };
} 