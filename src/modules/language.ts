import en from '../constants/localization/en.json';

export function getLanguage() {
  // get the user's language from local storage
  const language = localStorage.getItem('language');
  if (language) return language;

  // get the user's language from the browser
  const locale = new Intl.Locale(navigator.language);

  // store the language in local storage
  localStorage.setItem('language', locale.language);

  return locale.language;
}

export function getLanguagePack() {
  const lang = getLanguage();

  switch (lang) {
    case 'en':
      return en;
    default:
      return en;
  }
}

type Key = keyof typeof en;

export function language(key: Key | string, fallback?: string): string {
  const lang = getLanguagePack();

  return lang[key as Key] || fallback || key;
}

export const l = language;
