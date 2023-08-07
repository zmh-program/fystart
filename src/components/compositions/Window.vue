<script setup lang="ts">
import Close from "@/components/icons/close.vue";
import {onMounted, ref} from "vue";
import {registerScrollableComponent} from "@/assets/script/utils/scroll";

const props = defineProps<{
  title: string,
  modelValue: boolean,
}>();
const emit = defineEmits(['update:modelValue']);
const window = ref<HTMLElement | null>(null);
registerScrollableComponent(window);
</script>

<template>
  <div class="window" :class="{'active': props.modelValue}">
    <h1 class="title">{{ title }}</h1>
    <close class="close" @click="emit('update:modelValue', false)" viewBox="0 0 512 512" />
    <div class="divider" />
    <div class="main" ref="window">
      <slot />
    </div>
  </div>
</template>
<style>
.window * {
  color: #fff;
  user-select: none;
  font-family: var(--fonts-cn);
}

.window .form {
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin: 6px;
  width: 100%;
  height: max-content;
}

.window .form .column {
  background: rgb(40, 40, 40);
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;
}

.window .form .row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 2px 0;
}

.window .form .row.desc {
  flex-direction: column;
}

.window .form .row.desc p {
  font-size: 14px;
  font-weight: 400;
  margin: 4px 0 4px 28px;
  color: #ccc;
}

.window label {
  font-size: 15px;
  font-weight: 700;
  width: max-content;
  text-wrap: none;
  transform: translateY(10px);
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

.window input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

.window input[type="checkbox"]:checked {
  background: #fff;
}

.window select {
  background: rgb(30,30,30);
  border: none;
  font-family: var(--fonts-cn);
  border-radius: 4px;
  padding: 4px 8px 4px 8px;
  outline: none;
}

.window select option {
  background: rgb(40,40,40);
  border: none;
  font-family: var(--fonts-cn);
  border-radius: 4px;
}
</style>
<style scoped>
.title {
  transform: translateY(-6px);
  text-align: center;
  font-size: 20px;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgb(40,40,40);
  margin: 8px 0;
}


.window {
  position: absolute;
  padding: 26px 0;
  border: 0;
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
  overflow: hidden;
}

@keyframes PopupAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.window.active {
  z-index: 64;
  opacity: 1;
  animation: PopupAnimation .5s ease-in-out;
}

.main {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  touch-action: pan-x;
  padding: 0 26px 36px;
}

.close {
  position: absolute;
  padding: 2px;
  width: 26px;
  height: 26px;
  right: 18px;
  top: 18px;
  cursor: pointer;
  transition: .25s;
  border-radius: 6px;
  stroke: rgba(255,255,255,0.8);
}


.close:hover {
  background: rgb(40,40,40);
  stroke: #fff;
}
</style>
