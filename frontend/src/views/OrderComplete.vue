<template>
  <div class="order-complete" :aria-busy="isStripeLoading">
    <h1>Order complete</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
// @ts-check
import { ref, watch } from "vue";
import { useStripe } from "../composition/useStripe";
import { useToaster } from "../composition/useToaster";

const { stripe, isStripeLoading } = useStripe();
const { showError, showSuccess } = useToaster();

const message = ref("");

watch(stripe, () => {
  if (!stripe.value) return;

  load();
});

function load() {
  // Retrieve the "payment_intent_client_secret" query parameter appended to
  // your return_url by Stripe.js
  const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

  // Retrieve the PaymentIntent
  stripe.value.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    // Inspect the PaymentIntent `status` to indicate the status of the payment
    // to your customer.
    //
    // Some payment methods will [immediately succeed or fail][0] upon
    // confirmation, while others will first enter a `processing` state.
    //
    // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    switch (paymentIntent.status) {
      case "succeeded":
        showSuccess("Success! Payment received.");
        break;

      case "processing":
        message.value = "Payment processing. We'll update you when payment is received.";
        break;

      case "requires_payment_method":
        showError("Payment failed. Please try another payment method.");
        // Redirect your user back to your payment page to attempt collecting
        // payment again
        break;

      default:
        message.value = "Something went wrong.";
        break;
    }
  });
}
</script>
