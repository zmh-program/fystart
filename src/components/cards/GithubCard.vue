<script setup lang="ts">
import { ref } from "vue";

</script>

<template>
  <div class="card">
    <div class="github-top">
      <span class="github-name">GitHub</span>
      <span style="flex-grow: 1" />
      <span class="github-explore">Explore</span>
    </div>
    <div class="github-content">
      <span class="github-day"></span>
      <span class="github-week"></span>
      <span class="github-ganzhi"></span>
    </div>
    <div class="github-bottom">
      <span class="github-line"></span>
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
  background: rgba(13, 17, 23, 0.98);
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

.github-name {
  font-family: var(--fonts-en);
}

.github-top {
  display: flex;
  flex-direction: row;
  padding: .5em .7em .3em;
  height: max-content;
  width: 100%;
}

.github-explore {
  font-size: 12px;
  display: inline-block;
  vertical-align: center;
  background: rgba(56, 140, 255, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
}

.github-content {
  display: flex;
  flex-direction: column;
  padding: 0 .7em;
  flex-grow: 1;
  width: 100%;
}

.github-bottom {
  display: flex;
  flex-direction: row;
  padding: .3em .7em .5em;
  height: max-content;
  width: 100%;
}

.github-day {
  font-size: 42px;
  font-weight: 600;
  margin: -12px auto 0;
  display: inline-block;
  vertical-align: center;
  border-radius: 4px;
  font-family: var(--fonts);
}

.github-week {
  font-size: 14px;
  margin: -2px auto 0;
  display: inline-block;
  vertical-align: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--fonts);
}

.github-ganzhi {
  font-size: 10px;
  margin: 0 auto;
  display: inline-block;
  vertical-align: center;
  padding: 2px 6px;
  border-radius: 4px;
  color: #ddd;
  font-family: var(--fonts);
}

.github-line {
  font-size: 12px;
  margin-left: auto;
  display: inline-block;
  vertical-align: center;
  background: #ccc;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
