/// <reference types="vite-plugin-pwa/client" />
import { useRegisterSW } from "virtual:pwa-register/vue";

async function updateServiceVersion(r: ServiceWorkerRegistration) {
  const {  // @ts-ignore
    onupdatefound
  } = await r.update();
  console.log(onupdatefound);
}
const updateServiceWorker = useRegisterSW({
  onRegistered(r) {
    r && setInterval(async () => {
      await updateServiceVersion(r);
    }, 10);
  }
});
