import {ref, watch} from 'vue';
export const background = ref(localStorage.getItem("background") || "/background.jpg");


watch(
    background,
    () => localStorage.setItem("background", background.value.trim() || "/background.jpg"),
)
