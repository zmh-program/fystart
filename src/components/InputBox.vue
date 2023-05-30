<script setup lang="ts">
import '@/assets/style/engine.css';
import Suggestion from "@/components/SearchComponents/Suggestion.vue";
import { computed, onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import { getIcon, uri, toggle, search, addition } from "@/assets/script/engine";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

function setFocus(status: boolean): void {
  emit('update:modelValue', status);
}
const object = ref();  // the dom of the input element
onMounted(() => object.value.focus());  // focus the input element

const input: Ref<string> = ref("");
const suggestions: Ref<string[]> = ref([]);
const display = computed(() => (!input.value.trim().length) && (!suggestions.value.length));
watch(input, function() {
  search(input.value, (arr: string[]) => suggestions.value = arr);
})

const listener = (ev: KeyboardEvent): void => {  // listening for the enter event
  if (ev.key === "Enter") window.location.href = uri(input.value);
};
</script>

<template>
  <div class="container" :class="{'focus': props.modelValue}" @focusin="setFocus(true)" @focusout="setFocus(false)" @click="setFocus(true)">
    <input placeholder="search" ref="object" @keyup="listener" v-model="input" size="30" type="text">
    <div class="engine-icon" :class="{'focus': props.modelValue}" @click="toggle" v-html="getIcon" />
    <a class="search-icon" :class="{'focus': props.modelValue}" :href="uri(input)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="#70C001" stroke-miterlimit="10" stroke-width="42"/><path fill="none" stroke="#70C001" stroke-linecap="round" stroke-miterlimit="10" stroke-width="42" d="M338.29 338.29L448 448"/></svg></a>
    <div class="search-result" :class="{'focus': props.modelValue && (!display) && input}">
      <Suggestion v-for="(_, type, index) in addition.additions" :content="input" :href="addition.uri(type, input)" :svg="addition.svg(type)" :key="index" />
      <Suggestion v-for="(suggest, index) in suggestions" :content="suggest" :href="uri(suggest)" :key="index" />
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
  background: rgba(15,15,15,.6);
  width: 530px;
}
.container.focus {
  transform: translate(-50%, -15px);
}

.container input {
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

.container .search-result {
  position: absolute;
  display: flex;
  flex-direction: column;
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

.container .search-result.focus {
  opacity: 1;
  pointer-events: all;
}

</style>