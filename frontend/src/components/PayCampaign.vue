<style scoped>
#submit {
  margin-top: 1rem;
}
</style>
<template>
  <div>
    <article>
      <header>Pay this campaign</header>
      <p>
        This campaign is pending payment. Pay {{ formatMoney(props.campaign.totalPrice) }} to activate this campaign.
      </p>
      <!-- amount form -->

      <!-- stripe form -->
      <form id="payment-form" @submit.prevent="submit" v-if="!isError">
        <div id="payment-element">
          <div aria-busy="true">Stripe is loading</div>
          <!-- Elements will create form elements here -->
        </div>
        <button id="submit">Pay {{ formatMoney(props.campaign.totalPrice) }}</button>
        <div id="error-message">
          <!-- Display error message to your customers here -->
        </div>
      </form>
      <p v-if="isError">Cannot initialize Stripe paiement form. Please try again or try to create a new campaign.</p>
    </article>
  </div>
</template>
<script setup>
// @ts-check
import { defineProps } from "vue";
import { useStripePayIntent } from "../composition/useStripe";
import { formatMoney } from "../utils/formatter";

const props = defineProps(["campaign"]);

const { submit, isError } = useStripePayIntent(props.campaign);
</script>
