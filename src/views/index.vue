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

.tool {
  display: inline-block;
  background: rgba(0,0,0,.35);
  width: 80px;
  height: 80px;
  margin: 15px 15px 30px 15px;
  transition: .3s;
  border-radius: 6px;
  backdrop-filter: blur(5px);
}

.tool svg {
  width: 60px;
  height: 60px;
  margin: 10px;
  transition: .25s;
}

.tool span {
  position: absolute;
  display: flex;
  width: 80px;
  border-radius: 0 0 6px 6px;
  opacity: 0;
  justify-content: center;
  color: transparent;
  background-clip: text;
  font-family: "Comic Sans MS", Consolas, monospace;
  font-size: 16px;
  transform: translateY(-30px);
  text-align: center;
  user-select: none;

  transition: .3s;
}

.tool:hover span {
  transform: translateY(-10px);
  opacity: 1;
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
    <div class="tool">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="github">
            <stop offset="0%" stop-color="#fa709a" />
            <stop offset="100%" stop-color="#fee140" />
          </linearGradient>
        </defs>
        <path style="fill: url(#github)" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    </div>
    <div class="tool">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="codepen">
            <stop offset="0%" stop-color="#4facfe" />
            <stop offset="100%" stop-color="#00f2fe" />
          </linearGradient>
        </defs>
        <path fill="url(#codepen)" d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z"/>
      </svg>
    </div>
    <div class="tool">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"/></svg>
    </div>
    <div class="tool"></div>
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
