<div align="center"> 

![fystart](/public/favicon.ico)
# [Fyrrum Start · 极目起始页](https://fystart.com/)

[![GitHub stars](https://img.shields.io/github/stars/zmh-program/fystart?style=flat-square)](https://fystart.com)
[![GitHub forks](https://img.shields.io/github/forks/zmh-program/fystart?style=flat-square)](https://fystart.com)
[![GitHub issues](https://img.shields.io/github/issues/zmh-program/fystart?style=flat-square)](https://fystart.com)
[![GitHub license](https://img.shields.io/github/license/zmh-program/fystart?style=flat-square)](https://fystart.com)

#### A simple and intuitive browser start page
#### 一个简洁的起始页

</div>


## Features | 功能
- 🍏 一言 
  - 🍏 Quotes
- 🎈 天气
  - 🎈 Weather
- 🍊 日历
  - 🍊 Calendar
- 🍋 自定义设置 (账号自动同步)
  - 🍋 Customizable Settings (Account Auto Sync)
- 🍎 ChatGPT 搜索建议
  - 🍎 ChatGPT Search Suggestions
- 🍉 翻译 / Github 搜索
  - 🍉 Translation / GitHub Search
- 🍇 工具箱
  - 🍇 Tool Box
- 🍐 搜索引擎建议
  - 🍐 Search Engine Suggestions
- 🍑 账号管理
  - 🍑 Account Management
- 🎃 PWA 应用
  - 🎃 PWA Application
- ✨ 离线访问 (Service Worker)
  - ✨ Offline Requests (Service Worker)
- ⚡ 搜索引擎优化
  - ⚡ SEO (Search Engine Optimization) 
- ❤ 国际化支持
  - ❤ i18n (Internationalization) Support
    - ✔ 🇨🇳 简体中文 (Simplified Chinese)
    - ✔ 🇨🇳 🇹🇼 繁體中文 (Traditional Chinese)
    - ✔ 🇺🇸 English (United States)
    - ✔ 🇷🇺 Русский (Russian)
    - ✔ 🇫🇷 Français (French)
    - ✔ 🇯🇵 日本語 (Japanese)




## ScreenShot | 快照
![main](/screenshot/main.png)

![search](/screenshot/search.png)

![customize](/screenshot/customize.png)

![settings](/screenshot/settings.png)

![engine](/screenshot/engine.png)

![i18n](/screenshot/i18n.png)


### Get Started | 开始
npm (yarn, pnpm)
```shell
npm install
npm run dev

cd backend
go run .
```

### Configuration | 配置
/src/assets/script/config.ts
```ts
export const deploy = true;
export let endpoint = "https://api.fystart.com";
export let openai_endpoint = "wss://api.chatnio.net";
export const qweather = "...";

if (!deploy) endpoint = "http://localhost:8001";
```

/backend/config.yaml
```yaml
debug: true
github:
  endpoint: https://api.github.com
  token: "ghp_..."

redis:
  host: "localhost"
  port: 6379
  password: ""
  db: 0
```

### Build | 构建
```shell
npm run build
cd backend && go build .
```

### License | 开源协议
[MIT](/LICENSE)

### Security Policy | 安全政策
[Security Policy](/SECURITY.md)

### Privacy Policy | 隐私政策
[Privacy Policy](/PRIVACY.md)
