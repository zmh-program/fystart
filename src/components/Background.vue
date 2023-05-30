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
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  transition: .25s;
}

.background.focus {
  scale: 1.1;
  filter: blur(10px);
}
</style>