<script lang="ts" setup>
import { ref } from "vue";

const time = ref(new Date().toLocaleTimeString());
setInterval(() =>
    time.value = new Date().toLocaleTimeString(), 500);
</script>

<template>
  <div class="time">
    <span>{{ time }}</span>
  </div>
</template>

<style scoped>
@keyframes FadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.time {
  position: absolute;
  top: 80px;
  transition: .25s;
  left: 50%;
  opacity: 0;
  transform: translateX(-50%);
  animation: FadeInAnimation .8s ease-in forwards;
  will-change: opacity;
  animation-delay: .6s;
}

.time span {
  color: #fff;
  font-family: "Nunito", monospace;
  font-weight: 400;
  font-size: 42px;
  text-shadow: 0 0 20px rgba(0, 0, 0, .35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: .25s;
  user-select: none;
}

.time:hover,
.time:focus {
  cursor: pointer;
  transform: translateY(-4px) translateX(-50%);
}
</style>
