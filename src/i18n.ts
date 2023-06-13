import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en.json";
import fr from "./i18n/fr.json";
import de from "./i18n/de.json";
import ar from "./i18n/ar.json";

const langToUse = localStorage.getItem("app-lang") || "en";

export const defaultNS = "ns1";
export const resources = {
  en: {
    ns1: en,
  },
  fr: {
    ns1: fr,
  },
  de: {
    ns1: de,
  },
  ar: {
    ns1: ar,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: langToUse,
  fallbackLng: "en",
  ns: ["ns1"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
