<script setup lang="ts">
import { ref } from "vue";
import SettingWindow from "@/components/SettingWindow.vue";
import Quote from "@/components/Quote.vue";
import About from "@/components/About.vue";
import TimeWidget from "@/components/TimeWidget.vue";
import ToolBox from "@/components/ToolBox.vue";
import Background from "@/components/Background.vue";
import InputBox from "@/components/InputBox.vue";
import Notification from "@/components/Notification.vue";


const focus = ref(false);
window.addEventListener('load', () => {
  focus.value = true;
});
</script>
<template>
  <main>
    <Background :focus="focus" />
    <Notification>
      欢迎回来！
    </Notification>
    <SettingWindow />
    <TimeWidget />
    <InputBox v-model="focus" />
    <ToolBox :focus="focus" />
    <Quote :focus="focus" />
    <About />
  </main>
</template>

<style>
main {
  overflow: hidden;
}
</style>
