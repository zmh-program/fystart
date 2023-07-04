declare module 'vue' {
  export interface Ref<T> {
    value: T;
  }
  export function ref<T>(value: T): Ref<T>;

  export function watch<T>(ref: Ref<T>, callback: (value: T) => void): void;
  export function createApp(...args: any[]): any;
}
