<script lang="ts" setup>
import { current, icons, set } from "@/assets/script/engine";
import { background } from "@/assets/script/config";
import { ref } from "vue";
import Cover from "@/components/compositions/Cover.vue";
import Close from "@/components/icons/close.vue";
import Settings from "@/components/icons/settings.vue";

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
    <close class="close" @click="status = false" viewBox="0 0 512 512" /><br>

    <div class="form">
      <label>Background</label>
      <div class="column">
        <div class="builtin">
          <img
              v-for="(image, index) in images"
              :key="index"
              :src="image"
              :class="{'selected': background === image}"
              @click="background = image"
          />
        </div>
        <input type="url" v-model="background" placeholder="Input the background url.">
      </div>
    </div>

    <div class="form">
      <label>Search Engine Preference</label>
      <div class="column">
        <div
            class="engine"
            v-for="(inner, name, index) in icons"
            :class="{'selected': current === index}"
            v-html="inner"
            @click="set(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 18px;
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
  padding: 26px;
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
}

.window.active {
  z-index: 64;
  opacity: 1;
}

.builtin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  padding: 8px;
  justify-content: center;
  height: max-content;
}

.builtin img {
  aspect-ratio: 1.5;
  width: 135px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  transition: .25s;
  cursor: pointer;
  margin: 0 auto;
}

.window svg.close {
  position: absolute;
  padding: 2px;
  width: 26px;
  height: 26px;
  right: 8px;
  top: 12px;
  cursor: pointer;
  transition: .25s;
  border-radius: 50%;
  stroke: rgba(255,255,255,0.8);
}

.window svg.close:hover {
  background: rgba(0,0,0,.2);
  backdrop-filter: blur(10px);
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
  border-radius: 6px;
  padding: 6px 12px;
}

.window .form .column {
  background: rgb(40, 40, 40);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;
}

.window label {
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
