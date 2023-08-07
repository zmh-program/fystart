import {onMounted, ref} from "vue";
import type {Ref} from "vue";

export function registerScrollableComponent(component: Ref<HTMLElement | null>) {
  const start = ref<number>(NaN);

  return onMounted(() => {
    if (component.value === null) return;
    component.value.addEventListener('touchstart', (e) => {
      start.value = e.touches[0].clientY;
    })
    component.value.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (component.value === null) return;
      const current = e.touches[0].clientY;
      const height = current - start.value;
      start.value = current;
      component.value.scrollTop = component.value.scrollTop - height;
    })
  });
}
