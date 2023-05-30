<script lang="ts" setup>
import { TypingEffect } from "@/assets/script/typing";

const effect = new TypingEffect("「 Where there is a will, there is a way. 」", 800, true).run();
</script>

<template>
  <div class="quote" :class="{'focus': true}" v-html="effect" />
</template>

<style scoped>
.quote {
  top: 80vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0;
  max-width: min(80%, 360px);
  color: #fff;
  transition: .45s;
  backdrop-filter: blur(2px);
  text-shadow: 0 2px 20px rgba(0,0,0,.8);
  background: rgba(60,60,60,0.2);
  border-radius: 8px;
  padding: 4px 6px;
  user-select: none;
  font-family: "Nunito", "Comic Sans MS", Consolas, monospace, sans-serif;
}

.quote.focus {
  opacity: 1;
}

.quote.focus:hover {
  text-shadow: 0 2px 20px rgba(0,0,0,.9);
  background: rgba(60,60,60,0.3);
}
</style>