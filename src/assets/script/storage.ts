import { reactive, watch } from 'vue';
import axios from "axios";
import { auth } from "@/assets/script/auth";
import {ToolTypes} from "@/assets/script/tool";

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
  tools: [
    { "type": ToolTypes.BUILTIN, "name": "GitHub", "link": "https://github.com", "icon": "/tool/github.svg" },
    { "type": ToolTypes.BUILTIN, "name": "OpenAI", "link": "https://chat.openai.com", "icon": "/tool/openai.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Stack Overflow", "link": "https://stackoverflow.com", "icon": "/tool/stackoverflow.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Light Notes", "link": "https://notes.lightxi.com", "icon": "/tool/lightnotes.ico" },
    { "type": ToolTypes.BUILTIN, "name": "Twitter", "link": "https://twitter.com", "icon": "/tool/twitter.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Cloudflare", "link": "https://dash.cloudflare.com", "icon": "/tool/cloudflare.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Vercel", "link": "https://vercel.com", "icon": "/tool/vercel.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Codepen", "link": "https://codepen.io", "icon": "/tool/codepen.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Kaggle", "link": "https://kaggle.com", "icon": "/tool/kaggle.svg" },
    { "type": ToolTypes.BUILTIN, "name": "Replit", "link": "https://replit.com", "icon": "/tool/replit.svg" },
  ]
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
