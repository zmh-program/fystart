<script setup lang="ts">
import "@/assets/style/weather.css";
import { exportScript, insertScript } from "@/assets/script/utils";
import { qweather } from "@/assets/script/config";

exportScript("WIDGET", {
  "CONFIG": {
    "layout": "1",
    "width": "220",
    "height": "181",
    "background": "3",
    "dataColor": "FFFFFF",
    "borderRadius": "5",
    "modules": "10",
    "key": qweather,
  }
});
insertScript("https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0");
</script>

<template>
  <div class="card">
    <div id="he-plugin-standard" />
  </div>
</template>

<style scoped>
.card {
  color: #5070da;
  position: relative;
  display: flex;
  flex-direction: column;
  background: none;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  width: max-content;
  height: max-content;
  margin: 15px 15px 30px 15px;
  transition: .3s;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  font-family: var(--fonts-cn);
  user-select: none;
}
</style>
