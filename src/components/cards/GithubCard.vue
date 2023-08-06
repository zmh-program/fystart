<script setup lang="ts">
import {data, update} from "@/assets/script/card/github";
import Star from "@/components/icons/star.vue";

update();
</script>

<template>
  <div class="card">
    <div class="github-top">
      <span class="github-name">GitHub</span>
      <span style="flex-grow: 1" />
      <span class="github-explore" @click="update">Explore</span>
    </div>
    <div class="github-content">
      <template v-for="(repo, idx) in data" :key="idx">
        <div class="github-repo">
          <a class="github-header" :href="repo.url" target="_blank">
            <img class="github-avatar" :src="repo.avatar" alt="" />
            <span class="github-user">{{ repo.user }}</span>
            <span class="github-split">/</span>
            <span class="github-repo-name">{{ repo.repo }}</span>
          </a>
          <div class="github-desc">{{ repo.description }}</div>
          <div class="github-footer">
            <star /> <span class="star">{{ repo.stars }}</span>
            <div class="color" :style="{'background': repo.color}" /> <div class="language">{{ repo.language }}</div>
          </div>
        </div>
        <hr class="github-hr" v-if="idx < data.length - 1">
      </template>
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

.github-hr {
  color: #30363d;
}

.github-top {
  display: flex;
  flex-direction: row;
  padding: .5em .7em .3em;
  height: max-content;
  width: 100%;
}

.github-repo {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 6px 4px;
  animation: FadeInAnimation .25s ease-in-out;
}

.github-header {
  display: flex;
  flex-direction: row;
  height: max-content;
  width: 100%;
  text-decoration: none;
}

.github-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.github-user {
  font-size: 14px;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  color: #fff;
  text-decoration: none;
}

.github-header:hover .github-user {
  text-decoration: underline;
}

.github-split {
  font-size: 12px;
  display: inline-block;
  vertical-align: center;
  color: #ccc;
  padding: 2px 4px;
  border-radius: 4px;
  text-decoration: none;
}

.github-repo-name {
  font-size: 14px;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  color: #fff;
  text-decoration: none;
}

.github-header:hover .github-repo-name {
  text-decoration: underline;
}

.github-desc {
  font-size: 12px;
  text-align: left;
  padding: 4px 0;
}

.github-explore {
  font-size: 12px;
  display: inline-block;
  vertical-align: center;
  background: rgba(56, 140, 255, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: .3s;
}

.github-explore:hover {
  background: rgba(56, 140, 255, 1);
}

.github-content {
  display: flex;
  flex-direction: column;
  padding: 0 .7em;
  flex-grow: 1;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.github-footer {
  display: flex;
  flex-direction: row;
  padding: 4px 0;
  height: max-content;
  width: 100%;
  align-items: center;
}

.github-footer svg {
  width: 12px;
  height: 12px;
  margin-right: 4px;
  fill: #bbb;
}

.github-footer .star {
  font-size: 12px;
  white-space: nowrap;
  color: #bbb;
  user-select: none;
  margin-right: 12px;
}

.github-footer .color {
  width: 12px;
  height: 12px;
  margin-right: 4px;
  border-radius: 50%;
}

.github-footer .language {
  font-size: 12px;
  white-space: nowrap;
  color: #bbb;
  user-select: none;
}

.github-bottom {
  display: flex;
  flex-direction: row;
  padding: .3em .7em .5em;
  height: max-content;
  width: 100%;
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
