<template>
  <div class="app">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  components: { NavBar, Footer },
  setup() {},
});
</script>

<style scoped>
.app {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
