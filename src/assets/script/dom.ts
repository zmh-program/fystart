type Element = HTMLElement | null;

export function contain(el: Element, target: HTMLElement): boolean {
    return el ? (el == target || el.contains(target)) : false;
}

export function contains(els: Element[], target: HTMLElement): boolean {
    return els.some((el: Element) => contain(el, target));
}

export function clipboard(text: string) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

export function getSelectionText() {
    if (window.getSelection) return window.getSelection()?.toString();
    return "";
}
