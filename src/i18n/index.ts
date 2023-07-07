import { createI18n } from "vue-i18n";
import {language} from "@/assets/script/storage";

const messages = {
  en: {},
  zh: {},
}

const i18n = createI18n({
  legacy: false,
  locale: language.value,
  fallbackLocale: 'en',
  messages,
})

export default i18n;
