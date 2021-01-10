<template>
  <div class="header w-full">
    <div class="container-logo">
      <Logo size="normal" />
    </div>
    <Search />
  </div>
</template>

<script lang="ts">
import Logo from "@/components/Logo/Logo.vue";
import Search from "@/components/Search/Search.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Logo,
    Search
  },
  props: {
    size: {
      type: String,
      default: "normal"
    }
  }
});
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 4rem;
}
@media screen and (min-width: 768px) {
  .header {
    flex-direction: row;
  }
  .header .container-logo {
    min-width: 300px;
  }
}
</style>
