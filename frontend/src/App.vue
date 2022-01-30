<template>
  <div class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
  setup() {},
});
</script>

<style></style>
