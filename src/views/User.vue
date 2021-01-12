<template>
  <div class="user mb-4">
    <h1>Informações do Usuário</h1>
    <h2 class="capitalize mt-2">
      {{ $route.params.first }}

      {{ $route.params.last }}
    </h2>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "User",
  props: {
    id: {
      type: Number
    },
    user: {
      type: Object
    }
  }
});
</script>
