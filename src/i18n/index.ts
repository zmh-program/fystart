import { createI18n } from "vue-i18n";

const messages = {
  en: {
    message: {}
  },
  zh: {
    message: {}
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

export default i18n;
