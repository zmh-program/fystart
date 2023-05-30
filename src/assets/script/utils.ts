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
