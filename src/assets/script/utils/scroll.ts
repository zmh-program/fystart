import {onMounted, ref} from "vue";
import type {Ref} from "vue";
import type {Element} from "@/assets/script/utils/base";
import {contains, getListExcludeSelf, getValueOfRef} from "@/assets/script/utils/base";

const components: Ref<Element>[] = [];

export function registerScrollableComponent(component: Ref<HTMLElement | null>, miniUnit?: boolean) {
  const start = ref<number>(NaN);
  if (components.includes(component)) return;
  components.push(component);

  function detectReflect(e: TouchEvent): boolean {
    if (miniUnit || component.value === null) return false;
    return contains(
      getListExcludeSelf(getValueOfRef(components), component.value),
      e.target as HTMLElement,
      true,
    )
  }

  return onMounted(() => {
    if (component.value === null) return;
    component.value.addEventListener('touchstart', (e) => {
      if (detectReflect(e)) return;
      start.value = e.touches[0].clientY;
    })
    component.value.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (detectReflect(e)) return;
      if (component.value === null) return;
      const current = e.touches[0].clientY;
      const height = current - start.value;
      start.value = current;
      component.value.scrollTop = component.value.scrollTop - height;
    })
  });
}
