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
      <button
        v-for="(user, index) in filtredUsers"
        :key="index"
        class="bg-gray-200 p-8 rounded-default user"
        @click="goToUser(user, Number(index))"
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
      </button>
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
import { defineComponent, ref, computed, readonly, onMounted } from "vue";
import { search } from "@/store/Search.ts";
import { setCurrentUser } from "@/store/User.ts";
import Checkbox from "@/components/Checkbox/Checkbox.vue";
import router from "@/router";

type filtersOption = "Especial" | "Normal" | "Trabalhoso";
type usersArray = Array<object>;

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

    const rangeNormal = readonly({
      minlon: -34.016466,
      minlat: -54.777426,
      maxlon: -26.155681,
      maxlat: -46.603598
    });

    const getData = () => {
      // const proxyUrl = "http://localhost:8010/proxy";
      // const proxyUrl = "http://localhost:3000";
      const originalUrl = "https://jsm-challenges.s3.amazonaws.com";
      // lcp --proxyUrl https://jsm-challenges.s3.amazonaws.com
      // https://www.npmjs.com/package/local-cors-proxy
      const urlApi = `${originalUrl}/frontend-challenge`;
      const config = {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      fetch(urlApi, config)
        .then(response => {
          // return console.log(response.json());
          return response.json();
        })
        .then(res => {
          // return console.log(res);
          return (users.value = res.results);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const { currentPage, next, prev, offset, pageSize } = usePagination({
      currentPage: 1,
      pageSize: 9,
      total: computed(() => users.value.length)
    });

    const filtredUsers = computed(() => {
      let usersArray: usersArray = [];

      const searchedUsers = users.value.filter(user => {
        return (
          user.name.first.toLowerCase().includes(search.value.toLowerCase()) ||
          user.name.last.toLowerCase().indexOf(search.value.toLowerCase()) >= 0
        );
      });

      if (selectedFilter.value.length) {
        if (selectedFilter.value.includes("Especial")) {
          usersArray = searchedUsers.filter(user => {
            return (
              user.location.coordinates.latitude <= rangeEspecial.maxlat &&
              user.location.coordinates.latitude >= rangeEspecial.minlat
            );
          });
        }

        if (selectedFilter.value.includes("Normal")) {
          usersArray = searchedUsers.filter(user => {
            return (
              user.location.coordinates.latitude <= rangeNormal.maxlat &&
              user.location.coordinates.latitude >= rangeNormal.minlat
            );
          });
        }
        if (selectedFilter.value.includes("Trabalhoso")) {
          return (usersArray = searchedUsers);
        }
      } else {
        return (usersArray = searchedUsers);
      }

      return usersArray.slice(offset.value, offset.value + pageSize.value);
    });

    function onClickCheckbox(filterName: filtersOption[]) {
      selectedFilter.value = filterName;
    }

    onMounted(() => {
      getData();
    });

    function goToUser(user: object, index: number) {
      setCurrentUser(user);
      router.push({ name: "user", params: { id: index } });
    }

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
      goToUser
    };
  }
});
</script>
<style scoped>
.grid-users {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 2.15rem;
  padding: 3.2rem 2.6rem;
}
.user {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  border: none;
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.user:hover {
  background-color: #d1d1d1;
}

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
