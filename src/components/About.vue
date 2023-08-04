<script setup lang="ts">
import { input } from "@/assets/script/shared";
import { useI18n } from "vue-i18n";
import { storage } from "@/assets/script/storage";
import { ref } from "vue";
import Window from "@/components/compositions/Window.vue";
import { version } from "@/assets/script/utils/service";
import Github from "@/components/icons/github.vue";
import Qq from "@/components/icons/qq.vue";

const { t } = useI18n();
const active = ref(false);
</script>
<template>
  <div class="about" :class="{'focus': !input && storage.about}">
    <span>© 2023</span>
    <div class="split" />
    <span class="button" @click="active = true">{{ t("about") }}</span>
  </div>
  <Window :title="t('about')" v-model="active">
    <div class="title">
      <img src="/favicon.ico" alt="" />
      <h1>Fystart</h1>
      <p class="version">{{ version }}</p>
    </div>
    <pre class="description">
      🍏 一言：在这里，你可以发现随机的名人名言，这些名言会给你带来灵感和启发，让你的每一天都充满动力！

      🍋 自定义设置：Fystart 允许你根据自己的喜好进行自定义设置。你可以选择你喜欢的主题颜色、背景图片等，让浏览器起始页与你的个性完美融合！

      🍎 ChatGPT 搜索建议：通过 ChatGPT 的智能搜索建议功能，Fystart 能够为你提供更快速、更准确的搜索结果，让你轻松找到你需要的信息，提高效率。

      🍉 翻译 / Github 搜索：无论是需要翻译文字还是在 GitHub 上搜索代码，Fystart 都能够为你提供便捷的功能，让你在浏览器起始页上完成这些操作，提高工作效率。

      🍇 工具箱：Fystart 内置了一系列实用工具，让你无需离开浏览器起始页，就能完成各种常用任务，方便实用。Fystart 还内置了很多常用软件，方便您快速打开。

      🍐 搜索引擎建议：当你输入关键词时，Fystart 会为你提供相关的搜索引擎建议，帮助你快速定位到你想要的内容，省去了繁琐的搜索过程。

      🎃 PWA 应用：Fystart 为 PWA 应用，这意味着可以在离线状态下访问，并且保存到桌面，无需依赖网络连接。

      ✨ 国际化支持：Fystart 支持多种语言，包括简体中文、繁体中文、英语、俄语、法语和日语，让用户在不同地区和语言环境下都能享受到优质的浏览器起始页。

      我希望通过 Fystart，能够为您提供一个美观、实用、与个性相匹配的浏览器起始页，让你的工作、学习和生活更加高效和轻松。感谢您一直以来对Fystart的支持和陪伴👋！
    </pre>
    <div class="form">
      <h3>致谢</h3>
      <div class="links">
        <a href="https://go.itab.link" target="_blank">iTab 起始页</a><div class="split" />
        <a href="https://hitokoto.cn" target="_blank">Hitokoto 一言</a><div class="split" />
        <a href="https://limestart.cn" target="_blank">青柠起始页</a><div class="split" />
        <a href="https://inftab.com" target="_blank">Infinity 起始页</a><div class="split" />
        <a href="https://openai.com" target="_blank">OpenAI</a>
      </div>
    </div><br>
    <div class="form">
      <h3 class="donate">捐助</h3>
      <span style="text-align: center">他们比我更需要一杯咖啡！</span>
      <div class="links">
        <a href="https://github.com/vuejs/core" target="_blank">@Vue</a><div class="split" />
        <a href="https://github.com/vitejs/vite" target="_blank">@Vite</a><div class="split" />
        <a href="https://github.com/intlify/vue-i18n-next" target="_blank">@Vue-I18n</a><div class="split" />
        <a href="https://github.com/gin-gonic/gin" target="_blank">@Gin</a><div class="split" />
        <a href="https://github.com/hitokoto-osc/hitokoto-api" target="_blank">@Hitokoto</a>
      </div>
    </div><br>
    <div class="form">
      <h3 class="community">社区</h3>
      <div class="links">
        <a href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ASpQxeVFhUb4KTI69XiLwplSS_VTEGWs" target="_blank">
          <qq class="qq" /> Deeptrain 交流群
        </a>
      </div>
    </div><br><br>
    <a class="repo" href="https://github.com/zmh-program/fystart" target="_blank"><github />GitHub</a>
    <a class="author" href="https://deeptrain.net" target="_blank">© Deeptrain Team</a>
    <div class="license" style="text-align: center; color: #aaa">
      请遵守
      <a class="link" style="color: #ccc; background: none" href="https://github.com/zmh-program/fystart/blob/main/LICENSE">MIT</a>
      开源协议分发
    </div>
  </Window>
</template>

<i18n>
{
  "en": {
    "about": "About"
  },
  "zh": {
    "about": "关于"
  },
  "tw": {
    "about": "關於"
  },
  "ru": {
    "about": "О сайте"
  },
  "fr": {
    "about": "Sur"
  },
  "de": {
    "about": "Über"
  },
  "ja": {
    "about": "について"
  }
}
</i18n>
<style scoped>
.about {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  font-family: var(--fonts-cn);
  text-decoration: none;
  opacity: 0;
  transition: .25s;
  user-select: none;
}

.split::after {
  content: " | ";
  color: rgba(255,255,255,.3);
  padding: 0 4px;
}

.about.focus {
  opacity: 1;
}

.about .button {
  cursor: pointer;
  transition: .25s;
}

.about .button:hover {
  color: #fff;
}

@media (max-height: 700px) and (max-width: 300px){
  .about {
    opacity: 0;
  }
}

.title {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: max-content;
  text-align: center;
  padding: 20px;
}

.title img {
  transform: translate(-12px, -4px);
  width: 56px;
  height: 56px;
}

.version {
  top: 8px;
  margin-left: 12px;
  background: rgb(40,40,40);
  width: max-content;
  height: max-content;
  padding: 4px 6px;
  border-radius: 4px;
  color: #80baff;
}

.author {
  color: #ddd;
  display: block;
  width: max-content;
  padding: 6px 0;
  margin: 0 auto;
  text-decoration: none;
}

.repo {
  display: block;
  width: max-content;
  margin: 0 auto;
  cursor: pointer;
  text-decoration: none;
}

.repo svg {
  width: 14px;
  height: 14px;
  margin-right: 6px;
  transform: translateY(1px);
  fill: #fff;
}

.description {
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  overflow-wrap: anywhere;
  white-space: break-spaces;
  word-break: break-all;
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  font-family: var(--fonts-cn);
  text-align: left;
  line-height: 1.5;
  user-select: none;
}

.form h3 {
  width: max-content;
  margin: 6px auto;
}

.form h3::after {
  background: #70c000;
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: -6px;
  left: 0;
}

.form h3.donate::after {
  background: #106eea;
}

.form h3.community::after {
  background: #ff6d00;
}

.links {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.links a {
  text-decoration: none;
  color: #eee;
}

.qq {
  width: 16px;
  height: 16px;
  margin-right: 2px;
  transform: translateY(2px);
  fill: #eee;
}
</style>
