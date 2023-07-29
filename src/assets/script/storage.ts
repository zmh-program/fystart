import { reactive, watch } from 'vue';
import axios from "axios";
import {auth} from "@/assets/script/auth";

let migrate = false;
let timeout: number;

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
  stamp: 0,
}));


function sync() {
  migrate = true;
  axios.post("/sync", storage).then((response) => {
    if (response.data.success) {
      for (const key in response.data.data) {
        storage[key] = response.data.data[key];
      }
    }
    migrate = false;
  })
}
watch(auth, () => {
  if (!auth.value) return;
  sync();
})

watch(storage, () => {
  if (migrate) return;
  storage.stamp = Date.now();
  writeDictConfig(storage);
  clearTimeout(timeout);
  timeout = setTimeout(sync, 1000);
});
