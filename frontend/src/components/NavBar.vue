<template>
  <nav class="nav-bar">
    <ul>
      <li>
        <strong>
          <!-- TODO: use logo -->
          <router-link to="/">Home</router-link>
        </strong>
      </li>
      <li>
        <router-link to="/badges/new">Generate badge</router-link>
      </li>
      <li v-if="state.email"><router-link to="/campaigns">Campaigns</router-link></li>
    </ul>
    <ul v-if="state.email">
      <li>
        <router-link to="/account" :title="state.email">My account</router-link>
      </li>
    </ul>
    <ul v-else>
      <li>
        <SigninWithGithub />
      </li>
    </ul>
  </nav>
</template>

<script setup>
// @ts-check
import { userStore } from "../store/UserStore";
import SigninWithGithub from "./SigninWithGithub.vue";

const state = userStore.getState();
</script>

<style scoped>
.nav-bar {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
