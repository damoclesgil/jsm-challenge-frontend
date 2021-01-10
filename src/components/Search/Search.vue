<template>
  <div class="search flex items-center md-full">
    <div class="search-container">
      <img src="@/assets/search-icon.svg" alt="search Icon" />
      <input
        class="search-field"
        type="search"
        v-model="stateSearch"
        placeholder="Buscar aqui"
      />
    </div>
    <div class="ml-2 trace bg-gray-100"></div>
    <div class="ml-2 trace bg-gray-100"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { stateSearch } from "@/store/Search.ts";
export default defineComponent({
  props: {
    size: {
      type: String,
      default: "normal"
    }
  },
  setup() {
    return { stateSearch };
  }
});
</script>
<style>
.search-field {
  width: 100%;
  border-radius: 2rem;
  background-color: #ededed;
  padding: 0.7rem 1rem 0.7rem 2.3rem;
  border: none;
}
.trace {
  width: 6.5rem;
  height: 1rem;
}
.search-container {
  width: 100%;
  position: relative;
  margin-right: 1rem;
}
.search-container img {
  position: absolute;
  top: 9px;
  left: 10px;
  width: 1.2rem;
  height: 1.2rem;
}
@media screen and (max-width: 767px) {
  .search {
    flex-direction: column;
  }
  .search-field {
    margin-top: 3rem;
    margin-bottom: 1rem;
    padding: 0.7rem 1rem;
  }
  .search-container {
    margin-right: 0;
  }
  .trace {
    margin-bottom: 1rem;
  }
  .search-container img {
    display: none;
  }
}
</style>
