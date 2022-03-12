<template>
  <div :aria-busy="isLoading">
    <form v-if="!displayForm" @submit.prevent="initStripeForm">
      <label for="amount">Amount</label>
      <input id="amount" type="number" step="1" min="0" v-model="amount" />
      <input type="submit" value="Buy credits" />
    </form>
    <form id="payment-form" v-show="displayForm" @submit.prevent="submit">
      <div id="payment-element">
        <!-- Elements will create form elements here -->
      </div>
      <button id="submit">Submit</button>
      <div id="error-message">
        <!-- Display error message to your customers here -->
      </div>
    </form>
  </div>
</template>
<script setup>
// @ts-check
import { ref } from "vue";
import { useStripeForm } from "../composition/useStripe";

const displayForm = ref(false);

const { amount, isLoading, init, submit } = useStripeForm();

const initStripeForm = () => {
  displayForm.value = true;
  init();
};
</script>
