import { createRouter, createWebHistory } from "vue-router";
import { auth } from "./auth";
import { admin } from "./admin";
import { superadmin } from "./superadmin";
import { notFound } from "./404";
const routes = [auth, superadmin, admin, notFound];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const name = to.name === "auth";
  if (!token && !name) {
    return next({ name: "auth" });
  } else {
    if (token && name) {
      return next({ name: "admin" });
    } else {
      next();
    }
  }
});

export default router;
