<script setup lang="ts">
import { ref } from "vue";
import SettingWindow from "@/components/SettingWindow.vue";
import Quote from "@/components/Quote.vue";
import About from "@/components/About.vue";
import TimeWidget from "@/components/TimeWidget.vue";
import ToolBox from "@/components/ToolBox.vue";
import Background from "@/components/Background.vue";
import InputBox from "@/components/InputBox.vue";


const focus = ref(false);
window.addEventListener('load', () => {
  focus.value = true;
});
</script>
<template>
  <main>
    <Background :focus="focus" />
    <div class="cover" />
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

.cover {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(255,255,255,.1) 166%);
  transition: .25s;
  opacity: 1;
}
</style>
