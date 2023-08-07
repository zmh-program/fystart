import type { Ref } from "vue";

export type Element = HTMLElement | null;


export function exportScript(name: string, conf: any) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `window.${name} = ${JSON.stringify(conf)};`;
  document.body.appendChild(script);
}

export function insertScript(src: string) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

export const withCdn = (src: string) => (
  src.startsWith("/") ? `https://cdn.zmh-program.site/fystart${src}` : src
);

export function contain(el: Element, target: HTMLElement, exclude?: boolean): boolean {
  return el ? ((exclude ? el == target : false) || el.contains(target)) : false;
}

export function contains(els: Element[], target: HTMLElement, exclude?: boolean): boolean {
  return els.some((el: Element) => contain(el, target, exclude));
}

export function swap<T>(arr: T[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function clipboard(text: string) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export function getSelectionText(): string | undefined {
  return window.getSelection ? window.getSelection()?.toString() : "";
}

export function getFavicon(url: string): string {
  try {
    const instance = new URL(url);
    return `${instance.origin}/favicon.ico`;
  } catch {
    return "/tool/unknown.svg";
  }
}

export function getListExcludeSelf<T>(list: T[], self: T): T[] {
  return list.filter((item) => item !== self);
}

export function getValueOfRef<T>(ref: Ref<T>[]): T[] {
  return ref.map((item) => item.value);
}

export function getQueryVariable(variable: string): string | null {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (const v of vars) {
    const pair = v.split("=");
    if (pair[0] === variable) return pair[1];
  }
  return null;
}

export function DecimalConvert(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1000000) return `${(n / 1000).toFixed(1)}k`;
  if (n < 1000000000) return `${(n / 1000000).toFixed(1)}m`;
  if (n < 10000000000) return `${(n / 1000000000).toFixed(1)}b`;
  return n.toString();
}
