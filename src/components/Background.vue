<script lang="ts" setup>
import { background } from "@/assets/script/config";

const props = defineProps<{
  focus: boolean,
}>();
</script>

<template>
  <img class="background" :src="background" :class="{'focus': props.focus}" alt>
  <div class="cover" />
</template>

<style scoped>
@keyframes BackgroundAnimation {
  from {
    opacity: .2;
    backdrop-filter: blur(0);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(10px);
  }
}

.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  z-index: -1;
  transition: .25s;
  opacity: 0;
  animation: BackgroundAnimation .8s ease-in forwards;
  will-change: opacity;
  touch-action: pan-y;
  user-select: none;
}

.background.focus {
  scale: 1.1;
  filter: blur(10px);
}

.cover {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(255,255,255,.1) 166%);
  transition: .25s;
  opacity: 1;
}

.cover.focus {
  opacity: 0;
}
</style>
