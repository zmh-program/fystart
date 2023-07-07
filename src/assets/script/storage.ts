import {reactive, ref, watch} from 'vue';

function readDictConfig(data: Record<string, any>): Record<string, any> {
  for (const key in data) {
    const result = localStorage.getItem(key);
    if (result !== null) {
      data[key] = JSON.parse(result);
    }
  }
  return data;
}

function writeDictConfig(data: Record<string, any>): void {
  for (const key in data) data[key] = JSON.stringify(data[key]);
}


export const background = ref(localStorage.getItem("background") || "/background.webp");
export const storage = reactive(readDictConfig({
  language: "zh",
  chatgpt: true,
  exactTime: false,
  focusInput: true,
}));

watch(background, () => localStorage.setItem("background", background.value.trim() || "/background.webp"))
watch(storage, () => writeDictConfig(storage));
