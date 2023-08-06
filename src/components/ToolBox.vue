<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {context} from "@/assets/script/shared";
import {storage} from "@/assets/script/storage";
import {contextTool} from "@/assets/script/tool";
import Delete from "@/components/icons/delete.vue";
import {useI18n} from "vue-i18n";
import Edit from "@/components/icons/edit.vue";
import {getFavicon, swap} from "@/assets/script/utils/base";
import Window from "@/components/compositions/Window.vue";
import CardContainer from "@/components/CardContainer.vue";
import Tool from "@/components/compositions/Tool.vue";
import Cover from "@/components/compositions/Cover.vue";
import {set} from "@/assets/script/engine";

const { t } = useI18n();
const props = defineProps<{
  focus: boolean,
}>();

const popup = ref<boolean>(false);
const newTab = ref<boolean>(false);
const setting = ref<boolean>(false);
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
  if (!props.focus && (!setting.value)) {
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
      popupIdx.value = -2;
      return;
    }

    if (!setting.value) context.value = !context.value;
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
      if (!setting.value) popupIdx.value = -1;
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

const form = reactive({
  name: '',
  link: '',
  icon: '',
})

function activeEdit(type: boolean) {
  setting.value = true;
  newTab.value = type;
  if (type) popupIdx.value = -2;
  const idx = popupIdx.value;
  if (idx < 0) {
    if (idx !== -2) return;
    form.name = '';
    form.link = '';
    form.icon = '';
    return;
  }
  const tool = storage.tools[idx];
  form.name = tool.name;
  form.link = tool.link;
  form.icon = tool.icon;
}

function saveEdit() {
  const idx = popupIdx.value;
  if (idx < 0) {
    if (idx !== -2) return;
    storage.tools.push({
      name: form.name,
      link: form.link,
      icon: form.icon.trim().length > 0 ? form.icon : getFavicon(form.link),
    })
    setting.value = false;
    return;
  }
  const tool = storage.tools[idx];
  tool.name = form.name;
  tool.link = form.link;
  tool.icon = form.icon.trim().length > 0 ? form.icon : getFavicon(form.link);
  setting.value = false;
}
</script>

<template>
  <div class="popup" :class="{'active': popup}" ref="popupEl">
    <div class="row" @click="activeEdit(false)">
      <edit /><span>编辑</span>
    </div>
    <div class="row" @click="remove">
      <delete /><span>删除</span>
    </div>
  </div>
  <Cover :active="setting" floor="32" />
  <Window :title="newTab ? t('add') : t('edit')" v-model="setting" class="dialog">
    <div class="form">
      <div class="column">
        <div class="row">
          <span>{{ t('name') }}</span>
          <div class="grow" />
          <input :placeholder="t('name-desc')" v-model="form.name" />
        </div>
        <div class="row">
          <span>{{ t('link') }}</span>
          <div class="grow" />
          <input placeholder="https://" v-model="form.link" />
        </div>
        <div class="row">
          <span>{{ t('icon') }}</span>
          <div class="grow" />
          <input :placeholder="t('icon-desc')" v-model="form.icon" />
        </div>
        <div class="row">
          <div class="grow" />
          <button class="button plain" @click="setting = false">{{ t('cancel') }}</button>
          <button class="button" @click="saveEdit">{{ t('save') }}</button>
        </div>
      </div>
    </div>
  </Window>
  <div class="scroll" ref="element">
    <CardContainer :focus="props.focus" />
    <div class="tool-container" ref="toolContainer" :class="{'focus': props.focus}" v-show="!context">
      <Tool class="draggable" :key="idx"
          :title="tool.name" :src="tool.icon" :index="idx" draggable="true"
          v-for="(tool, idx) in storage.tools" @click="redirect(tool.link)"
      />

      <Tool :title="t('add')" src="/tool/add.svg" :index="-2" @click="activeEdit(true)" />
    </div>
  </div>
</template>
<i18n>
{
  "zh": {
    "add": "添加工具",
    "edit": "编辑工具",
    "name": "名称",
    "name-desc": "编辑工具名称",
    "link": "链接",
    "icon": "图标",
    "icon-desc": "图标链接 (留空自动获取), https:// 或 data:image/png;base64",
    "cancel": "取消",
    "save": "保存"
  },
  "en": {
    "add": "Add Tool",
    "edit": "Edit Tool",
    "name": "Name",
    "name-desc": "Edit tool name",
    "link": "Link",
    "icon": "Icon",
    "icon-desc": "Icon link, https:// or data:image/png;base64",
    "cancel": "Cancel",
    "save": "Save"
  },
  "tw": {
    "add": "新增工具",
    "edit": "編輯工具",
    "name": "名稱",
    "name-desc": "編輯工具名稱",
    "link": "連結",
    "icon": "圖示",
    "icon-desc": "圖示連結, https:// 或 data:image/png;base64",
    "cancel": "取消",
    "save": "保存"
  },
  "ru": {
    "add": "Добавить инструмент",
    "edit": "Редактировать инструмент",
    "name": "Название",
    "name-desc": "Редактировать название инструмента",
    "link": "Ссылка",
    "icon": "Иконка",
    "icon-desc": "Ссылка на иконку, https:// или data:image/png;base64",
    "cancel": "Отмена",
    "save": "Сохранить"
  },
  "de": {
    "add": "Werkzeug hinzufügen",
    "edit": "Werkzeug bearbeiten",
    "name": "Name",
    "name-desc": "Werkzeugnamen bearbeiten",
    "link": "Link",
    "icon": "Symbol",
    "icon-desc": "Symbol-Link, https:// oder data:image/png;base64",
    "cancel": "Abbrechen",
    "save": "Speichern"
  },
  "fr": {
    "add": "Ajouter un outil",
    "edit": "Modifier l'outil",
    "name": "Nom",
    "name-desc": "Modifier le nom de l'outil",
    "link": "Lien",
    "icon": "Icône",
    "icon-desc": "Lien de l'icône, https:// ou data:image/png;base64",
    "cancel": "Annuler",
    "save": "Enregistrer"
  },
  "ja": {
    "add": "ツールを追加",
    "edit": "ツールを編集",
    "name": "名前",
    "name-desc": "ツール名を編集する",
    "link": "リンク",
    "icon": "アイコン",
    "icon-desc": "アイコンのリンク、https://またはdata:image/png;base64",
    "cancel": "キャンセル",
    "save": "保存"
  }
}
</i18n>

<style>
.scroll {
  position: absolute;
  top: var(--height-tool-box);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  max-height: calc(80vh - var(--height-tool-box));
  touch-action: pan-y;
  overflow-y: auto;
  overflow-x: hidden;
}

button.button {
  cursor: pointer;
  padding: 6px 12px;
  margin: 2px 6px;
  width: max-content;
  height: 32px;
  outline: 0;
  border-radius: 4px;
  fill: #fff;
  background: rgb(50,50,50);
  border: 1px solid rgb(80,80,80);
  transition: .25s;
}

button.button.plain {
  background: transparent;
  fill: rgb(200,200,200);
}

button.button:hover {
  background: rgb(60,60,60);
}

.dialog {
  max-width: 420px !important;
  height: max-content !important;
  padding-bottom: 12px !important;
}

.dialog .main {
  padding-bottom: 0 !important;
}

.dialog h1 {
  font-size: 16px !important;
}

.dialog .row {
  align-items: center;
}

.dialog .row span {
  white-space: nowrap;
  margin-right: 4px;
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

.add img {
  background: rgba(0,0,0,0.5);
  fill: rgba(255,255,255,0.85);
}

@media (max-height: 520px) {
  .tool-container {
    top: 240px;
  }
}
</style>
