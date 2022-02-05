// @ts-check
import { createRouter, createWebHistory } from "vue-router";
import { toastStore } from "../store/ToastStore";
import { userStore } from "../store/UserStore";
import Home from "../views/Home.vue";

function loginGuard(_from, _to, next) {
  if (userStore.getState().email) {
    return next();
  }
  toastStore.display("You must be logged to access to this page.", "warn");
  return next({ name: "Home" });
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import(/* webpackChunkName: "faq" */ "../views/Faq.vue"),
  },
  {
    path: "/image/create",
    name: "/image/create",
    component: () => import(/* webpackChunkName: "create-image" */ "../views/CreateImage.vue"),
  },
  {
    path: "/campaigns",
    name: "Campaigns",
    component: () => import(/* webpackChunkName: "campaigns" */ "../views/Campaigns.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/campaign/:id",
    name: "Campaign",
    props: true,
    component: () => import(/* webpackChunkName: "campaign" */ "../views/Campaign.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/github-logged",
    name: "GithubLogged",
    component: () => import(/* webpackChunkName: "github-logged" */ "../views/GithubLogged.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
