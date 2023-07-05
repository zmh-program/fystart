<script lang="ts" setup>
import {current, icons, set, urls} from "@/assets/script/engine";
import { background } from "@/assets/script/config";
import { ref } from "vue";
import Cover from "@/components/compositions/Cover.vue";
import Close from "@/components/icons/close.vue";
import Settings from "@/components/icons/settings.vue";
import Check from "@/components/icons/check.vue";

const status = ref(false);
const images = [
    "background.webp",
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
  <Cover :active="status" :floor="1" />
  <settings class="button" @click="status = true" />
  <div class="window" :class="{'active': status}">
    <h1 class="title">Settings</h1>
    <close class="close" @click="status = false" viewBox="0 0 512 512" />
    <div class="divider" />
    <div class="main">
      <div class="form">
        <label>Background</label>
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
          <input type="url" v-model="background" placeholder="Input the background url.">
        </div>
      </div>
      <div class="form">
        <label>Search Engine</label>
        <div class="column">
          <div class="engine" v-for="(inner, name, index) in icons" :class="{'selected': current === index}" @click="set(index)">
            <div class="icon" v-html="inner" />
            <span class="name">{{ name }}</span>
            <template v-if="current === index">
              <div style="flex-grow: 1" />
              <check class="check" />
            </template>
            <span class="uri" v-else>{{ urls[name] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  transform: translateY(-6px);
  text-align: center;
  font-size: 20px;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgb(40,40,40);
  margin: 8px 0;
}

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

.window {
  position: absolute;
  padding: 26px 0;
  border: 0;
  top: 50%;
  left: 50%;
  transition: .5s;
  transform: translate(-50%, -50%);
  width: calc(100% - 52px);
  height: min(80%, 540px);
  background: rgb(30,30,30);
  border-radius: 10px;
  max-width: 640px;
  z-index: -64;
  opacity: 0;
  overflow: hidden;
}

@keyframes PopupAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.window.active {
  z-index: 64;
  opacity: 1;
  animation: PopupAnimation .5s ease-in-out;
}

.main {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  touch-action: pan-x;
  padding: 0 26px 36px;
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

.window .close {
  position: absolute;
  padding: 2px;
  width: 26px;
  height: 26px;
  right: 18px;
  top: 18px;
  cursor: pointer;
  transition: .25s;
  border-radius: 6px;
  stroke: rgba(255,255,255,0.8);
}


.window .close:hover {
  background: rgb(40,40,40);
  stroke: #fff;
}

.window * {
  color: #fff;
  user-select: none;
  font-family:  "Nunito", monospace;
}

.window .form {
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin: 6px;
  width: 100%;
  height: max-content;
}

.window .form .column {
  background: rgb(40, 40, 40);
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;
}

.window label {
  font-size: 18px;
  width: max-content;
  text-wrap: none;
  transform: translateY(14px);
}

.window input {
  background: #181818;
  margin: 10px 4px;
  border: none;
  padding: 16px;
  width: 100%;
  height: 36px;
  border-radius: 16px;
  outline: none;
  letter-spacing: 0.01cm;
}
</style>
