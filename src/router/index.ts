import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Users from "../views/Users.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Users",
    component: Users
  },
  {
    path: "/user/:id",
    name: "User",
    props: true,
    component: () => import(/* webpackChunkName: "User" */ "../views/User.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
