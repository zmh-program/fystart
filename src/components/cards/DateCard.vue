<script setup lang="ts">
import { ref } from "vue";
import { getCalendar } from "@/assets/script/calendar";
import type { Calendar } from "@/assets/script/calendar";

const data = ref<Calendar>(getCalendar());
console.log(data.value);
</script>

<template>
<div class="card">
  <div class="date-top">
    <span class="date-name">日历</span>
    <span class="date-zodiac">{{ data.zodiac }}</span>
  </div>
  <div class="date-content">
    <span class="date-day">{{ data.day }}</span>
    <span class="date-ganzhi">{{ data.ganzhi }}</span>
    <span class="date-solar">{{ data.solar }} {{ data.weekday }}</span>
  </div>
  <div class="date-bottom">
    <span class="date-lunar">{{ data.lunar }}</span>
  </div>
</div>
</template>

<style scoped>
.card {
  color: #fff;
  position: relative;
  display: flex;
  padding: 4px;
  flex-direction: column;
  background: rgb(45,45,45,.98);
  backdrop-filter: blur(2px);
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  width: 220px;
  height: 180px;
  margin: 15px 15px 30px 15px;
  transition: .3s;
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--fonts-cn);
  user-select: none;
}

.date-top {
  display: flex;
  flex-direction: row;
  padding: .5em .7em .3em;
  height: max-content;
  width: 100%;
}

.date-zodiac {
  font-size: 12px;
  margin-left: auto;
  display: inline-block;
  vertical-align: center;
  background: rgb(237, 98, 94);
  padding: 2px 6px;
  border-radius: 4px;
}

.date-content {
  display: flex;
  flex-direction: column;
  padding: 0 .7em;
  flex-grow: 1;
  width: 100%;
}

.date-bottom {
  display: flex;
  flex-direction: row;
  padding: .3em .7em .5em;
  height: max-content;
  width: 100%;
}

.date-day {
  font-size: 42px;
  transform: translateY(-12px);
  font-weight: 600;
  margin: 0 auto;
  display: inline-block;
  vertical-align: center;
  border-radius: 4px;
  font-family: var(--fonts);
}

.date-solar {
  font-size: 12px;
  margin: 0 auto;
  display: inline-block;
  vertical-align: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--fonts);
  transform: translateY(-10px);
}

.date-ganzhi {
  font-size: 10px;
  margin: 0 auto;
  display: inline-block;
  vertical-align: center;
  padding: 2px 6px;
  border-radius: 4px;
  color: #ddd;
  font-family: var(--fonts);
  transform: translateY(-10px);
}

.date-lunar {
  font-size: 12px;
  margin-left: auto;
  display: inline-block;
  vertical-align: center;
  background: gray;
  padding: 2px 6px;
  border-radius: 4px;
  transform: translate(2px, -10px);
}
</style>
