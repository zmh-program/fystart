import { ref } from 'vue';
import type { Ref } from 'vue';

export class TypingEffect {
    public operation: string;
    public timeout: number;
    public enableCursor: boolean;
    public ref: Ref<string>;
    private cursor: boolean;
    private index: number;
    protected running: boolean;
    private offset: number;

    constructor(operation: string, timeout: number = 800, enableCursor: boolean = false, selectRef?: Ref<string>) {
        this.operation = operation;
        this.timeout = timeout;
        this.enableCursor = enableCursor;
        this.ref = selectRef || ref("");
        this.cursor = true;
        this.index = 0;
        this.running = true;
        this.offset = 0;
    }

    private getTimeout(): number {
        return Math.random() * this.timeout;
    }

    protected count(): void {
        this.index += 1;
        this.cursor = !this.cursor;
        if (!this.running) {
            return;
        }
        if (this.index <= this.operation.length) {
            this.ref.value = this.operation.substring( 0, this.index ) + ( this.cursor ? "|" : " " );
            this.delayerCall(Math.random() * (this.enableCursor ? 200 : 100));
        } else {
            if (this.enableCursor && this.offset <= 5) {
                this.ref.value = this.operation + ( this.offset % 2 === 1 ? "|" : " " );
                this.offset += 1;
                this.delayerCall(this.getTimeout());
            } else {
                this.ref.value = this.operation;
            }
        }
    }

    protected delayerCall(timeout: number): void {
        const _this = this;
        setTimeout(() => (_this.count()), timeout);
    }

    public run(): Ref<string> {
        this.delayerCall(this.getTimeout());
        return this.ref;
    }

    public stop(): boolean {
        const status = this.running;
        this.running = false;
        return status;
    }
}