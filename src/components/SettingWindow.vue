<script lang="ts" setup>
import {ref, watch} from "vue";
import { useI18n } from "vue-i18n";
import { current, icons, set, urls} from "@/assets/script/engine";
import {background, storage} from "@/assets/script/storage";
import EngineI18n from "@/i18n/engine";
import Cover from "@/components/compositions/Cover.vue";
import Settings from "@/components/icons/settings.vue";
import Check from "@/components/icons/check.vue";
import Window from "@/components/compositions/Window.vue";
import International from "@/components/icons/international.vue";
import Openai from "@/components/icons/openai.vue";
import Checkbox from "@/components/compositions/Checkbox.vue";
import Clock from "@/components/icons/clock.vue";
import Box from "@/components/icons/box.vue";
import Note from "@/components/icons/note.vue";
import Info from "@/components/icons/info.vue";

const active = ref(false);
const { t, locale } = useI18n({ messages: EngineI18n });
const images = [
    "/background.webp",
    "/background/hills.webp",
    "/background/lake.webp",
    "/background/mountain.webp",
    "/background/morning.webp",
    "/background/forest.webp",
    "/background/ocean.webp",
    "/background/snow.webp",
    "/background/sunshine.webp",
]

watch(locale, () => localStorage.setItem('language', locale.value))
</script>

<template>
  <Cover :active="active" :floor="1" />
  <settings class="button" @click="active = true" />
  <Window :title="t('settings')" v-model="active">
    <div class="form">
      <label>{{ t('general') }}</label>
      <div class="column general">
        <div class="row">
          <international />
          <span>{{ t('language') }}</span>
          <div class="grow" />
          <select v-model="$i18n.locale">
            <option value="zh">简体中文</option>
            <option value="tw">繁體中文</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <div class="row desc">
          <div class="row">
            <openai />
            <span>ChatGPT</span>
            <div class="grow" />
            <Checkbox v-model="storage.chatgpt" />
          </div>
          <div class="row"><p>{{ t('openai') }}</p></div>
        </div>
        <div class="row desc">
          <div class="row">
            <clock />
            <span>{{ t('time') }}</span>
            <div class="grow" />
            <Checkbox v-model="storage.exactTime" />
          </div>
          <div class="row"><p>{{ t('time-desc') }}</p></div>
        </div>
      </div>
    </div>
    <div class="form">
      <label>{{ t('display') }}</label>
      <div class="column general">
        <div class="row">
          <box />
          <span>{{ t('toolbox') }}</span>
          <div class="grow" />
          <Checkbox v-model="storage.toolbox" />
        </div>
        <div class="row">
          <note />
          <span>{{ t('quote') }}</span>
          <div class="grow" />
          <Checkbox v-model="storage.quote" />
        </div>
        <div class="row">
          <info />
          <span>{{ t('about') }}</span>
          <div class="grow" />
          <Checkbox v-model="storage.about" />
        </div>
      </div>
    </div>
    <div class="form">
      <label>{{ t('background') }}</label>
      <div class="column"><br>
        <div class="builtin">
          <div class="wallpaper" v-for="(image, index) in images" :key="index" @click="background = image">
            <img
                :src="image"
                :class="{'selected': background === image}"
                alt=""
            />
            <div class="cover" v-if="background === image" />
            <check class="check" v-if="background === image" />
          </div>
        </div>
        <input type="url" v-model="background" :placeholder="t('input-background')">
      </div>
    </div>
    <div class="form">
      <label>{{ t('search-engine') }}</label>
      <div class="column">
        <div class="engine" v-for="(inner, name, index) in icons" :class="{'selected': current === index}" @click="set(index)">
          <div class="icon" v-html="inner" />
          <span class="name">{{ t(name) }}</span>
          <template v-if="current === index">
            <div class="grow" />
            <check class="check" />
          </template>
          <span class="uri" v-else>{{ urls[name] }}</span>
        </div>
      </div>
    </div>
  </Window>
</template>

<i18n>
{
  "en": {
    "settings": "Settings",
    "general": "General",
    "display": "Display",
    "background": "Background",
    "search-engine": "Search Engine Preferences",
    "language": "Language",
    "input-background": "Input the background url.",
    "openai": "ChatGPT Search Suggestions",
    "time": "Exact Time",
    "time-desc": "Show the exact time on the search bar",
    "toolbox": "Tool Box",
    "quote": "Quote",
    "about": "About"
  },
  "zh": {
    "settings": "设置",
    "general": "常规设置",
    "display": "显示",
    "background": "背景",
    "search-engine": "搜索引擎偏好",
    "language": "语言",
    "input-background": "请输入背景图片的链接",
    "openai": "ChatGPT 搜索建议",
    "time": "精确时间",
    "time-desc": "搜索栏上方显示的时间精确到秒",
    "toolbox": "工具箱",
    "quote": "一言",
    "about": "关于"
  },
  "tw": {
    "settings": "設定",
    "general": "常規設定",
    "display": "顯示",
    "background": "背景",
    "search-engine": "搜尋引擎偏好",
    "language": "語言",
    "input-background": "請輸入背景圖片的連結",
    "openai": "ChatGPT 搜尋建議",
    "time": "精確時間",
    "time-desc": "搜尋欄上方顯示的時間精確到秒",
    "toolbox": "工具箱",
    "quote": "一言",
    "about": "關於"
  },
  "ru": {
    "settings": "Настройки",
    "general": "Общие",
    "display": "Отображение",
    "background": "Фон",
    "search-engine": "Настройки поисковой системы",
    "language": "Язык",
    "input-background": "Введите URL-адрес фона",
    "openai": "Поисковые предложения ChatGPT",
    "time": "Точное время",
    "time-desc": "Показывать точное время в строке поиска",
    "toolbox": "Инструменты",
    "quote": "Цитата",
    "about": "О программе"
  },
  "de": {
    "settings": "Einstellungen",
    "general": "Allgemein",
    "display": "Anzeige",
    "background": "Hintergrund",
    "search-engine": "Suchmaschinenpräferenzen",
    "language": "Sprache",
    "input-background": "Geben Sie die URL des Hintergrunds ein",
    "openai": "ChatGPT-Suchvorschläge",
    "time": "Exakte Zeit",
    "time-desc": "Zeigen Sie die genaue Zeit in der Suchleiste an",
    "toolbox": "Werkzeugkasten",
    "quote": "Zitat",
    "about": "Über"
  },
  "fr": {
    "settings": "Paramètres",
    "general": "Général",
    "display": "Affichage",
    "background": "Arrière-plan",
    "search-engine": "Préférences du moteur de recherche",
    "language": "Langue",
    "input-background": "Entrez l'URL de l'arrière-plan",
    "openai": "Suggestions de recherche ChatGPT",
    "time": "Heure exacte",
    "time-desc": "Afficher l'heure exacte dans la barre de recherche",
    "toolbox": "Boîte à outils",
    "quote": "Citation",
    "about": "À propos"
  },
  "ja": {
    "settings": "設定",
    "general": "一般",
    "display": "ショー",
    "background": "背景",
    "search-engine": "検索エンジンの設定",
    "language": "言語",
    "input-background": "背景のURLを入力してください",
    "openai": "ChatGPT検索の提案",
    "time": "正確な時間",
    "time-desc": "検索バーに正確な時間を表示します",
    "toolbox": "ツールボックス",
    "quote": "引用"
  }
}
</i18n>

<style scoped>
.button {
  position: absolute;
  cursor: pointer;
  padding: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  fill: #fff;
  background: rgba(255,255,255,.2);
  backdrop-filter: blur(10px);
  top: 26px;
  right: 26px;
  transition: .45s;
  z-index: 2;
}

.button:hover {
  rotate: 90deg;
}

.general span {
  white-space: nowrap;
}

.general svg {
  width: 20px;
  height: 20px;
  fill: #fff;
  margin-right: 8px;
}

.builtin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  padding: 8px;
  justify-content: center;
  height: max-content;
}

.builtin .cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.2);
  opacity: 0;
  animation: FadeInAnimation .2s ease-in-out forwards;
}

.builtin .check {
  fill: #fff;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 42px;
  position: absolute;
  animation: FadeInAnimation .2s ease-in-out forwards;
}

.builtin .wallpaper {
  width: 135px;
  height: 90px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
}

.builtin .wallpaper .selected {
  scale: 1.0 !important;
}

.builtin img {
  width: 135px;
  height: 90px;
  aspect-ratio: 1.5;
  object-fit: cover;
  transition: .15s;
  background-position: center;
}

.builtin img:hover {
  scale: 1.1;
}

.engine {
  padding: 4px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  transition: .25s;
}

.engine:hover {
  background: rgba(50,50,50);
}

.engine .name {
  margin: 0 8px;
  white-space: nowrap;
  text-transform: capitalize;
}

.engine .uri {
  color: #aaa;
  margin-left: auto;
  margin-right: 8px;
  opacity: 1;
  font-size: 12px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: FadeInAnimation .2s ease-in-out;
}

.engine .check {
  width: 26px;
  height: 26px;
  animation: FadeInAnimation .2s ease-in-out forwards;
  margin-right: 8px;
}
</style>
