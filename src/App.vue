<template>
  <div id="nav" class="container">
    <Header />
    <Breadcrumb />
    <router-view />
    <Footer />
  </div>
</template>
<script lang="ts">
import Header from "@/components/Header/Header.vue";
import { defineComponent } from "vue";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.vue";
import Footer from "./components/Footer/Footer.vue";
export default defineComponent({
  components: {
    Header,
    Breadcrumb,
    Footer
  },
  props: {
    size: {
      type: String,
      default: "normal"
    }
  }
});
</script>
<style>
@import "./assets/reset.css";
@import "./assets/global.css";
</style>
