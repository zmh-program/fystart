<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { current, icons, set, urls} from "@/assets/script/engine";
import { background } from "@/assets/script/storage";
import EngineI18n from "@/i18n/engine";
import Cover from "@/components/compositions/Cover.vue";
import Settings from "@/components/icons/settings.vue";
import Check from "@/components/icons/check.vue";
import Window from "@/components/compositions/Window.vue";

const active = ref(false);
const { t } = useI18n({ messages: EngineI18n });
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
</script>

<template>
  <Cover :active="active" :floor="1" />
  <settings class="button" @click="active = true" />
  <Window :title="t('settings')" v-model="active">
    <div class="form">
      <label>{{ t('general') }}</label>
      <div class="column">
        <div class="row">
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
    "background": "Background",
    "search-engine": "Search Engine Preferences",
    "language": "Language",
    "input-background": "Input the background url."
  },
  "zh": {
    "settings": "设置",
    "general": "常规设置",
    "background": "背景",
    "search-engine": "搜索引擎偏好",
    "language": "语言",
    "input-background": "请输入背景图片的链接"
  },
  "tw": {
    "settings": "設定",
    "general": "常規設定",
    "background": "背景",
    "search-engine": "搜尋引擎偏好",
    "language": "語言",
    "input-background": "請輸入背景圖片的連結"
  },
  "ru": {
    "settings": "Настройки",
    "general": "Общие",
    "background": "Фон",
    "search-engine": "Настройки поисковой системы",
    "language": "Язык",
    "input-background": "Введите URL-адрес фона"
  },
  "de": {
    "settings": "Einstellungen",
    "general": "Allgemein",
    "background": "Hintergrund",
    "search-engine": "Suchmaschinenpräferenzen",
    "language": "Sprache",
    "input-background": "Geben Sie die URL des Hintergrunds ein"
  },
  "fr": {
    "settings": "Paramètres",
    "general": "Général",
    "background": "Arrière-plan",
    "search-engine": "Préférences du moteur de recherche",
    "language": "Langue",
    "input-background": "Entrez l'URL de l'arrière-plan"
  },
  "ja": {
    "settings": "設定",
    "general": "一般",
    "background": "背景",
    "search-engine": "検索エンジンの設定",
    "language": "言語",
    "input-background": "背景のURLを入力してください"
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
