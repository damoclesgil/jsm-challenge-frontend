import { ref, computed } from "vue";

export const stateSearch = ref<string>("");

export const search = computed(() => stateSearch.value);
