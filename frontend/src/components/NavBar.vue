<template>
  <nav>
    <ul>
      <li><strong>Brand</strong></li>
    </ul>
    <ul>
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
