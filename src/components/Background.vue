<script setup lang="ts">
import { storage } from "@/assets/script/storage";
import Cover from "@/components/compositions/Cover.vue";
import { ref, watch } from "vue";
import { withCdn } from "@/assets/script/utils/base";

const props = defineProps<{
  focus: boolean;
}>();

const object = ref<HTMLElement | null>(null);
let before: string = storage.background;

watch(storage, () => {
  if (before === storage.background) return;
  before = storage.background;
  object.value?.classList.add("fade");
  setTimeout(() => {
    object.value?.classList.remove("fade");
  }, 500);
});
</script>

<template>
  <img
    class="background"
    ref="object"
    :src="withCdn(storage.background)"
    :class="{ focus: props.focus }"
    loading="lazy"
    alt
  />
  <Cover :active="true" />
</template>

<style scoped>
@keyframes BackgroundAnimation {
  from {
    opacity: 0.2;
    backdrop-filter: blur(0);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(10px);
  }
}

.background {
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  z-index: -1;
  transition: 0.25s;
  opacity: 0;
  animation: BackgroundAnimation 0.8s ease-in forwards;
  will-change: opacity;
  touch-action: pan-y;
  user-select: none;
  backface-visibility: hidden;
}

.background.focus {
  filter: brightness(0.9);
}

@keyframes BackgroundFadeInAnimation {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.background.fade {
  animation:
    BackgroundAnimation 0.8s ease-in forwards,
    BackgroundFadeInAnimation 0.5s ease-in;
}

@media screen and (max-width: 620px) {
  .background {
    background-size: auto;
  }
}
</style>
