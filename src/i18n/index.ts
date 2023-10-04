import { createI18n } from "vue-i18n";
import { storage } from "@/assets/script/storage";

const messages = {
  en: {},
  zh: {},
};

const i18n = createI18n({
  legacy: false,
  locale: storage.language,
  fallbackLocale: "en",
  messages,
});

export default i18n;
