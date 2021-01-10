<template>
  <div class="footer flex items-center justify-center bg-gray-100">
    <Logo size="normal" />
    <h2 class="font-bold font-base mb-4">Juntos Somos Mais Fidelização S.A.</h2>
    <p class="mb-4 font-sm">Siga-nos em em nossas redes sociais:</p>
    <div class="flex">
      <i class="mr-2 bg-blue-500">
        <img src="@/assets/facebook-icon.svg" alt="Facebook" />
      </i>
      <i class="bg-blue-500">
        <img src="@/assets/instagram-icon.svg" alt="Instagram" />
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import Logo from "@/components/Logo/Logo.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Logo
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
.footer {
  flex-direction: column;
  padding: 5rem 1.5rem;
  margin-bottom: 2rem;
}
.footer .logo-normal {
  margin-bottom: 3rem;
}
.footer i {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  color: #fff;
  background-color: #4e71a7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer i img {
  width: 1rem;
  height: 1rem;
}
</style>
