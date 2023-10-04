export type Tool = {
  type: ToolType;
  name: string;
  icon: string;
  link: string;
};

export type ToolList = Tool[];
export type ToolMap = { [key: string]: Tool };

export enum ToolTypes {
  BUILTIN,
  CUSTOM,
}
export type ToolType = ToolTypes.BUILTIN | ToolTypes.CUSTOM;

export function contextTool(el: HTMLElement): number {
  let i = el.getAttribute("fy-index");
  if (i === null) {
    el = el.parentElement as HTMLElement;
    i = el.getAttribute("fy-index");
    if (i === null) return -1;
  }

  return parseInt(i);
}
