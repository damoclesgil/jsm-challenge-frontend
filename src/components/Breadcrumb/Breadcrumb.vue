<template>
  <div class="flex items-center breadcrumb">
    <router-link to="/">Users </router-link>
    <span class="ml-2"> > </span>
    <router-link to="/user/1" class="ml-2">Usuários</router-link>
    <span class="ml-2"> > </span>
    <router-link to="/user/2" class="ml-2">Detalhes</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    size: {
      type: String,
      default: "normal"
    }
  }
});
</script>
<style scoped>
.breadcrumb {
  justify-content: flex-end;
  margin-bottom: 2rem;
  padding-right: 1rem;
}
.breadcrumb a {
  font-size: 0.8rem;
  text-decoration: none;
}
</style>
