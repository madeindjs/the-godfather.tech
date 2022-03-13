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

    <h2>My orders</h2>
    <p>Currently you dispose to a credit of <Balance /></p>
    <p>You need to add credits to start a campaign.</p>
    <p>Bellow you can find a list of your previous orders.</p>
    <PaiementsTable />
    <BuyCredits />
  </div>
</template>

<script setup>
// @ts-check

import { userStore } from "../store/UserStore";
import BuyCredits from "../components/BuyCredits.vue";
import Balance from "../components/Balance.vue";
import PaiementsTable from "../components/PaiementsTable.vue";

const state = userStore.getState();

function logout() {
  userStore.logout();
}
</script>
