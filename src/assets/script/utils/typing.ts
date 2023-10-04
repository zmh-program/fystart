import { ref } from "vue";
import type { Ref } from "vue";

function waitSync(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class TypingEffect {
  public operation: string;
  public timeout: number;
  public enableCursor: boolean;
  public ref: Ref<string>;
  private cursor: boolean;
  private index: number;
  protected running: boolean;
  private offset: number;
  private readonly id: number;
  private readonly hook?: (...args: any) => any;
  private animationFrameId: number | null;

  constructor(
    operation: string,
    timeout: number = 800,
    enableCursor: boolean = false,
    selectRef?: Ref<string>,
    hook?: (...args: any) => any,
  ) {
    this.operation = operation;
    this.timeout = timeout;
    this.enableCursor = enableCursor;
    this.ref = selectRef || ref("");
    this.cursor = true;
    this.index = 0;
    this.running = true;
    this.offset = 0;
    this.hook = hook;
    this.animationFrameId = null;
    this.id = Date.now();

    // Using public variables to solve the js thread memory non-sharing problem.
    // @ts-ignore
    window["typing"] = this.id;
  }

  private getTimeout(): number {
    if (this.index <= this.operation.length)
      return Math.random() * (this.enableCursor ? 200 : 100);
    return Math.random() * this.timeout;
  }

  protected async count(): Promise<void> {
    this.index += 1;
    this.cursor = !this.cursor; // @ts-ignore
    if (!this.running || window["typing"] !== this.id) {
      return;
    }
    if (this.index <= this.operation.length) {
      this.ref.value =
        this.operation.substring(0, this.index) +
        (this.cursor && this.enableCursor ? "|" : " ");
      await waitSync(this.getTimeout());
      this.animationFrameId = requestAnimationFrame(() => this.count());
    } else {
      if (this.offset === 0) this.finish(true);
      if (this.enableCursor && this.offset <= 12) {
        this.ref.value = this.operation + (this.offset % 5 <= 1 ? "|" : " ");
        this.offset += 1;
        await waitSync(this.getTimeout());
        this.animationFrameId = requestAnimationFrame(() => this.count());
      } else {
        this.ref.value = this.operation;
      }
    }
  }

  public finish(status?: boolean): void {
    if (this.hook) this.hook(status);
  }

  public run(): Ref<string> {
    this.animationFrameId = requestAnimationFrame(() => this.count());
    return this.ref;
  }

  public stop(): boolean {
    const status = this.running;
    this.running = false;
    this.animationFrameId && cancelAnimationFrame(this.animationFrameId);
    this.finish(false);
    return status;
  }
}
