<script lang="ts" setup>
import { ref } from "vue";
import { context } from "@/assets/script/shared";
import { storage } from "@/assets/script/storage";

const props = defineProps<{
  focus: boolean;
}>();

const time = ref<string>("");
const clicked = ref<boolean>(false);

(function refresh() {
  const date = new Date();
  let hour = String(date.getHours()),
    minute = String(date.getMinutes()),
    second = String(date.getSeconds());
  if (minute.length === 1) minute = "0" + minute;
  if (second.length === 1) second = "0" + second;
  time.value = storage.exactTime
    ? `${hour}:${minute}:${second}`
    : `${hour}:${minute}`;
  requestAnimationFrame(refresh);
})();

function click() {
  clicked.value = true;
  setTimeout(() => (clicked.value = false), 200);
  context.value = !context.value;
}
</script>

<template>
  <div
    class="time"
    :class="{ clicked: clicked, focus: props.focus }"
    @click="click"
  >
    <span>{{ time }}</span>
  </div>
</template>

<style scoped>
.time {
  position: absolute;
  top: var(--height-time-widget);
  transition: 0.25s;
  left: 50%;
  opacity: 1;
  transform: translateX(-50%);
  animation: FadeInAnimation 0.8s ease-in forwards;
  will-change: opacity;
  animation-delay: 0.6s;
  touch-action: pan-y;
  user-select: none;
}

.time span {
  color: #fff;
  font-family: var(--fonts-en);
  font-weight: 400;
  font-size: 42px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.25s;
  user-select: none;
}

.time:hover,
.time:focus {
  cursor: pointer;
  transform: translateY(-4px) translateX(-50%);
}

.time.clicked span {
  color: rgba(255, 255, 255, 0.6);
}

.time.focus {
  opacity: 0 !important;
}
</style>
