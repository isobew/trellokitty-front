import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Report from "../views/Report.vue";

function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp;

    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return now >= exp;
  } catch (error) {
    return true;
  }
}

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null && !isTokenExpired(token);
};

const routes = [
  { path: "/", redirect: "/board" },
  { path: "/board", component: Home, meta: { requiresAuth: true } },
  { path: "/report", component: Report, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/:catchAll(.*)", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
  }

  const loggedIn = isAuthenticated();

  if (to.meta.requiresAuth && !loggedIn) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/register") && loggedIn) {
    next("/");
  } else {
    next();
  }
});


export default router;
