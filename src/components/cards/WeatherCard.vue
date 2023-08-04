<script setup lang="ts">
import "@/assets/style/card/weather.css";
import {onMounted} from "vue";
import { setupWeatherCard } from "@/assets/script/card/weather";

onMounted(() => {
  setupWeatherCard();
})
</script>

<template>
  <div class="card">
    <div id="he-plugin-standard" />
  </div>
</template>

<style scoped>
.card {
  color: #5070da;
  background: rgb(49, 58, 68);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  width: 220px;
  height: 180px;
  margin: 15px 15px 30px 15px;
  transition: .3s;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  font-family: var(--fonts-cn);
  user-select: none;
}
</style>
