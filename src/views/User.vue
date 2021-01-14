<template>
  <div class="user mb-4">
    <h1 class="text-center font-bold font-lg">Informações do Usuário</h1>

    <div
      v-if="user.picture.large"
      class="flex flex-col items-center justify-center"
    >
      <img
        class="rounded-default"
        :src="user.picture.large"
        :alt="user.name.first"
        :title="user.name.first"
      />
    </div>

    <h2
      class="pb-2 font-md font-bold text-gray-700 mt-4 capitalize text-center"
    >
      {{ user.name.first }}
      {{ user.name.last }}
    </h2>

    <h3 class="font-base text-gray-700 mt-3 capitalize text-center">
      {{ user.location.state }}, {{ user.location.city }}
    </h3>
    <div class="items-center justify-between info-user">
      <div class="mr-2 flex items-center mb-2">
        <img src="@/assets/phone-call.svg" alt="E-mail Icon" width="20" />
        <p class="ml-2">{{ user.phone }}</p>
      </div>
      <div class="mr-2 flex items-center mb-2">
        <img src="@/assets/gender.svg" alt="E-mail Icon" width="20" />
        <p class="ml-2">{{ user.gender }}</p>
      </div>
      <div class="mr-2 flex items-center mb-2">
        <img src="@/assets/email.svg" alt="E-mail Icon" width="20" />
        <p class="ml-2">{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { user } from "@/store/User.ts";

export default defineComponent({
  name: "User",
  props: {
    id: {
      type: Number
    }
  },
  setup() {
    return { user };
  }
});
</script>
<style scoped>
h1 {
  margin-bottom: 4rem;
}
.user {
  min-height: 45vh;
}
.info-user {
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 768px) {
  .info-user {
    flex-direction: row;
    max-width: 40rem;
  }
}
</style>
