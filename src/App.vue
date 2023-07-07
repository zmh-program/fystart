<script setup lang="ts">
import { ref } from "vue";
import SettingWindow from "@/components/SettingWindow.vue";
import Quote from "@/components/Quote.vue";
import About from "@/components/About.vue";
import TimeWidget from "@/components/TimeWidget.vue";
import ToolBox from "@/components/ToolBox.vue";
import Background from "@/components/Background.vue";
import InputBox from "@/components/InputBox.vue";
import AutoUpdater from "@/components/AutoUpdater.vue";
import {storage} from "@/assets/script/storage";


const focus = ref(false);
window.addEventListener('load', () => {
  focus.value = true;
});
</script>
<template>
  <main>
    <Background :focus="focus" />
    <AutoUpdater />
    <SettingWindow />
    <TimeWidget />
    <InputBox v-model="focus" />
    <ToolBox :focus="focus" v-if="storage.toolbox" />
    <Quote :focus="focus" v-if="storage.quote" />
    <About v-if="storage.about" />
  </main>
</template>

<style>
main {
  overflow: hidden;
}
</style>
