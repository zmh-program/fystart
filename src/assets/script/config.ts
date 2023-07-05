import { ref, watch } from 'vue';
export const background = ref(localStorage.getItem("background") || "/background.webp");

watch(
    background,
    () => localStorage.setItem("background", background.value.trim() || "/background.webp"),
)
