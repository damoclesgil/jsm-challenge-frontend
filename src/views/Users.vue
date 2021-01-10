<template>
  <div class="md-flex justify-center">
    <div class="bg-gray-100 p-8 filter-users">
      <h2 class="pb-2 font-sm font-bold text-gray-700 mb-5 capitalize">
        Filtrar por usuário:
      </h2>
      <Checkbox
        @input="onClickCheckbox"
        :options="['Especial', 'Normal', 'Trabalhoso']"
      />
    </div>
    <div class="md-ml-2 bg-gray-100 grid-users md-full">
      <router-link
        v-for="(user, index) in filtredUsers"
        :key="index"
        class="bg-gray-200 p-8 rounded-default user"
        :to="{ name: 'User', params: { id: index } }"
      >
        <div v-if="user.picture.large">
          <img
            class="rounded-default"
            :src="user.picture.large"
            :alt="user.name.first"
            :title="user.name.first"
          />
        </div>
        <h1 class="pb-2 font-md font-bold text-gray-700 mt-4 capitalize">
          {{ user.name.first }}
          {{ user.name.last }}
        </h1>

        <h3 class="font-base text-gray-700 mt-3 capitalize">
          {{ user.location.street }}
        </h3>

        <p class="font-xs text-gray-700 mt-2 line-trought capitalize">
          {{ user.location.city }}
        </p>
        <p class="font-xs text-gray-700 line-trought capitalize">
          {{ user.location.state }} - CEP:
          {{ user.location.postcode }}
        </p>
      </router-link>
      <div v-if="filtredUsers.length === 0">Nenhum Usuário Encontrado</div>
    </div>
  </div>

  <div>
    <div class="flex items-center justify-center mt-8 mb-8">
      <button class="btn-pagination mr-2" @click="prev">&lt;&lt;</button>
      <button class="btn-pagination mr-2" @click="currentPage = 1">1</button>
      <button class="btn-pagination mr-2" @click="currentPage = 2">2</button>
      <button class="btn-pagination" @click="next">>></button>
    </div>
  </div>
</template>

<script lang="ts">
import { usePagination } from "vue-composable";
import { defineComponent, onBeforeMount, ref, computed, readonly } from "vue";
import { search } from "@/store/Search.ts";
import Checkbox from "@/components/Checkbox/Checkbox.vue";

type filtersOption = "Especial" | "Normal" | "Trabalhoso";

export default defineComponent({
  name: "Users",
  components: {
    Checkbox
  },
  setup() {
    const users = ref([
      {
        gender: "female",
        name: {
          title: "mrs",
          first: "alejandra",
          last: "rodrigues"
        },
        location: {
          street: "3833 rua santa catarina ",
          city: "umuarama",
          state: "santa catarina",
          postcode: 43646,
          coordinates: {
            latitude: -50.7186,
            longitude: -20.4596
          },
          timezone: {
            offset: "+3:00",
            description: "Baghdad, Riyadh, Moscow, St. Petersburg"
          }
        },
        email: "alejandra.rodrigues@example.com",
        dob: {
          date: "1974-05-16T14:46:15Z",
          age: 44
        },
        registered: {
          date: "2013-03-06T16:09:16Z",
          age: 5
        },
        phone: "(09) 7033-7406",
        cell: "(54) 3190-3469",
        picture: {
          large: "https://randomuser.me/api/portraits/women/18.jpg",
          medium: "https://randomuser.me/api/portraits/med/women/18.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/women/18.jpg"
        }
      }
    ]);
    const selectedFilter = ref<filtersOption[]>([]);

    const rangeEspecial = readonly({
      minlon: -15.41158,
      minlat: -46.361899,
      maxlon: -2.196998,
      maxlat: -34.276938
    });
    // eslint-disable-next-line
    const rangeEspecial2 = readonly({
      minlon: -20.0,
      minlat: -52.997614,
      maxlon: -19.766959,
      maxlat: -44.428305
    });
    // eslint-disable-next-line
    const rangeNormal = readonly({
      minlon: -34.016466,
      minlat: -54.777426,
      maxlon: -26.155681,
      maxlat: -46.603598
    });

    const getData = () => {
      const urlApi = `https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json`;
      const config = { method: "get" };
      fetch(urlApi, config)
        .then(response => {
          return response.json();
        })
        .then(res => {
          return (users.value = res.results);
        })
        .catch(error => {
          console.log(error);
        });
    };

    const { currentPage, next, prev, offset, pageSize } = usePagination({
      currentPage: 1,
      pageSize: 9,
      total: computed(() => users.value.length)
    });

    const filtredUsers = computed(() => {
      // if (!Array.isArray(users.value)) return [];
      let usersArray = [];

      if (selectedFilter.value.length === 0) {
        usersArray = users.value.filter(user => {
          return (
            user.name.first
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            user.name.last.toLowerCase().indexOf(search.value.toLowerCase()) >=
              0
          );
        });
      }

      if (selectedFilter.value.length) {
        if (selectedFilter.value.includes("Especial")) {
          usersArray = users.value.filter(user => {
            return (
              user.location.coordinates.latitude <= rangeEspecial.maxlat &&
              user.location.coordinates.latitude >= rangeEspecial.minlat
            );
          });
        }
      }

      return usersArray.slice(offset.value, offset.value + pageSize.value);
    });

    function onClickCheckbox(filterName: filtersOption[]) {
      selectedFilter.value = filterName;
    }

    onBeforeMount(() => {
      getData();
    });

    return {
      selectedFilter,
      next,
      prev,
      currentPage,
      pageSize,
      filtredUsers,
      offset,
      search,
      onClickCheckbox,
      rangeEspecial
    };
  }
});
</script>
<style>
.grid-users {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 2.15rem;
  padding: 3.2rem 2.6rem;
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}
/* .filter-users {
  max-height: 160px;
} */
.btn-pagination {
  border-radius: 0.5rem;
  padding: 0.98rem;
  border: none;
  background-color: #ededed;
  cursor: pointer;
  transition: all ease-in 0.3s;
}
.btn-pagination:hover {
  background-color: #d4d4d4;
}
@media screen and (min-width: 768px) {
  .grid-users {
    grid-template-columns: 1fr 1fr;
  }
  .filter-users {
    min-width: 170px;
    max-height: 160px;
  }
}
@media screen and (min-width: 1023px) {
  .grid-users {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .filter-users {
    min-width: 250px;
  }
}
</style>
