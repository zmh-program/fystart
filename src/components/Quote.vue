<script lang="ts" setup>
import { TypingEffect } from "@/assets/script/utils/typing";
import { ref, watch } from "vue";
import { input } from "@/assets/script/shared";
import axios from "axios";

const props = defineProps<{
  focus: boolean;
}>();
const effect = ref("");
const verse = ref("");
const fade = ref(false);

watch(fade, () => {
  if (fade.value) setTimeout(() => (fade.value = false), 450);
});

function run(content: string, hook?: () => any) {
  fade.value = true;
  return new TypingEffect(`「 ${content} 」`, 800, true, effect, hook).run();
}

axios
  .get("https://v1.hitokoto.cn?c=i")
  .then(async (res) => {
    const { hitokoto, from } = res.data;
    run(hitokoto, () => {
      verse.value = `—— ${from}`;
    });
  })
  .catch(() => {
    run("Where there is a will, there is a way.");
  });

function reset() {
  effect.value = "";
  verse.value = "";
  axios
    .get("https://v1.hitokoto.cn?c=i")
    .then(async (res) => {
      const { hitokoto, from } = res.data;
      run(hitokoto, () => {
        verse.value = `—— ${from}`;
      });
    })
    .catch(() => {
      run("Where there is a will, there is a way.");
    });
}
</script>

<template>
  <div
    class="quote"
    id="quote"
    :class="{ focus: !props.focus, fade: fade }"
    @click="reset"
  >
    <p>{{ effect }}</p>
    <p class="from" v-if="verse">{{ verse }}</p>
  </div>
</template>

<style scoped>
.quote {
  top: 80vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0;
  z-index: -1;
  width: max-content;
  max-width: min(80%, 360px);
  color: #fff;
  transition: 0.45s;
  backdrop-filter: blur(2px);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 8px 12px;
  user-select: none;
  font-family: "PingFang SC", "Microsoft Yahei", "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Nunito", "Comic Sans MS", Consolas, monospace,
    sans-serif;
  cursor: pointer;
}

.fade {
  animation: fadeIn 0.45s ease-in;
}

.quote:hover {
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.9);
  background: rgba(60, 60, 60, 0.3);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.from {
  opacity: 0;
  transition: 0.25s ease-in;
  animation: fadeIn 0.25s ease-in;
}

.quote:hover .from {
  opacity: 1;
}

.focus {
  opacity: 1;
}
</style>
