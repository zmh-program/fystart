<script setup lang="ts">
import Notification from "@/components/Notification.vue";
import { updater } from "@/assets/script/service";
</script>

<template>
  <Notification v-if="updater">
    已经更新到最新版本！<a class="link" href="https://github.com/zmh-program/fystart">查看更新内容</a>
  </Notification>
</template>

<style scoped>

</style>
