import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  },
  {
    path: "/signin",
    name: "Sign In",
    component: () => import(/* webpackChunkName: "signin" */ "../views/Signin.vue"),
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
