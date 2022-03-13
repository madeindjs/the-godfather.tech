<style scoped>
#submit {
  margin-top: 1rem;
}
</style>
<template>
  <div>
    <button @click="displayStripeForm" v-if="!isStripeFormVisible">
      Pay this campaign ({{ formatMoney(amount) }})
    </button>
    <article v-show="isStripeFormVisible">
      <header>Pay this campaign ({{ formatMoney(amount) }})</header>
      <p>A credit is needed to start a campaign. You can pay the amount you want to credit your account.</p>
      <!-- amount form -->

      <!-- stripe form -->
      <form id="payment-form" @submit.prevent="submit">
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
import { ref, defineProps } from "vue";
import { useStripePay } from "../composition/useStripe";
import { formatMoney } from "../utils/formatter";

const props = defineProps(["amount"]);

const isStripeFormVisible = ref(false);

const { init, submit } = useStripePay(props.amount);

const displayStripeForm = async () => {
  isStripeFormVisible.value = true;
  init();
};
</script>
