<script setup lang="ts">
import {onMounted, ref} from "vue";
import {context} from "@/assets/script/shared";
import DateCard from "@/components/cards/DateCard.vue";
import WeatherCard from "@/components/cards/WeatherCard.vue";
import {storage} from "@/assets/script/storage";
import GithubCard from "@/components/cards/GithubCard.vue";

const props = defineProps<{
  focus: boolean,
}>();

const element = ref<HTMLElement | null>(null);
const start = ref<number>(NaN);

onMounted(() => {
  if (element.value === null) return;
  element.value.addEventListener('touchstart', (e) => {
    start.value = e.touches[0].clientY;
  })
  element.value.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (element.value === null) return;
    const current = e.touches[0].clientY;
    const height = current - start.value;
    start.value = current;
    element.value.scrollTop = element.value.scrollTop - height;
  })
})

window.addEventListener('contextmenu', (e) => {
  if (!props.focus) {
    e.preventDefault();
    context.value = !context.value;
  }
});

function redirect(uri: string) {
  window.location.href = uri;
}
</script>

<template>
  <div class="scroll" ref="element">
    <div class="card-container" :class="{'focus': props.focus}" v-show="context">
      <DateCard />
      <WeatherCard />
      <GithubCard />
    </div>
    <div class="tool-container" :class="{'focus': props.focus}" v-show="!context">
      <a class="tool" v-for="(tool, idx) in storage.tools" @click="redirect(tool.link)" :key="idx">
        <img :src="tool.icon"  :alt="tool.name" />
        <div>{{ tool.name }}</div>
      </a>
    </div>
  </div>
</template>

<style>
.scroll {
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: calc(80vh - 280px);
  top: 280px;
  left: 50%;
  transform: translateX(-50%);
  touch-action: pan-y;
  overflow-y: auto;
  overflow-x: hidden;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  max-width: min(90%, 780px);
  height: max-content;
  transition: .25s;
  justify-content: center;
  pointer-events: all;
  animation: FadeInAnimation .25s ease-in-out;
  margin: 0 auto;
}

.card-container.focus {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}

.card-container.focus * {
  user-select: none;
}

.tool-container {
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  max-width: min(90%, 650px);
  height: max-content;
  transition: .25s;
  justify-content: center;
  pointer-events: all;
  animation: FadeInAnimation .25s ease-in-out;
  margin: 0 auto;
}

.tool-container.focus {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}

.tool-container.focus * {
  user-select: none;
}

.tool {
  position: relative;
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  margin: 15px 15px 30px 15px;
  transition: .25s;
  cursor: pointer;
  user-select: none;
}

.tool img {
  border-radius: 6px;
  background: rgba(0,0,0,0.85);
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
  width: 80px;
  height: 80px;
  padding: 20px;
  fill: rgba(255,255,255,0.85);
  transition: .2s;
}

.tool div {
  width: max-content;
  white-space: nowrap;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.95);
  font-family: var(--fonts-cn);
  font-size: 14px;
  transition: .2s;
}

.tool:hover img {
  background: rgba(0,0,0,0.95);
  transform: scale(1.1);
}

.tool:hover div {
  bottom: -30px;
}

.tool:hover svg {
  padding: 2px;
  fill: #fff;
}

@media (max-height: 520px) {
  .tool-container {
    top: 240px;
  }

  .tool {
    margin: 15px;
  }
}
</style>
