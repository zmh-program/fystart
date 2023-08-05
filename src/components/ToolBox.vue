<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {context} from "@/assets/script/shared";
import DateCard from "@/components/cards/DateCard.vue";
import WeatherCard from "@/components/cards/WeatherCard.vue";
import {storage} from "@/assets/script/storage";
import GithubCard from "@/components/cards/GithubCard.vue";
import {contextTool} from "@/assets/script/tool";
import Delete from "@/components/icons/delete.vue";
import {useI18n} from "vue-i18n";
import Edit from "@/components/icons/edit.vue";
import {swap} from "@/assets/script/utils/base";

const { t } = useI18n();
const props = defineProps<{
  focus: boolean,
}>();

const popup = ref<boolean>(false);
const popupEl = ref<HTMLElement | null>(null);
const popupIdx = ref<number>(0);
const element = ref<HTMLElement | null>(null);
const start = ref<number>(NaN);

onMounted(() => {
  if (element.value === null) return;
  element.value.addEventListener('touchstart', (e) => {
    start.value = e.touches[0].clientY;
  })
  element.value.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (element.value === null) return;
    const current = e.touches[0].clientY;
    const height = current - start.value;
    start.value = current;
    element.value.scrollTop = element.value.scrollTop - height;
  })
})

window.addEventListener('contextmenu', (e: MouseEvent) => {
  if (!props.focus) {
    e.preventDefault();
    const idx = contextTool(e.target as HTMLElement);
    if (!context.value && idx >= 0) {
      const x = e.clientX, y = e.clientY;

      let target = popupEl.value;
      if (target === null) return;
      target.style.left = x + 'px';
      target.style.top = y + 'px';

      target.style.transform = 'scale(1.03)';
      setTimeout(() => target && (target.style.transform = 'scale(1)'), 250);
      popupIdx.value = idx;

      popup.value = true;
      return;
    } else if (idx === -2) {
      return;
    }

    context.value = !context.value;
    if (context.value) popup.value = false;
  }
});

window.addEventListener('click', () => {
  if (popup.value) {
    popup.value = false;
  }
})

watch(props, () => {
  if (props.focus) {
    popup.value = false;
  }
});

watch(popup, () => {
  if (!popup.value) {
    requestAnimationFrame(() => {
      popupIdx.value = -1;
      popupEl.value && (popupEl.value.style.transform = 'scale(.5)');
      setTimeout(() => {
        let target = popupEl.value;
        if (target === null) return;
        target.style.removeProperty('left');
        target.style.removeProperty('top');
      }, 250);
    })
  }
})

function redirect(uri: string) {
  window.location.href = uri;
}

function remove() {
  const idx = popupIdx.value;
  if (idx < 0) return;
  storage.tools.splice(idx, 1);
  popup.value = false;
}

const toolContainer = ref<HTMLElement | null>(null);

onMounted(function () {
  for (const draggable of document.querySelectorAll('.draggable') as NodeListOf<HTMLElement>) {
    draggable.addEventListener('dragstart', function (e: DragEvent) {
      if (!e.dataTransfer) return;
      e.dataTransfer.setData('text/plain', draggable.getAttribute("fy-index") as string);
      e.dataTransfer.dropEffect = 'move';
    });

    draggable.addEventListener('dragover', function (e: DragEvent) {
      e.preventDefault();
    });

    draggable.addEventListener('drop', function (e: DragEvent) {
      if (!e.dataTransfer) return;
      e.preventDefault();
      const before: number = parseInt(e.dataTransfer.getData('text/plain'));
      const after: number = parseInt(draggable.getAttribute("fy-index") as string);
      (!(before === after || [before, after].includes(-2))) &&
        swap(storage.tools, before, after);
    });
  }
})
</script>

<template>
  <div class="popup" :class="{'active': popup}" ref="popupEl">
    <div class="row" @click="">
      <edit /><span>编辑</span>
    </div>
    <div class="row" @click="remove">
      <delete /><span>删除</span>
    </div>
  </div>
  <div class="scroll" ref="element">
    <div class="card-container" :class="{'focus': props.focus}" v-show="context">
      <DateCard />
      <WeatherCard />
      <GithubCard />
    </div>
    <div class="tool-container" ref="toolContainer" :class="{'focus': props.focus}" v-show="!context">
      <a class="tool draggable" v-for="(tool, idx) in storage.tools" @click="redirect(tool.link)" :key="idx"
         :fy-index="idx" draggable="true">
        <img :src="tool.icon" :alt="tool.name" />
        <div>{{ tool.name }}</div>
      </a>
      <a class="tool add" :fy-index="-2">
        <img src="/tool/add.svg" alt="add" />
        <div>{{ t('add') }}</div>
      </a>
    </div>
  </div>
</template>
<i18n>
{
  "zh": {
    "add": "添加工具",
  },
  "en": {
    "add": "Add Tool",
  },
  "tw": {
    "add": "添加工具",
  },
  "ru": {
    "add": "Добавить инструмент",
  },
  "de": {
    "add": "Werkzeug hinzufügen",
  },
  "fr": {
    "add": "Ajouter un outil",
  },
  "ja": {
    "add": "ツールを追加",
  }
}
</i18n>
<style>
.scroll {
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: calc(80vh - 280px);
  top: 280px;
  left: 50%;
  transform: translateX(-50%);
  touch-action: pan-y;
  overflow-y: auto;
  overflow-x: hidden;
}

.popup {
  position: absolute;
  background: rgb(30,30,30);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  transition: .25s cubic-bezier(.60,.05,.1,1);
  transform-origin: top left;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  z-index: -64;
  padding: 4px;
  transform: scale(.5);
}

.popup .row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  width: 100%;
  height: max-content;
  transition: .25s;
  border-radius: 6px;
  min-width: 100px;
}

.popup .row:hover {
  background: rgba(255,255,255,.1);
}

.popup .row svg {
  stroke: #fff;
  stroke-width: 32;
  width: 16px;
  height: 16px;
}

.popup .row span {
  color: #fff;
  font-size: 14px;
  margin-left: 8px;
}

.popup.active {
  pointer-events: all;
  z-index: 64;
  opacity: 1;
  width: max-content;
  height: max-content;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  max-width: min(90%, 780px);
  height: max-content;
  transition: .25s;
  justify-content: center;
  pointer-events: all;
  animation: FadeInAnimation .25s ease-in-out;
  margin: 0 auto;
}

.card-container.focus {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}

.card-container.focus * {
  user-select: none;
}

.tool-container {
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  max-width: min(90%, 650px);
  height: max-content;
  transition: .25s;
  justify-content: center;
  pointer-events: all;
  animation: FadeInAnimation .25s ease-in-out;
  margin: 0 auto;
}

.tool-container.focus {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}

.tool-container.focus * {
  user-select: none;
}

.tool {
  position: relative;
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  margin: 15px 15px 30px 15px;
  transition: .25s;
  cursor: pointer;
  user-select: none;
}

.tool img {
  border-radius: 6px;
  background: rgba(0,0,0,0.85);
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
  width: 80px;
  height: 80px;
  padding: 20px;
  fill: rgba(255,255,255,0.85);
  transition: .2s;
  backdrop-filter: blur(4px);
}

.tool.add img {
  background: rgba(0,0,0,0.5);
  fill: rgba(255,255,255,0.85);
}

.tool div {
  width: max-content;
  white-space: nowrap;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.95);
  font-family: var(--fonts-cn);
  font-size: 14px;
  transition: .2s;
}

.tool:hover img {
  background: rgba(0,0,0,0.95);
  transform: scale(1.1);
}

.tool:hover div {
  bottom: -30px;
}

.tool:hover svg {
  padding: 2px;
  fill: #fff;
}

@media (max-height: 520px) {
  .tool-container {
    top: 240px;
  }

  .tool {
    margin: 15px;
  }
}
</style>
