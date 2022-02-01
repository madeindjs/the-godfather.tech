import { createApp } from "vue";
import VueClipboard from "vue3-clipboard";
import App from "./App.vue";
import router from "./router";
import "./utils/http";

createApp(App).use(router).use(VueClipboard).mount("#app");
