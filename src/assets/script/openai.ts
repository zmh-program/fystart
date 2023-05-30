import { wrap } from "@/assets/script/engine";
import { ref } from "vue";
import type { Ref } from "vue";
import {TypingEffect} from "@/assets/script/typing";

const ask = wrap(async (message: string, callback: (response: string) => any) => {
    const resp = await fetch(`https://chatgpt.deeptrain.net/gpt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: message }),
    })
    const data = await resp.json();
    callback(data.message);
}, 800);


export default class OpenAI {
    private readonly ref: Ref<string>;
    private effect: TypingEffect | null;
    private waiting: boolean;
    public constructor() {
        this.ref = ref("");
        this.effect = null;
        this.waiting = false;
    }
    public getRef(): Ref<string> {
        return this.ref;
    }
    public trigger(text: string) {
        const _this = this;
        this.waiting = true;
        ask(
            text,
            (response: string): void => {
                console.debug(response);
                return _this.callback(response);
            },
        )
    }
    public stop(): boolean {
        this.waiting = false;
        if (this.effect) return this.effect.stop();
        return false;
    }
    public callback(response: string): void {
        this.stop();
        this.effect = new TypingEffect(
            response,
            100,
            false,
            this.ref,
        );
        this.effect.run();
    }
}