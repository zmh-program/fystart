/// <reference types="vite-plugin-pwa/client" />
import { useRegisterSW } from "virtual:pwa-register/vue";
import {ref, watch} from "vue";

export const updater = ref<boolean>(false);
watch(updater, (v) => {
  if (updater.value) setTimeout(() => updater.value = false, 5000);
})

async function updateServiceVersion(r: ServiceWorkerRegistration) {
  const {  // @ts-ignore
    onupdatefound
  } = await r.update();
  if (onupdatefound) {
    console.log(onupdatefound);
    updater.value = true;
  }
}
const updateServiceWorker = useRegisterSW({
  onRegistered(r) {
    r && setInterval(async () => {
      await updateServiceVersion(r);
    }, 10);
  }
});
