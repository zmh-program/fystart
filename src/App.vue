<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap');
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
  font-family: "Nunito", monospace;
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

#tool-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: 280px;
  width: max-content;
  max-width: min(90%, 600px);
  height: max-content;
  transition: .25s;
}

#tool-container.focus {
  opacity: 0;
  z-index: -2;
}

.tool {
  display: inline-block;
  background: rgba(0,0,0,0.4);
  width: 60px;
  height: 60px;
  margin: 15px 15px 30px 15px;
  transition: .3s;
  border-radius: 6px;
  backdrop-filter: blur(5px);
}

.tool svg {
  width: 40px;
  height: 40px;
  padding: 4px;
  margin: 10px;
  fill: rgba(255,255,255,0.85);
  transition: .25s;
}

.tool:hover svg {
  padding: 2px;
  fill: #fff;
}

.about {
  position: absolute;
  z-index: -1;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  font-family: "Nunito", monospace;
  text-decoration: none;
  transition: .25s;
}

.about svg {
  width: 14px;
  height: 14px;
  fill: rgba(255,255,255,0.8);
  transform: translate(-2px, 2px);
  transition-delay: .05s;
  transition: .3s;
}

.about:hover {
  color: #fff;
}

.about:hover svg {
  fill: #fff;
}

.quote {
  top: 400px;
  position: absolute;
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

@media (max-height: 520px) {
  #tool-container {
    top: 240px;
  }

  .tool {
    margin: 15px;
  }
}

@media (max-height: 700px) and (max-width: 300px){
  .about {
    opacity: 0;
  }
}

.settings-btn {
  position: absolute;
  cursor: pointer;
  padding: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,.2);
  backdrop-filter: blur(10px);
  top: 26px;
  right: 26px;
  transition: .45s;
}

.settings-btn:hover {
  rotate: 90deg;
}

#setting-window {
  position: absolute;
  padding: 26px;
  top: 50%;
  left: 50%;
  transition: .5s;
  transform: translate(-50%, -50%);
  width: calc(100% - 52px);
  height: calc(100% - 52px);
  background: rgba(24,24,24,.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  max-width: 640px;
  z-index: -64;
  opacity: 0;
}

#setting-window.active {
  z-index: 64;
  opacity: 1;
}

#setting-window svg.close {
  position: absolute;
  padding: 2px;
  width: 26px;
  height: 26px;
  right: 8px;
  top: 12px;
  cursor: pointer;
  transition: .25s;
  border-radius: 50%;
  stroke: rgba(255,255,255,0.8);
}

#setting-window svg.close:hover {
  background: rgba(0,0,0,.2);
  backdrop-filter: blur(10px);
  stroke: #fff;
}

#setting-window * {
  color: #fff;
  user-select: none;
  font-family:  "Nunito", monospace;
}

#setting-window .row {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

#setting-window .row .column {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 4px;
}

#setting-window label {
  width: max-content;
  text-wrap: none;
  transform: translateY(14px);
}

#setting-window input {
  background: #181818;
  margin: 10px 4px;
  border: none;
  padding: 16px;
  width: 100%;
  height: 36px;
  border-radius: 16px;
  outline: none;
  letter-spacing: 0.01cm;
}

#setting-window .engine svg {
  padding: 6px;
  margin: 4px 6px;
  width: 34px;
  height: 34px;
  background: #fff;
  fill: #000;
  backdrop-filter: blur(2px);
  border-radius: 6px;
  transition: .25s;
}

#setting-window .engine svg:hover {
  padding: 5px;
}

#setting-window div.engine.selected svg {
  background: #000 !important;
  fill: #fff !important;
  width: 36px;
  height: 36px;
}
</style>
<template>
  <main>
    <div id="setting-window" :class="{'active': settings}">
      <h1 align="center">Settings</h1>
      <svg xmlns="http://www.w3.org/2000/svg" class="close" @click="settings = false" viewBox="0 0 512 512"><title>Close Settings</title><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
      <br>
      <div class="row">
        <div class="column">
          <label>Background</label>
          <input type="url" ref="bg_ref" v-model="bg_url" placeholder="Input the background url (default is /background.jpg)">
        </div>
        <div class="column"><label>Search Engine Preference</label></div>
        <div class="column"><div class="engine" v-for="(inner, name, index) in icons" :class="{'selected': current === index}" v-html="inner" @click="set(index)"></div> </div>
      </div>
    </div>
    <svg class="settings-btn" @click="settings = true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Settings</title><path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="rgba(255,255,255,.9)" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
    <img class="background" :src="bg_url || '/background.jpg'" :class="{'focus': focus}" alt>
    <div class="horizontal-center" id="time">
      <span>{{ time }}</span>
    </div>
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
    <div id="tool-container" :class="{'focus': focus}" :style="{'transform': `translateX(${transform}px)`}">
      <a class="tool" href="https://github.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Github</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
      <a class="tool" href="https://codepen.io"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Codepen</title><path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z"/></svg></a>
      <a class="tool" href="https://stackoverflow.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Stack Overflow</title><path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"/></svg></a>
      <a class="tool" href="https://www.kaggle.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Kaggle</title><path d="M.1025 7.3475c-.0681 0-.1022.0341-.1022.102v6.752c0 .0681.034.1022.1022.1022h.7049c.068 0 .1022-.034.1022-.1023v-1.481l.4187-.3985 1.5016 1.91c.041.0477.0884.0716.143.0716h.9091c.0476 0 .0748-.0135.0817-.0407.0135-.041.0066-.075-.0206-.1023l-1.9816-2.4618 1.9002-1.8384c.0204-.0205.0237-.051.01-.092-.0137-.0339-.0408-.051-.0816-.051h-.9398c-.0477 0-.0953.024-.143.0716L.9096 11.607V7.4496c0-.0679-.0342-.102-.1022-.102zm18.0417 0c-.068 0-.102.0341-.102.102v6.752c0 .0681.034.102.102.102h.705c.068 0 .102-.034.102-.102v-6.752c0-.068-.034-.102-.102-.102zM5.961 9.6254c-.5653 0-1.11.1806-1.6343.5415-.0545.0545-.0648.102-.0307.143l.3676.5208c.0272.0477.0717.0545.133.0204.3948-.2722.783-.4086 1.1644-.4086.2927 0 .5158.0886.669.2656.1532.1771.2197.3917.1992.6436-.6606.0681-1.1545.1495-1.4813.245-.8308.2383-1.2461.6913-1.2461 1.3586 0 .4222.1533.7695.4598 1.0419.3132.2654.6845.3982 1.1134.3982.4698 0 .8545-.1125 1.1542-.3372v.1432c0 .0682.0374.102.1123.102h.7048c.068 0 .102-.0338.102-.102V11.372c0-.6604-.2245-1.1406-.6739-1.4403-.3065-.2043-.6776-.3063-1.1134-.3063zm4.3225 0c-.6742 0-1.195.2622-1.5627.7865-.3133.4359-.4699.9671-.4699 1.5936 0 .6604.1634 1.2087.4903 1.6444.3744.4972.892.7455 1.5526.7455.5313 0 .9567-.1327 1.2768-.3982v.531c0 .858-.4122 1.287-1.236 1.287-.361 0-.732-.1907-1.1132-.572a.098.098 0 00-.0716-.0306c-.034 0-.0613.0102-.0817.0307l-.4802.48c-.0408.0613-.0375.1124.0103.1532.1361.1157.2554.2129.3576.2911.102.0783.1905.1413.2656.189.354.1975.7284.2961 1.1235.2961.6808 0 1.207-.1925 1.5781-.577.3711-.3848.5567-.9484.5567-1.6903V9.8196c0-.068-.034-.102-.102-.102h-.705c-.0682 0-.1021.034-.1021.102v.2043c-.3471-.2657-.7763-.3985-1.287-.3985zm4.8021 0c-.6742 0-1.195.2622-1.5627.7865-.3132.4359-.4699.9671-.4699 1.5936 0 .6604.1633 1.2087.4903 1.6444.3744.4972.892.7455 1.5526.7455.5311 0 .9566-.1327 1.2768-.3982v.531c0 .858-.4122 1.287-1.236 1.287-.361 0-.732-.1907-1.1133-.572a.098.098 0 00-.0716-.0306c-.034 0-.0612.0102-.0816.0307l-.48.48c-.0409.0613-.0376.1124.01.1532.1363.1157.2555.2129.3576.2911.1021.0783.1906.1413.2657.189.354.1975.7285.2961 1.1237.2961.6808 0 1.2068-.1925 1.5781-.577.371-.3848.5565-.9484.5565-1.6903V9.8196c0-.068-.034-.102-.102-.102h-.7049c-.0682 0-.1022.034-.1022.102v.2043c-.3474-.2657-.7763-.3985-1.287-.3985zm6.7457 0c-.6537 0-1.185.211-1.5936.6332-.4427.4632-.664 1.0283-.664 1.6956 0 .7083.225 1.2905.6743 1.7467.463.463 1.042.6945 1.7366.6945.6467 0 1.2154-.1838 1.7057-.5515.0545-.041.0545-.0884 0-.143l-.4802-.4903c-.041-.0409-.0919-.0409-.1533 0-.2998.2112-.6368.3167-1.0112.3167-.4222 0-.7729-.119-1.052-.3576-.2452-.2248-.3882-.5038-.429-.8375h3.3197c.0679 0 .1022-.0341.1022-.1023l.01-.2244c.0341-.6878-.1668-1.26-.6025-1.7162-.4224-.4426-.9432-.664-1.5627-.664zm-.0206.7865c.3268 0 .6062.1056.8377.3166.2452.211.371.4734.378.7865h-2.4618c.0613-.3269.2077-.5925.4392-.7968.2313-.2042.5004-.3063.8069-.3063zm-11.4249.102c.6196 0 1.0146.2181 1.1848.6538v1.6854c-.1702.4358-.5755.6538-1.2155.6538-.3133 0-.5687-.0986-.7661-.2963-.2656-.2518-.3983-.6538-.3983-1.2053 0-.9941.3984-1.4914 1.1951-1.4914zm4.802 0c.6196 0 1.0148.2181 1.1851.6538h-.0002v1.6854c-.1703.4358-.5755.6538-1.2155.6538-.3132 0-.5686-.0986-.7661-.2963-.2655-.2518-.3983-.6538-.3983-1.2053 0-.9941.3983-1.4914 1.195-1.4914zm-8.3586 1.6547v1.0215c-.286.286-.6675.412-1.1441.3779-.1703-.0135-.32-.0663-.4493-.1582-.1294-.0919-.2045-.2129-.2249-.3627-.0341-.2657.1158-.47.4495-.6129.2452-.1088.7013-.1974 1.3688-.2656z"/></svg></a>
      <a class="tool" href="https://twitter.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
      <a class="tool" href="https://dash.cloudflare.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Cloudflare</title><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg></a>
      <a class="tool" href="https://vercel.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Vercel</title><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg></a>
      <a class="tool" href="https://replit.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Replit</title><path d="M2 1.5A1.5 1.5 0 0 1 3.5 0h7A1.5 1.5 0 0 1 12 1.5V8H3.5A1.5 1.5 0 0 1 2 6.5ZM12 8h8.5A1.5 1.5 0 0 1 22 9.5v5a1.5 1.5 0 0 1-1.5 1.5H12ZM2 17.5A1.5 1.5 0 0 1 3.5 16H12v6.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 22.5Z"/></svg></a>
      <a class="tool" href="https://gitee.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gitee</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg></a>
      <a class="tool" href="https://shields.io"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Shields.io</title><path d="M3.084 13.11a.93.93 0 01-.187-.548l.347-.03c.013.254.183.5.434.572.295.108.65.096.916-.08.18-.137.226-.446.04-.597-.19-.16-.447-.182-.676-.25-.284-.068-.596-.137-.802-.36a.686.686 0 01.036-.903c.247-.256.633-.309.972-.275.298.03.613.162.758.44.051.11.132.272.08.377-.109.02-.22.018-.33.03-.01-.253-.21-.494-.468-.514-.23-.038-.488-.03-.69.098-.17.12-.224.407-.046.544.155.123.359.146.543.2.322.075.679.135.92.382.243.265.23.708-.01.971-.244.281-.643.36-.998.329-.314-.018-.645-.124-.839-.386zm2.827.343v-.746c.006-.217-.018-.438.032-.652.065-.288.415-.433.68-.336.167.054.24.235.243.398.004.446 0 .891.001 1.337h.341v-.907c-.006-.245.021-.493-.04-.732-.058-.247-.307-.394-.547-.413a.787.787 0 00-.71.271v-.996h-.34v2.777h.34zm2.161-2.776h-.341v.392h.341v-.392zm0 .765h-.341v2.012h.341v-2.012zm.451 1.382c-.102-.401-.049-.883.255-1.186.373-.364 1.054-.318 1.362.108.166.224.203.517.19.789h-1.5c-.016.35.276.727.649.686a.56.56 0 00.49-.415l.353.043c-.085.42-.527.7-.943.653-.392-.008-.78-.282-.856-.678zm.327-.57h1.123c.016-.336-.317-.657-.657-.57a.584.584 0 00-.466.57zm2.235-1.577h-.34v2.777h.34v-2.777zm1.835 2.777zm-1.403-.736c-.062-.335-.015-.7.168-.99.226-.328.723-.442 1.056-.211.051.028.124.139.157.123v-.963h.338v2.776h-.316V13.2c-.171.296-.579.371-.877.236-.288-.124-.481-.413-.526-.718zm.325-.268c-.009.272.078.589.339.721a.496.496 0 00.665-.259c.109-.242.09-.518.047-.773-.052-.237-.248-.461-.504-.461a.513.513 0 00-.497.385c-.04.125-.048.257-.05.387zm2.14.942c.16.082.344.107.522.108.256-.004.535-.08.692-.297.161-.209.156-.544-.048-.723-.181-.135-.41-.176-.623-.238-.136-.05-.29-.057-.411-.142-.104-.062-.114-.213-.038-.301.11-.118.286-.129.437-.12.187-.007.372.137.387.328l.333-.046a.748.748 0 00-.102-.289c-.12-.178-.346-.247-.55-.269-.252-.023-.536.011-.727.194a.526.526 0 00.012.762c.185.136.418.18.635.24.13.043.276.054.386.141.114.093.079.274-.02.365-.134.118-.33.129-.499.103-.209-.014-.377-.203-.392-.408l-.337.054v-.001c.03.217.15.429.344.539zm7.102-2.284c-.46-.341-1.219-.134-1.405.417a1.861 1.861 0 00-.082.582c-.046.518.35 1.072.894 1.085.46.027.916-.322.97-.788.095-.452.016-1.005-.377-1.296zM24 9.938v4.122c0 .575-.337 1.072-.823 1.308a.963.963 0 01-.51.146h-6.138l-.041.002c-.02 0-.041 0-.062-.002H1.455A1.456 1.456 0 010 14.06V9.938c0-.802.652-1.454 1.455-1.454H22.667c.187 0 .362.054.51.146.486.236.823.733.823 1.308zm-7.03-.484H1.455a.485.485 0 00-.485.484v4.122c0 .267.217.484.485.484H16.48a.485.485 0 00.489-.445V9.454zm1.714 1.223h-.368v2.777h.368v-2.777zm3.022.642c-.273-.594-1.04-.83-1.633-.618-.572.19-.888.823-.855 1.4 0 .272.07.543.204.78.396.718 1.518.836 2.07.236.443-.474.489-1.227.214-1.798z"/></svg></a>
      <a class="tool" href="https://chat.openai.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>chatGPT</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg></a>
      <a class="tool" href="https://www.jsdelivr.com"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>jsDelivr</title><path d="M11.851 0L.811 4.02l1.56 14.7L11.85 24l9.6-5.28 1.74-14.76zm.062 4.622a6.668 6.75 0 0 1 2.666.572 12.507 12.507 0 0 0-2.59 1.95c-.045-.02-.092-.031-.138-.045a1.181 1.181 0 0 0-.346-.056c-.071 0-.141.01-.21.021a8.91 8.91 0 0 1-.615-2.318 6.668 6.75 0 0 1 1.171-.122 6.668 6.75 0 0 1 .062-.002zm-1.99.312a9.763 9.763 0 0 0 .69 2.504 1.213 1.213 0 0 0-.328.825 1.202 1.202 0 0 0 .18.63c-.937 1.294-1.656 2.803-1.905 4.31-.01.056-.013.11-.02.166-.282.09-.515.284-.656.54-.987-.333-1.885-.968-2.615-2.022a6.668 6.75 0 0 1-.026-.515 6.668 6.75 0 0 1 4.68-6.438zm5.507.709a6.668 6.75 0 0 1 2.53 2.9c-.377.953-1.049 1.892-1.893 2.727a1.242 1.242 0 0 0-.644-.184 1.243 1.243 0 0 0-.768.27c-.462-.354-.91-.737-1.318-1.168-.333-.35-.637-.73-.921-1.123.19-.215.31-.494.31-.802 0-.212-.061-.41-.159-.586 1.058-1.008 2.112-1.67 2.863-2.034zm-3.925 1.982a.624.624 0 0 1 .346.114.624.624 0 0 1 .292.524.624.624 0 0 1-.292.524.626.626 0 0 1-.346.113.634.634 0 0 1-.638-.637c0-.355.283-.638.638-.638zm-.441 1.771a1.205 1.205 0 0 0 .675.062c.036.05.075.097.112.148a11.438 11.438 0 0 0 .921 1.119 12.103 12.103 0 0 0 1.446 1.277c-.032.11-.054.224-.054.342a1.236 1.236 0 0 0 .066.38 9.91 9.91 0 0 1-2.118 1.042c-.087.029-.173.052-.261.078a7.735 7.735 0 0 1-1.87.332 1.15 1.15 0 0 0-.66-.773c.004-.024.005-.049.01-.073.219-1.333.873-2.73 1.733-3.934zm7.272.19a6.668 6.75 0 0 1 .245 1.786 6.668 6.75 0 0 1-.259 1.856 9.993 9.993 0 0 1-1.666-.63 1.243 1.243 0 0 0-.065-.713 9.434 9.434 0 0 0 1.745-2.3zm-2.913 2.101c.367 0 .657.291.657.658s-.291.657-.657.657c-.367 0-.658-.29-.658-.657s.29-.658.658-.658zm.837 1.59a10.79 10.79 0 0 0 1.802.688 6.668 6.75 0 0 1-6.149 4.157 6.668 6.75 0 0 1-.062-.004 6.668 6.75 0 0 1-.042 0c-.087-.042-.168-.08-.266-.129-.312-.154-.667-.352-.846-.5a3.796 3.796 0 0 1-1.294-2.03c.21-.111.38-.284.487-.495a8.428 8.428 0 0 0 1.96-.306 9.11 9.11 0 0 0 .513-.154 11.083 11.083 0 0 0 2.341-1.13c.205.143.452.23.719.23a1.248 1.248 0 0 0 .837-.328zm-10.707.116a5.761 5.761 0 0 0 2.212 1.298 1.146 1.146 0 0 0 .857.87 4.602 4.602 0 0 0 1.24 2.222 6.668 6.75 0 0 1-4.31-4.39zm3.327.464c.331 0 .595.263.595.596s-.264.595-.595.595a.59.59 0 0 1-.596-.595.591.591 0 0 1 .596-.596z"/></svg></a>
    </div>
    <div class="quote horizontal-center" :class="{'focus': (focus && notSearching && input)}" v-html="content" />
    <a class="about" href="https://github.com/zmh-program/fystart"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Github</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>Fystart</a>
  </main>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import type { Ref } from "vue";
import { uptime, search, transformTools } from "@/assets/script/utils";
import { TypingEffect } from "@/assets/script/typing";
import {engineIcon, mixURI, toggle, set, icons, current} from "@/assets/script/engine";

const bg_url: Ref<string> = ref(localStorage.getItem("background") || "/background.jpg");
const bg_ref: Ref<HTMLInputElement | undefined> = ref();

watch(bg_url, () => {
  if (bg_ref.value && bg_ref.value?.checkValidity()) localStorage.setItem("background", bg_url.value.trim() || "/background.jpg");
})

const settings: Ref<boolean> = ref(false);
const time: Ref<string> = uptime();
const content = new TypingEffect("??? Where there is a will, there is a way. ???", 800, true).run();

const focusRef = ref();
onMounted(() => focusRef.value.focus());
const focus: Ref<boolean> = ref(false);
const setFocus = (value: boolean): boolean => focus.value = value;

const transform: Ref<number> = transformTools(12);

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
