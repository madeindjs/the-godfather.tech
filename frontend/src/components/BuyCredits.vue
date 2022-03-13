<style scoped>
#submit {
  margin-top: 1rem;
}
</style>
<template>
  <div>
    <button @click="displayAmountForm = true" v-if="!displayAmountForm">Buy credits</button>
    <article v-if="displayAmountForm" :aria-busy="isLoading">
      <header>Buy credits</header>
      <p>A credit is needed to start a campaign. You can pay the amount you want to credit your account.</p>
      <!-- amount form -->
      <form @submit.prevent="initStripeForm" v-if="!displayStripeForm">
        <label for="amount">Amount</label>
        <input id="amount" type="number" step="1" min="0" v-model="amount" />
        <input type="submit" value="Goo to paiement" />
      </form>
      <!-- stripe form -->
      <form id="payment-form" v-show="displayStripeForm" @submit.prevent="submit">
        <div id="payment-element">
          <div aria-busy="true">Stripe is loading</div>
          <!-- Elements will create form elements here -->
        </div>
        <button id="submit">Pay {{ formatMoney(amount) }}</button>
        <div id="error-message">
          <!-- Display error message to your customers here -->
        </div>
      </form>
    </article>
  </div>
</template>
<script setup>
// @ts-check
import { ref } from "vue";
import { useStripeForm } from "../composition/useStripe";
import { formatMoney } from "../utils/formatter";

const displayAmountForm = ref(false);
const displayStripeForm = ref(false);

const { amount, isLoading, init, submit } = useStripeForm();

const initStripeForm = () => {
  displayStripeForm.value = true;
  init();
};
</script>
