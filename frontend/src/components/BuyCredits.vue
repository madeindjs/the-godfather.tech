<template>
  <div :aria-busy="loading">
    <form v-if="stripe && !displayForm" @submit.prevent="initStripeForm">
      <label for="amount">Amount</label>
      <input id="amount" type="number" step="1" min="0" v-model="amount" />
      <input type="submit" value="Buy credits" />
    </form>
    <form id="payment-form" v-show="displayForm">
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
import { loadStripe } from "@stripe/stripe-js/pure";
import { getConfigKey } from "../utils/config";
import { createPaiement } from "../utils/paiements";

const loading = ref(false);
const displayForm = ref(false);
const amount = ref(10);

const stripe = ref();

async function load() {
  loading.value = true;
  const clientId = await getConfigKey("STRIPE_CLIENT_ID");
  stripe.value = await loadStripe(clientId);
  loading.value = false;
}

async function initStripeForm() {
  if (!stripe.value) return;

  const { clientSecret } = await createPaiement({ amount: amount.value });

  const options = {
    clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const elements = stripe.value.elements(options);
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
  displayForm.value = true;
}

load();
</script>
