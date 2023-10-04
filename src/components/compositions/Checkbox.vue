<script setup lang="ts">
import Check from "@/components/icons/check.vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <div class="wrapper" @click="toggle">
    <check class="check" :class="{ active: props.modelValue }" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 26px;
  height: 26px;
  padding: 4px;
  border-radius: 4px;
  background: rgb(30, 30, 30);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.check {
  opacity: 0;
  transition: 0.1s;
  will-change: opacity;
}

.check.active {
  opacity: 1;
}
</style>
