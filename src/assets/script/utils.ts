import { ref } from "vue";
import type { Ref } from "vue";

export function search(content: string, callback: (res: string[]) => any): void {
    content = content.trim();
    if (!content.length) return;
    const script = document.createElement("script");
    let index: number;
    script.src = `https://suggestion.baidu.com/su?wd=${encodeURI(content)}&cb=window.__callback__`;
    script.async = true;
    document.body.appendChild(script);  // @ts-ignore
    window.__callback__ = function(res: object) {
        clearTimeout(index);  // @ts-ignore
        index = setTimeout(callback(res["s"]), 400);
        try { document.body.removeChild(script) } catch {}
    }
}

export function uptime(): Ref<string> {
    const time = ref(new Date().toLocaleTimeString());
    setInterval(() => time.value = new Date().toLocaleTimeString(), 500);
    return time;
}

export function transformTools(num: number): Ref<number> {
    let transform: Ref<number> = ref(0);
    const checked = () => {
        transform.value = (document.body.offsetWidth -
            Math.min(Math.floor(Math.min(document.body.offsetWidth * 0.9, 600) / 90), num) * 90) / 2;
    }
    document.body.onresize = checked;
    checked();
    return transform;
}