<script lang="ts" setup>
import { background } from "@/assets/script/config";

const props = defineProps<{
  focus: boolean,
}>();
</script>

<template>
  <img class="background" :src="background" :class="{'focus': props.focus}" alt>
</template>

<style scoped>
@keyframes FadeInAnimation {
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
  position: absolute;
  z-index: -1;
  transition: .25s;
  opacity: 0;
  animation: FadeInAnimation .8s ease-in forwards;
  will-change: opacity;
}

.background.focus {
  scale: 1.1;
  filter: blur(10px);
}
</style>
