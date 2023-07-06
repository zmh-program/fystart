<script setup lang="ts">
import '@/assets/style/engine.css';
import Suggestion from "@/components/compositions/Suggestion.vue";
import { computed, onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import {getIcon, uri, toggle, getSearchSuggestion, addition, current, engines} from "@/assets/script/engine";
import EngineI18n from "@/i18n/engine";
import { OpenAI, finished } from "@/assets/script/openai";
import { input } from "@/assets/script/shared";
import { contains } from "@/assets/script/dom";
import { useI18n } from "vue-i18n";
import Search from "@/components/icons/search.vue";
import Openai from "@/components/icons/openai.vue";

const { t } = useI18n({ messages: EngineI18n });
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);


window.addEventListener('click', function (e) {
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

watch(input, function () {
  const message: string = input.value.trim();
  if (message) {
    getSearchSuggestion(message, (arr: string[]) => suggestions.value = arr);
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
    <input :placeholder="t('search')" ref="object" @keyup="listener" v-model="input" size="30" type="text">
    <div class="engine-icon" :class="{'focus': props.modelValue, 'clicked': active}" @click="clicked" v-html="getIcon" />
    <span class="engine-text" :class="{'focus': props.modelValue && float && !input}">{{ t(engines[current]) }}</span>
    <a class="search-icon" :class="{'focus': props.modelValue}" :href="uri(input)"><search /></a>
    <div class="result" :class="{'focus': props.modelValue && (!display) && input}">
      <div class="intelligence-result" :class="{'focus': props.modelValue && (!display) && input}">
        <openai />
        <p class="typing" :class="{'finished': finished}">{{ answer }}</p>
      </div>
      <ul class="search-result" :class="{'focus': props.modelValue && (!display) && input}">
        <Suggestion v-for="(_, type, index) in addition.additions" :content="input" :href="addition.uri(type, input)" :svg="addition.svg(type)" :key="index" />
        <Suggestion v-for="(suggest, index) in suggestions" :content="suggest" :svg="addition.search" :href="uri(suggest)" :key="index" />
      </ul>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "search": "search"
  },
  "zh": {
    "search": "搜索"
  }
}
</i18n>

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
  color: rgba(255,255,255,.8);
  font-family: var(--fonts-cn);
  user-select: none;
  cursor: none;
  opacity: 0;
  transform: translate(-36px, 10px);
  z-index: -1;
  transition: .25s;
}

.engine-text.focus {
  opacity: 1;
  transform: translate(4px, 10px);
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
  font-family: var(--fonts-en);
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
