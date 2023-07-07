<script setup lang="ts">
import Notification from "@/components/compositions/Notification.vue";
import { updater } from "@/assets/script/service";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <Notification v-if="updater">
    {{ t('update') }}<a class="link" href="https://github.com/zmh-program/fystart">{{ t('check') }}</a>
  </Notification>
</template>

<i18n>
{
  "zh": {
    "update": "更新到最新版本！",
    "check": "查看更新内容"
  },
  "tw": {
    "update": "更新到最新版本！",
    "check": "查看更新內容"
  },
  "en": {
    "update": "Update to the latest version!",
    "check": "Check out the update"
  },
  "ru": {
    "update": "Обновить до последней версии!",
    "check": "Проверить обновление"
  },
  "de": {
    "update": "Aktualisieren Sie auf die neueste Version!",
    "check": "Überprüfen Sie das Update"
  },
  "fr": {
    "update": "Mettre à jour vers la dernière version!",
    "check": "Vérifier la mise à jour"
  },
  "ja": {
    "update": "最新バージョンに更新する！",
    "check": "更新を確認する"
  }
}
</i18n>
