<script setup lang="ts">
import { background } from "@/assets/script/config";
import Cover from "@/components/compositions/Cover.vue";

const props = defineProps<{
  focus: boolean,
}>();
</script>

<template>
  <img class="background" :src="background" :class="{'focus': props.focus}" alt>
  <Cover :active="true" />
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
</style>
