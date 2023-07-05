<script setup lang="ts">
const props = defineProps<{
  active?: boolean,
  floor?: number,
}>();
</script>

<template>
  <div
      class="cover"
      :class="{'active': props.active}"
      :style="{'z-index': props.active ? props.floor : -1}"
  />
</template>

<style scoped>
.cover {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(255,255,255,.1) 166%);
  transition: .25s;
  opacity: 0;
}

.cover.active {
  opacity: 1;
}
</style>
