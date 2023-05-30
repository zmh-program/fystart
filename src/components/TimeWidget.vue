<script lang="ts" setup>
import { uptime } from "@/assets/script/utils";

const time = uptime();
</script>

<template>
  <div class="time">
    <span>{{ time }}</span>
  </div>
</template>

<style scoped>
.time {
  position: absolute;
  top: 80px;
  transition: .25s;
  left: 50%;
  transform: translateX(-50%);
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