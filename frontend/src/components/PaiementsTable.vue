<template>
  <div :aria-busy="isLoading">
    <table v-if="paiements">
      <thead>
        <tr>
          <th>amount</th>
          <th>created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(paiement, index) of paiements" :key="index">
          <td>{{ formatMoney(paiement.amount) }}</td>
          <td>{{ paiement.createdAt }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>You don't have campaigns yet.</p>
  </div>
</template>
<script setup>
// @ts-check
import { formatMoney } from "../utils/formatter";

import { usePaiements } from "../composition/usePaiements";

const { fetchPaiements, paiements, isLoading } = usePaiements();

fetchPaiements();
</script>

<style scoped>
.tag {
  padding: 0.4rem;
  border-radius: 5px;
  background-color: orangered;
  /* margin-left: 0.4rem; */
  margin-right: 0.4rem;
}
</style>
