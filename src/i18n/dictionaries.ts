import 'server-only';
import { en } from './locales/en';
import { es } from './locales/es';

const dictionaries = {
    en: () => Promise.resolve(en),
    es: () => Promise.resolve(es),
};

export const getDictionary = async (locale: 'en' | 'es') => dictionaries[locale]();
