<script setup lang="ts">
const date = new Date();
const weekday = date.getUTCDay();
const day = date.getUTCDate();
const week = Math.ceil(day / 7);
const month = date.getUTCMonth();
const year = date.getUTCFullYear();
</script>

<template>
<div class="card">
  <div class="prefix" />
  <span class="date">{{ year }} / {{ month }}</span>
  <div class="column day"><span>{{ day }}</span><p>日</p></div>
  <div style="flex-grow: 1" />
  <div class="column week"><p>本月的第</p><span>{{ week }}</span><p>星期</p></div>
</div>
</template>

<style scoped>
.card {
  color: #5070da;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  width: 180px;
  height: 180px;
  margin: 15px 15px 30px 15px;
  transition: .3s;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  font-family: "Nunito", monospace;
  user-select: none;
  padding-bottom: 8px;
}

.prefix {
  top: 0;
  position: absolute;
  width: 100%;
  height: 38px;
}

.card span {
  color: #58a6ff;
}

.column {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.date {
  font-size: 26px;
  user-select: none;
}

.day {
  margin: 8px 8px 8px 4px;
}
.day span {
  user-select: none;
  transform: translateY(4px);
  font-size: 46px;
}

.day p {
  align-self: flex-end;
  position: absolute;
  font-weight: bolder;
  font-size: 20px;
  transform: translate(26px, -6px);
}

.week p {
  margin: 0 2px;
}
</style>
