<style scoped>
.balance {
  cursor: pointer;
}
</style>

<template>
  <span class="balance" :aria-busy="isLoading" @click="fetchBalance" data-tooltip="Click on me to refresh value">{{
    formatMoney(balance)
  }}</span>
</template>

<script setup>
// @ts-check
import { useBalance } from "../composition/useBalance";
import { formatMoney } from "../utils/formatter";

const { fetchBalance, balance, isLoading } = useBalance();

fetchBalance();
</script>
