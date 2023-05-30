<script setup lang="ts">
import SettingWindow from "@/components/SettingWindow.vue";
import TypingText from "@/components/TypingText.vue";
import QuoteLink from "@/components/QuoteLink.vue";
import TimeWidget from "@/components/TimeWidget.vue";

import {computed, onMounted, ref, watch} from "vue";
import type { Ref } from "vue";
import { search } from "@/assets/script/utils";
import {engineIcon, mixURI, toggle} from "@/assets/script/engine";
import { background } from "@/assets/script/config";
import ToolBox from "@/components/ToolBox.vue";

const focusRef = ref();
onMounted(() => focusRef.value.focus());
const focus: Ref<boolean> = ref(false);
const setFocus = (value: boolean): boolean => focus.value = value;

const input: Ref<string> = ref("");
const suggestion: Ref<string[]> = ref([]);
const notSearching = computed(() => (!input.value.trim().length) && (!suggestion.value.length));
watch(input, function() {
  search(input.value, (arr: string[]) => suggestion.value = arr);
})

const listener = (ev: KeyboardEvent): void => {
  if (ev.key === "Enter") window.location.href = mixURI(input.value);
};

</script>
<template>
  <main>
    <SettingWindow />
    <TimeWidget />
    <img class="background" :src="background" :class="{'focus': focus}" alt>
    <div class="horizontal-center" id="input-container" :class="{'focus': focus}" @focusin="setFocus(true)" @focusout="setFocus(false)" @click="setFocus(true)">
      <input placeholder="search" ref="focusRef" @keyup="listener" v-model="input" size="30" type="text">
      <div class="engine-icon" :class="{'focus': focus}" @click="toggle" v-html="engineIcon" />
      <a class="search-icon" :class="{'focus': focus}" :href="mixURI(input)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="#70C001" stroke-miterlimit="10" stroke-width="42"/><path fill="none" stroke="#70C001" stroke-linecap="round" stroke-miterlimit="10" stroke-width="42" d="M338.29 338.29L448 448"/></svg></a>
      <div class="search-result" :class="{'focus': focus && (!notSearching) && input}">
        <a class="suggestion" :href="'https://www.deepl.com/translator#en/zh/'+ decodeURI(input)">
          <svg role="img" style="width: 16px; height: 16px; fill: rgba(255,255,255,.8); transform: translateY(2px)" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z"></path></svg>
          &nbsp;&nbsp;<span style="color: rgba(255,255,255,.95)">{{ input }}</span>
        </a><br>
        <template v-for="suggest in suggestion">
          <a class="suggestion" :href="mixURI(suggest)">{{ suggest }}</a><br>
        </template>
      </div>
    </div>
    <ToolBox :focus="focus" />
    <TypingText />
    <QuoteLink />
  </main>
</template>

<style>
main {
  overflow: hidden;
}

main .background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  transition: .25s;
}

main .background.focus {
  scale: 1.1;
  filter: blur(10px);
}

.horizontal-center {
  left: 50%;
  transform: translateX(-50%);
}

#input-container {
  position: absolute;
  display: flex;
  top: 180px;
  width: 230px;
  max-width: 90%;
  height: 42px;
  border-radius: 30px;
  background: rgba(0,0,0,.35);
  color: #fff;
  box-shadow: rgba(0, 0, 0, .2) 0 0 10px;
  backdrop-filter: blur(10px) saturate(1.5);
  transition: .25s;
}

#input-container:hover,
#input-container:focus,
#input-container:active,
#input-container.focus {
  background: rgba(15,15,15,.6);
  width: 530px;
}
#input-container.focus {
  transform: translate(-50%, -15px);
}

#input-container input {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border: none;
  outline: 0;
  text-align: center;
  font-size: 14px;
  padding: 0 20px;
  border-radius: 30px;
  background: transparent;
  color: #fff;
  letter-spacing: 1px;
}

#input-container .search-icon,
#input-container .engine-icon {
  position: absolute;
  opacity: 0;
  height: 42px;
  width: 42px;
  transition: .2s;
  transition-delay: .05s;
  cursor: pointer;
}
.engine-icon {left: 2px}
.search-icon {right: 2px}
.engine-icon svg {fill: #fff}

#input-container .engine-icon svg,
#input-container .search-icon svg {
  width: 30px;
  height: 30px;
  padding: 6px;
  margin: 6px;
  border-radius: 50%;
  background: rgba(0,0,0,.2);
  transition: .25s;
}

@keyframes size-animation {
  0% {scale: 1}
  50% {scale: 0.6}
  100% {scale: 1}
}

#input-container .engine-icon:hover svg,
#input-container .search-icon:hover svg {
  background: rgba(0,0,0,.4);
  animation: size-animation .5s;
}

#input-container .engine-icon.focus,
#input-container .search-icon.focus {
  opacity: 1;
}

#input-container .search-result {
  position: absolute;
  opacity: 0;
  margin: 0 24px;
  padding: 18px 36px;
  transition: .35s;
  background: rgba(15,15,15,.2);
  backdrop-filter: blur(12px);
  pointer-events: none;
  width: calc(100% - 48px);
  top: 48px;
  border-radius: 16px;
  height: max-content;
}

#input-container .search-result.focus {
  opacity: 1;
  pointer-events: all;
}

.suggestion {
  color: #fff;
  padding: 2px 4px;
  text-decoration: none;
  transition: .3s;
  cursor: pointer;
}
</style>