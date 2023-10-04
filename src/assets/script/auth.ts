import { onMounted, ref, watch } from "vue";
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
    if (auth.value) {
      username.value = resp.data.user;
    }
  } else {
    auth.value = false;
    username.value = "";
  }
}

watch(token, update);

window.addEventListener("load", () => {
  const url = new URLSearchParams(window.location.search);
  if (url.has("token")) {
    window.history.replaceState({}, "", "/");
    const client = url.get("token") || "";
    if (client)
      axios.post("/login", { token: client }).then((resp) => {
        token.value = resp.data.token;
      });
  }
  update().then((r) => 0);
});
