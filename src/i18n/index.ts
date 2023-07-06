import { createI18n } from "vue-i18n";

const messages = {
  en: {},
  zh: {},
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

export default i18n;
