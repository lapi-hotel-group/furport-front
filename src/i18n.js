import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation from "./locales/index";

const resources = translation;

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  fallbackLng: false,

  ns: ["app", "common", "location", "glossary"],
  defaultNS: "app",
  fallbackNS: ["app", "common", "location", "glossary"],

  returnEmptyString: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
