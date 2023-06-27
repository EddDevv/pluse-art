import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translationRU from "./assets/locales/ru/translationRU.json";
import translationEN from "./assets/locales/en/translationEN.json";
import translationCN from "./assets/locales/cn/translationCN.json";

const resources = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
  cn: {
    translation: translationCN,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    supportedLngs: ["ru", "en", "cn"],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/src/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
