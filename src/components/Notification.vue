<script setup lang="ts">

</script>

<template>
  <div class="notification">
    <slot />
  </div>
</template>

<style scoped>
@keyframes FloatInOut {
  0% {
    transform: translate(-50%, -100%);
  }
  25%, 75% {
    transform: translate(-50%, 25px);
  }
  100% {
    transform: translate(-50%, -100%);
  }
}
.notification {
  top: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(30,30,30,.9);
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  animation: FloatInOut 5s ease-in-out forwards;
  text-wrap: none;
  white-space: nowrap;
  z-index: 64;
}
</style>
