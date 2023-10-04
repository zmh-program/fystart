/// <reference types="vite-plugin-pwa/client" />
import { useRegisterSW } from "virtual:pwa-register/vue";
import { ref, watch } from "vue";

export const version = "1.12.2";

export const updater = ref<boolean>(false);

if (localStorage.getItem("version") && localStorage.getItem("version") !== version) {
  updater.value = true;
}
localStorage.setItem("version", version);

watch(updater, () => {
  if (updater.value) setTimeout(() => updater.value = false, 5000);
})

async function updateServiceVersion(r: ServiceWorkerRegistration) {
  try {
    const {  // @ts-ignore
      onupdatefound
    } = await r.update();
    if (onupdatefound) {
      updater.value = true;
    }
  } catch (e) {
    console.debug(e);
  }
}
const updateServiceWorker = useRegisterSW({
  onRegistered(r) {
    r && updateServiceVersion(r);
    r && setInterval(async () => {
      await updateServiceVersion(r);
    }, 1000 * 60 * 60);
  }
});
