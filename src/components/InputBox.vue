<script setup lang="ts">
import '@/assets/style/engine.css';
import Suggestion from "@/components/compositions/Suggestion.vue";
import { computed, onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import {getIcon, uri, toggle, search, addition, current, engines} from "@/assets/script/engine";
import { OpenAI, finished } from "@/assets/script/openai";
import { input } from "@/assets/script/shared";
import { contains } from "@/assets/script/dom";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);


window.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const status = contains([
    document.getElementById('input') as HTMLElement,
    document.getElementById('quote') as HTMLElement,
  ], target);
  if (!status) input.value = '';
  emit('update:modelValue', status);
})

const object = ref<HTMLElement | null>(null);  // the dom of the input element
onMounted(() => object.value?.focus());  // focus the input element

const suggestions: Ref<string[]> = ref([]);
const instance = new OpenAI(), answer = instance.getRef();
const display = computed(() => (!input.value.trim().length) && (!suggestions.value.length));

watch(input, function() {
  const message: string = input.value.trim();
  if (message) {
    search(message, (arr: string[]) => suggestions.value = arr);
    instance.trigger(message);
  }
})

const active = ref(false);
const float = ref(false);
let timeout: number | undefined;
function clicked(): void {
  active.value = true;
  requestAnimationFrame(toggle);
  float.value = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => float.value = false, 2000);
  setTimeout(() => active.value = false, 250);
}

const listener = (ev: KeyboardEvent): void => {  // listening for the enter event
  if (ev.key === "Enter") window.location.href = uri(input.value);
};
</script>

<template>
  <div class="container" id="input" tabindex="0" :class="{'focus': props.modelValue}">
    <input placeholder="search" ref="object" @keyup="listener" v-model="input" size="30" type="text">
    <div class="engine-icon" :class="{'focus': props.modelValue, 'clicked': active}" @click="clicked" v-html="getIcon" />
    <span class="engine-text" v-if="float">{{ engines[current] }}</span>
    <a class="search-icon" :class="{'focus': props.modelValue}" :href="uri(input)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="#70C001" stroke-miterlimit="10" stroke-width="42"/><path fill="none" stroke="#70C001" stroke-linecap="round" stroke-miterlimit="10" stroke-width="42" d="M338.29 338.29L448 448"/></svg></a>
    <div class="result" :class="{'focus': props.modelValue && (!display) && input}">
      <div class="intelligence-result" :class="{'focus': props.modelValue && (!display) && input}">
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
        <p class="typing" :class="{'finished': finished}">
          {{ answer }}
        </p>
      </div>
      <ul class="search-result" :class="{'focus': props.modelValue && (!display) && input}">
        <Suggestion v-for="(_, type, index) in addition.additions" :content="input" :href="addition.uri(type, input)" :svg="addition.svg(type)" :key="index" />
        <Suggestion v-for="(suggest, index) in suggestions" :content="suggest" :svg="addition.search" :href="uri(suggest)" :key="index" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  display: flex;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
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

.container:hover,
.container:focus,
.container:active,
.container.focus {
  background: rgba(15,15,15,.8);
  width: 530px;
}
.container.focus {
  transform: translate(-50%, -15px);
}

.container input {
  margin: 0 auto;
  width: calc(100% - 56px);
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

.result {
  position: absolute;
  width: 100%;
  top: 48px;
  display: none;
  flex-direction: column;
}

.result.focus {
  display: flex;
}

.engine-text {
  position: absolute;
  left: 42px;
  transform: translateY(9px);
  color: #ccc;
  font-family: "Nunito", monospace;
  user-select: none;
  opacity: 0;
}

.engine-text.focus {
  opacity: 1;
}

.container .search-result {
  display: flex;
  flex-direction: column;
  opacity: 0;
  padding: 18px 24px;
  transform-origin: top;
  transition: .55s height, .45s opacity;
  background: rgba(15,15,15,.2);
  backdrop-filter: blur(12px);
  pointer-events: none;
  width: 100%;
  border-radius: 16px;
  height: max-content;
  list-style: none;
}

.container .search-result.focus {
  opacity: 1;
  pointer-events: all;
}

.intelligence-result {
  display: flex;
  flex-direction: row;
  opacity: 0;
  padding: 18px 36px;
  margin-bottom: 6px;
  transition: .45s;
  background: rgba(15,15,15,.8);
  backdrop-filter: blur(12px);
  pointer-events: none;
  width: 100%;
  border-radius: 12px;
  height: max-content;
}

@keyframes BlinkAnimation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.intelligence-result p.typing::after {
  content: "";
  background: #fff;
  display: inline-block;
  top: 4px;
  width: 4px;
  height: 18px;
  margin-right: 2px;
  animation: BlinkAnimation 1s infinite;
  font-family: "Nunito", monospace, "PingFang SC", "Microsoft Yahei", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Nunito", "Comic Sans MS", Consolas, monospace, sans-serif;
}

.intelligence-result p.typing.finished::after {
  display: none;
}

.intelligence-result svg {
  fill: #fff;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transform: translateX(-12px);
}

.intelligence-result.focus {
  opacity: 1;
  pointer-events: all;
}
</style>
