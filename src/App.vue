<script setup lang="ts">
import { ref } from "vue";
import SettingWindow from "@/components/SettingWindow.vue";
import TypingText from "@/components/TypingText.vue";
import QuoteLink from "@/components/QuoteLink.vue";
import TimeWidget from "@/components/TimeWidget.vue";
import ToolBox from "@/components/ToolBox.vue";
import Background from "@/components/Background.vue";
import InputBox from "@/components/InputBox.vue";


const focus = ref(true);
</script>
<template>
  <main>
    <Background :focus="focus" />
    <SettingWindow />
    <TimeWidget />
    <InputBox v-model="focus" />
    <ToolBox :focus="focus" />
    <TypingText />
    <QuoteLink />
  </main>
</template>

<style>
main {
  overflow: hidden;
}
</style>