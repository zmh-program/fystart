import { ref, watch } from "vue";
import axios from "axios";

export const auth = ref<boolean | undefined>(undefined);
export const token = ref(localStorage.getItem("token") || "");
export const username = ref("");

async function update() {
  localStorage.setItem("token", token.value);
  axios.defaults.headers.common["Authorization"] = token.value;

  if (token.value) {
    const resp = await axios.post("/state");
    username.value = resp.data.user;
    auth.value = resp.data.status;
  }
}

watch(token, update);
setTimeout(update, 0);
