<style scoped>
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1.2rem 4rem 1fr auto;
  row-gap: 1rem;
}
.alert {
  background-color: #b74d00;
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
  padding-left: 1rem;
  font-weight: 600;
}
</style>
<template>
  <div class="app">
    <p class="alert">This project is it in alpha stage. Use it at your own risk.</p>
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
