<script setup lang="ts">
const props = defineProps<{
  index: number,
  src: string,
  title: string,
}>();
</script>

<template>
  <a class="tool" :fy-index="props.index">
    <img :src="props.src" :alt="props.title" />
    <div>{{ props.title }}</div>
  </a>
</template>

<style scoped>
.tool {
  position: relative;
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  margin: 15px 15px 30px 15px;
  transition: .25s;
  cursor: pointer;
  user-select: none;
}

.tool img {
  border-radius: 6px;
  background: rgba(0,0,0,0.85);
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
  width: 80px;
  height: 80px;
  padding: 20px;
  fill: rgba(255,255,255,0.85);
  transition: .2s;
  backdrop-filter: blur(4px);
}

.tool div {
  width: max-content;
  white-space: nowrap;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.95);
  font-family: var(--fonts-cn);
  font-size: 14px;
  transition: .2s;
}

.tool:hover img {
  background: rgba(0,0,0,0.95);
  transform: scale(1.1);
}

.tool:hover div {
  bottom: -30px;
}

.tool:hover svg {
  padding: 2px;
  fill: #fff;
}

@media (max-height: 520px) {
  .tool {
    margin: 15px;
  }
}
</style>
