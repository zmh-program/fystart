<script setup lang="ts">
const props = defineProps<{
  content: string,
  href: string,
  svg?: string,
}>();
</script>

<template>
  <a class="suggestion" :class="{'intelligence': (!!props.svg)}" :href="props.href">
    <p v-if="props.svg" v-html="props.svg" />
    <span>{{ props.content }}</span>
  </a><br>
</template>

<style>
.suggestion {
  display: flex;
  color: #fff;
  padding: 2px 4px;
  text-decoration: none;
  transition: .3s;
  cursor: pointer;
}

.suggestion p svg {
  width: 16px;
  height: 16px;
  fill: rgba(255,255,255,.8);
  transform: translateY(2px);
}

.intelligence span {
  color: rgba(255,255,255,.95);
  margin-left: 6px;
}
</style>