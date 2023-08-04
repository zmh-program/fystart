export type Tool = {
  type: ToolType,
  name: string,
  icon: string,
  link: string,
}

export type ToolList = Tool[];
export type ToolMap = { [key: string]: Tool };

export enum ToolTypes {
  BUILTIN,
  CUSTOM,
}
export type ToolType = ToolTypes.BUILTIN | ToolTypes.CUSTOM;
