import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import PageNotFound from "../views/PageNotFound.vue";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const routes = [
  { path: "/", redirect: "/board" },
  { path: "/board", component: Home, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/:catchAll(.*)", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next(); 
  }
});

export default router;
