<template>
  <nav class="nav-bar">
    <ul class="nav-bar__links">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li><router-link to="/campaigns">Campaigns</router-link></li>
      <li>
        <router-link to="/image/create">Add image tag</router-link>
      </li>
      <li v-if="!state.email">
        <SigninWithGithub />
      </li>
      <li v-if="state.email">
        {{ state.email }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { userStore } from "../store/UserStore";
import SigninWithGithub from "./SigninWithGithub.vue";

const state = userStore.getState();
console.log(state);
</script>

<style>
.nav-bar {
  display: grid;
  height: 5rem;
}

.nav-bar__links {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
}

.nav-bar__links li {
  display: inline;
}

.nav-bar a {
  font-weight: bold;
  color: #2c3e50;
}

.nav-bar a.router-link-exact-active {
  color: #42b983;
}
</style>
