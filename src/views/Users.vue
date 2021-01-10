<template>
  <div>
    <div class="md-flex justify-center">
      <div class="bg-gray-100 p-8 filter-users">
        <h2 class="pb-2 font-sm font-bold text-gray-700 mb-5 capitalize">
          Filtrar por usuário:
        </h2>
        <Checkbox
          v-model="optionsCheckbox"
          :options="['Especial', 'Normal', 'Trabalhoso']"
        />
        {{ optionsCheckbox }}
      </div>
      <div class="ml-2 bg-gray-100 grid-users md-full">
        <div
          v-for="(user, index) in result"
          :key="index"
          class="bg-gray-200 p-8 rounded-default user"
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
        </div>
      </div>
    </div>

    <div id="arrayPagination">
      <!-- <p>page {{ currentPage }} of {{ lastPage }}</p> -->

      <div class="flex items-center justify-center mt-8 mb-8">
        <button class="btn-pagination mr-2" @click="prev">
          &lt;&lt;
        </button>
        <button class="btn-pagination mr-2" @click="prev">
          1
        </button>
        <button class="btn-pagination mr-2" @click="prev">
          2
        </button>
        <button class="btn-pagination" @click="next">
          >>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { usePagination } from "vue-composable";
import { defineComponent, onBeforeMount, ref, computed } from "vue";
import Checkbox from '@/components/Checkbox/Checkbox.vue'

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
    // "especial", "normal", "trabalhoso"
    const filterOptions = ref("");
    const optionsCheckbox = ref()

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
    onBeforeMount(() => {
      getData();
    });
    const rangeEspecial = {
      minlon: -2.196998,
      minlat: -46.361899,
      maxlon: -15.41158,
      maxlat: -34.276938
    };

    const filtredUsers = computed(() => {
      if (filterOptions.value === "especial") {
        return users.value.filter(user => {
          return (
            user.location.coordinates.latitude <= rangeEspecial.maxlat &&
            user.location.coordinates.latitude >= rangeEspecial.minlat
          );
        });
      } else {
        return users.value;
      }
    });

     const {
      currentPage,
      lastPage,
      next,
      prev,
      offset,
      pageSize,
    } = usePagination({
      currentPage: 1,
      pageSize: 9,
      total: computed(() => users.value.length),
    });

    const result = computed(() => {
      const array = users.value;
      if (!Array.isArray(array)) return [];
      return array.slice(offset.value, offset.value + pageSize.value);
    });


    return {
      getData,
      users,
      filtredUsers,
      filterOptions,
      next,
      prev,
      currentPage,
      lastPage,
      pageSize,
      result,
      offset,
      optionsCheckbox
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
}
.filter-users {
  min-width: 170px;
  max-height: 160px;
}
.btn-pagination {
  border-radius: 0.5rem;
  padding: 0.98rem;
  border: none;
  background-color: #ededed;
  cursor: pointer;
}
@media screen and (min-width: 768px) {
  .grid-users {
    grid-template-columns: 1fr 1fr;
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
