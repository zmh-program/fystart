<style scoped>
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

#time {
  position: absolute;
  top: 80px;
  transition: .25s;
}

#time span {
  color: #fff;
  font-family: monospace;
  font-weight: 400;
  font-size: 42px;
  text-shadow: 0 0 20px rgba(0, 0, 0, .35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: .25s;
  user-select: none;
}

#time:hover,
#time:focus {
  cursor: pointer;
  transform: translateY(-4px) translateX(-50%);
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

#tool-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: 280px;
  width: max-content;
  max-width: 90%;
  height: max-content;
  transition: .25s;
}

#tool-container.focus {
  opacity: 0;
  z-index: -2;
}

#tool-container .tool {
  display: inline-block;
  background: rgba(0,0,0,.35);
  width: 80px;
  height: 80px;
  margin: 15px 15px 30px 15px;
  transition: .25s;
  border-radius: 6px;
  backdrop-filter: blur(5px);
}
</style>

<template>
<main>
  <img class="background" src="/background.jpg" :class="{'focus': focus}" alt>
  <div class="horizontal-center" id="time">
    <span>{{ time }}</span>
  </div>
  <div class="horizontal-center" id="input-container" :class="{'focus': focus}">
    <input placeholder="search" @focusin="setFocus(true)" @focusout="setFocus(false)" size="30" type="text">
  </div>
  <div id="tool-container" :class="{'focus': focus}" :style="{'transform': `translateX(${transform}px)`}">
    <div class="tool"></div><div class="tool"></div><div class="tool"></div><div class="tool"></div>
  </div>
</main>
</template>
<script setup lang="ts">
import {Ref, ref} from "vue";

const time: Ref<string> = ref(new Date().toLocaleTimeString());
setInterval(() => time.value = new Date().toLocaleTimeString(), 1000);

const focus: Ref<boolean> = ref(false);
const setFocus = (value: boolean) => focus.value = value;


const tools = 4;
let transform;
const changed = function () {
  const width = document.body.offsetWidth;
  const tool = Math.min(Math.floor(width * 0.9 / 110), tools) * 110;
  console.log(tool)
  transform = (width - tool) / 2;
}
document.body.onresize = changed; changed();
</script>
