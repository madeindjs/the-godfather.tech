<template>
  <div class="account">
    <div class="grid">
      <h1>My account</h1>
      <div>
        <button @click="logout" class="secondary outline">logout</button>
      </div>
    </div>
    <p>
      You are connected as <strong>{{ state.email }}</strong
      >.
    </p>
  </div>
</template>

<script setup>
// @ts-check

import { userStore } from "../store/UserStore";

const state = userStore.getState();

function logout() {
  userStore.logout();
}
</script>
