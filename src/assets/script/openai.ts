import { ref } from "vue";
import type { Ref } from "vue";
import { connection } from "@/assets/script/connection";
import type { StreamMessage } from "@/assets/script/connection";

export const finished = ref<boolean>(true);

export class OpenAI {
  private readonly ref: Ref<string>;
  public readonly queue: Ref<string>;

  public constructor() {
    this.ref = ref("");
    this.queue = ref("");

    connection.setCallback((message: StreamMessage) => {
      this.ref.value += message.message;
      finished.value = message.end;

      setTimeout(() => {
          const data = this.queue.value;
          if (finished.value && data.length > 0) this.trigger(data);
      }, 500);
    });
  }
  public getRef(): Ref<string> {
    return this.ref;
  }

  public trigger(text: string) {
    if (!finished.value) {
      this.queue.value = text;
      return;
    }

    finished.value = false;
    this.ref.value = "";
    this.queue.value = "";
    connection.sendWithRetry({
      type: "chat",
      message: text,
      model: "gpt-3.5-turbo",
      web: false,
    });
  }
}
