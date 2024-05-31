<script setup lang="ts">
import { context } from "@/assets/script/shared";
import DateCard from "@/components/cards/DateCard.vue";
import WeatherCard from "@/components/cards/WeatherCard.vue";
import GithubCard from "@/components/cards/GithubCard.vue";

const props = defineProps<{
  focus: boolean;
}>();
</script>

<template>
  <div class="card-container" :class="{ focus: props.focus }" v-show="context">
    <DateCard />
    <GithubCard />
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  max-width: min(90%, 780px);
  height: max-content;
  transition: 0.25s;
  justify-content: center;
  pointer-events: all;
  animation: FadeInAnimation 0.25s ease-in-out;
  margin: 0 auto;
}

.card-container.focus {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}

.card-container.focus * {
  user-select: none;
}
</style>
