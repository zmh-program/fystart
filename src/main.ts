import { createApp } from "vue";
import App from "./App.vue";
import i18n from "@/i18n";
import { endpoint } from "@/assets/script/config";
import "@/assets/script/auth";
import "./assets/style/base.css";
import axios from "axios";

const app = createApp(App);

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = endpoint;

app.use(i18n);
app.mount("#app");
