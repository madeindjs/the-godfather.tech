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
    path: "/account",
    name: "Account",
    component: () => import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import(/* webpackChunkName: "faq" */ "../views/Faq.vue"),
  },
  {
    path: "/badge/new",
    name: "/badge/new",
    component: () => import(/* webpackChunkName: "create-tag" */ "../views/CreateImage.vue"),
  },
  {
    path: "/campaigns",
    name: "Campaigns",
    component: () => import(/* webpackChunkName: "campaigns" */ "../views/Campaigns.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/campaigns/new",
    name: "CampaignForm",
    component: () => import(/* webpackChunkName: "campaigns" */ "../views/CampaignForm.vue"),
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
  {
    path: "/order-complete",
    name: "OrderComplete",
    component: () => import(/* webpackChunkName: "account" */ "../views/OrderComplete.vue"),
    beforeEnter: loginGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
