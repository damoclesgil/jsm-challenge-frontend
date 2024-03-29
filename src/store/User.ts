import { ref, computed } from "vue";

export const stateUser = ref<object>({
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
});

export const setCurrentUser = (user: object) => {
  return Object.assign(stateUser.value, user);
};

export const user = computed(() => stateUser.value);
