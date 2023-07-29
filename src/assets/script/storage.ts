import {reactive, ref, watch} from 'vue';

function readDictConfig(data: Record<string, any>): Record<string, any> {
  for (const key in data) {
    const result = localStorage.getItem(key);
    if (result !== null) {
      try {
        data[key] = JSON.parse(result);
      } catch {
        console.debug(result);
      }
    }
  }
  return data;
}

function writeDictConfig(data: Record<string, any>): void {
  for (const key in data) localStorage.setItem(key, JSON.stringify(data[key]));
}

export const storage = reactive(readDictConfig({
  chatgpt: true,
  quote: true,
  toolbox: true,
  about: true,
  exactTime: false,
  focusInput: true,
  language: "zh",
  background: "/background.webp",
}));

watch(storage, () => writeDictConfig(storage));
