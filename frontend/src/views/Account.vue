<template>
  <div class="campaign">
    <h1>My account</h1>
    <p>
      You are connected as <strong>{{ state.email }}</strong
      >.
    </p>
    <div>
      <button @click="logout">logout</button>
    </div>

    <h2>My credits</h2>
    <BuyCredits />
  </div>
</template>

<script setup>
// @ts-check

import { userStore } from "../store/UserStore";
import BuyCredits from "../components/BuyCredits.vue";

const state = userStore.getState();

function logout() {
  userStore.logout();
}
</script>
