import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import type { Element } from "@/assets/script/utils/base";
import { contains, getListExcludeSelf, getValueOfRef } from "@/assets/script/utils/base";

const components: Ref<Element>[] = [];

export function registerScrollableComponent(component: Ref<HTMLElement | null>, miniUnit?: boolean) {
  const start = ref<number>(NaN);
  const animationFrame = ref<number>(NaN);

  if (components.includes(component)) return;
  components.push(component);

  function detectReflect(e: TouchEvent): boolean {
    if (miniUnit || component.value === null) return false;
    return contains(
      getListExcludeSelf(getValueOfRef(components), component.value),
      e.target as HTMLElement,
      true
    );
  }

  function animateScroll(scrollTop: number) {
    if (component.value === null) return;

    const scrollDiff = scrollTop - component.value.scrollTop;
    const step = Math.max(1, Math.abs(scrollDiff) / 10);

    if (Math.abs(scrollDiff) <= step) {
      component.value.scrollTop = scrollTop;
      cancelAnimationFrame(animationFrame.value);
      return;
    }

    if (scrollDiff > 0) {
      component.value.scrollTop += step;
    } else {
      component.value.scrollTop -= step;
    }

    animationFrame.value = requestAnimationFrame(() => animateScroll(scrollTop));
  }

  return onMounted(() => {
    if (component.value === null) return;

    component.value.addEventListener("touchstart", (e) => {
      if (detectReflect(e)) return;
      start.value = e.touches[0].clientY;
    });

    component.value.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (detectReflect(e)) return;

      if (component.value === null) return;

      const current = e.touches[0].clientY;
      const height = (current - start.value) * 4;
      start.value = current;
      const newScrollTop = component.value.scrollTop - height;

      cancelAnimationFrame(animationFrame.value);
      animateScroll(newScrollTop);
    });
  });
}
