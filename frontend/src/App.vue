<style scoped>
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 4rem 1fr auto;
  row-gap: 1rem;
}
</style>
<template>
  <div class="app">
    <NavBar />
    <router-view class="container" />
    <Footer />
    <Toasts />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import Toasts from "./components/Toasts.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  components: { NavBar, Footer, Toasts },
  setup() {},
});
</script>
