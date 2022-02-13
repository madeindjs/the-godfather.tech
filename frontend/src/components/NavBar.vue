<template>
  <nav class="nav-bar">
    <ul>
      <li>
        <strong>
          <router-link to="/">Home</router-link>
        </strong>
      </li>
      <li>
        <router-link to="/badge/new">Add image tag</router-link>
      </li>
      <li v-if="state.email"><router-link to="/campaigns">Campaigns</router-link></li>
    </ul>
    <ul>
      <li v-if="!state.email">
        <SigninWithGithub />
      </li>
      <li v-if="state.email" style="text-align: right">
        {{ state.email }}<br /><small><a href="#" @click.prevent="logout">logout</a></small>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { userStore } from "../store/UserStore";
import SigninWithGithub from "./SigninWithGithub.vue";

const state = userStore.getState();

function logout() {
  userStore.logout();
}
</script>

<style scoped>
.nav-bar {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
