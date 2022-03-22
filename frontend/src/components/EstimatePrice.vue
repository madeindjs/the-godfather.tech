<template>
  <div class="grid">
    <div>
      <label for="">Number of stars</label>
      <input type="number" v-model="numberOfStars" step="1" min="1" />
    </div>
    <div>
      <label for="">Price per 1000 visits</label>
      <input type="text" :value="formatMoney(price1000)" />
      <small>including tax of {{ formatMoney(tax) }}</small>
    </div>
  </div>
</template>
<script setup>
// @ts-check
import { computed, ref } from "vue";
import { calculatePrice, calculateTax } from "../utils/price";
import { formatMoney } from "../utils/formatter";

const numberOfStars = ref(50);

const price1000 = computed(() => calculatePrice(numberOfStars.value, 1000));
const tax = computed(() => calculateTax(numberOfStars.value, 1000));
</script>

<style scoped>
.estimate-price {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;
}
</style>
