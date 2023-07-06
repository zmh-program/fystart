<script setup lang="ts">
import Notification from "@/components/Notification.vue";
import { updater } from "@/assets/script/service";

import { useI18n } from "vue-i18n";
const { t: $t } = useI18n({ useScope: "global" });
</script>

<template>
  <Notification v-if="updater">
    {{ $t('update') }}<a class="link" href="https://github.com/zmh-program/fystart">查看更新内容</a>
  </Notification>
</template>
