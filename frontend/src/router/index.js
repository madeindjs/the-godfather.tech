// @ts-check
import { nextTick } from "vue";
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
    meta: { title: "The-Godfather.tech" },
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    meta: { title: "The-Godfather.tech" },
    component: () => import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/faq",
    name: "FAQ",
    meta: { title: "FAQ" },
    component: () => import(/* webpackChunkName: "faq" */ "../views/Faq.vue"),
  },
  {
    path: "/badges/new",
    name: "BadgeForm",
    meta: { title: "Generate badge" },
    component: () => import(/* webpackChunkName: "create-tag" */ "../views/CreateImage.vue"),
  },
  {
    path: "/badges",
    name: "Badges",
    meta: { title: "My badges" },
    component: () => import(/* webpackChunkName: "create-tag" */ "../views/Badges.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/campaigns",
    name: "Campaigns",
    meta: { title: "My campaigns" },
    component: () => import(/* webpackChunkName: "campaigns" */ "../views/Campaigns.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/campaigns/new",
    name: "CampaignForm",
    meta: { title: "New campaign" },
    component: () => import(/* webpackChunkName: "campaigns" */ "../views/CampaignForm.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/campaign/:id",
    name: "Campaign",
    props: true,
    meta: { title: "My campaign" },
    component: () => import(/* webpackChunkName: "campaign" */ "../views/Campaign.vue"),
    beforeEnter: loginGuard,
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "About" },
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/github-logged",
    name: "GithubLogged",
    meta: { title: "Logged!" },
    component: () => import(/* webpackChunkName: "github-logged" */ "../views/GithubLogged.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  nextTick(() => {
    let title = "The-Godfather.tech";

    if (to.meta.title) {
      title = `${to.meta.title} | ${title}`;
    }

    document.title = title;
  });
});

export default router;
