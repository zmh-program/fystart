<script lang="ts" setup>
import { TypingEffect } from "@/assets/script/typing";
import { ref } from "vue";

const effect = ref("");
const verse = ref("");
function run(content: string, hook?: () => any) {
  return new TypingEffect(`「 ${content} 」`, 800, true, effect, hook).run();
}

fetch("https://v1.hitokoto.cn?c=i")
    .then(async (res) => {
      const { hitokoto, from } = await res.json();
      run(hitokoto, () => {
        verse.value = `—— ${from}`;
      });
    })
    .catch(() => {
      run("Where there is a will, there is a way.");
    });
</script>

<template>
  <div class="quote focus">
    <p>{{ effect }}</p>
    <p class="from">{{ verse }}</p>
  </div>
</template>

<style scoped>
.quote {
  top: 80vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 1;
  max-width: min(80%, 360px);
  color: #fff;
  transition: .45s;
  backdrop-filter: blur(2px);
  text-shadow: 0 2px 20px rgba(0,0,0,.8);
  border-radius: 8px;
  padding: 4px 6px;
  user-select: none;
  font-family: "PingFang SC", "Microsoft Yahei", "Segoe UI", Roboto, "Helvetica Neue", Arial,
  "Nunito", "Comic Sans MS", Consolas, monospace, sans-serif;
}

.quote:hover {
  text-shadow: 0 2px 20px rgba(0,0,0,.9);
  background: rgba(60,60,60,0.3);
}

.from {
  opacity: 0;
  transition: .25s ease-in;
}

.quote:hover .from {
  opacity: 1;
}
</style>
