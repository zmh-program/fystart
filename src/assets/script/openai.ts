import { wrap } from "@/assets/script/engine";
import { ref } from "vue";
import type { Ref } from "vue";
import { TypingEffect } from "@/assets/script/typing";
import {storage} from "@/assets/script/storage";
import axios from "axios";

const ask = wrap(async (message: string, callback: (response: string) => any) => {
    if (!storage.chatgpt) return;
    const resp = await axios.post("/gpt", { message })
    callback(resp.data.message);
}, 800);

export const finished = ref<boolean>(false);

export class OpenAI {
    private readonly ref: Ref<string>;
    private effect: TypingEffect | null;
    public readonly waiting: Ref<boolean>;

    public constructor() {
        this.ref = ref("");
        this.effect = null;
        this.waiting = ref(false);
    }
    public getRef(): Ref<string> {
        return this.ref;
    }

    public trigger(text: string) {
        const _this = this;
        this.waiting.value = true;
        ask(
            text,
            (response: string): void => {
                finished.value = false;
                return _this.callback(response);
            },
        )
    }
    public stop(): boolean {
        this.waiting.value = false;
        if (this.effect) return this.effect.stop();
        return false;
    }
    public callback(response: string): void {
        this.stop();
        this.effect = new TypingEffect(
            response,
            50,
            false,
            this.ref,
            (status: boolean) => {
                if (status) finished.value = true;
            },
        );
        this.effect.run();
    }
}
