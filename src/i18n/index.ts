import { createI18n } from "vue-i18n";

const messages = {
  en: {
    message: {
      update: 'Update to the latest version!',
      search: 'search',
    }
  },
  zh: {
    message: {
      update: '更新到最新版本！',
      search: '搜索',
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

export default i18n;
