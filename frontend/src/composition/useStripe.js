// @ts-check
import { loadStripe } from "@stripe/stripe-js/pure";
import { ref, watch } from "vue";
import { PROJECT_URL } from "../constants/project";
import { getConfigKey } from "../utils/config";
import { useToaster } from "./useToaster";

async function getStripe() {
  const clientId = await getConfigKey("STRIPE_CLIENT_ID");
  return loadStripe(clientId);
}

export function useStripe() {
  const stripe = ref();
  const isLoading = ref(true);

  getStripe()
    .then((s) => (stripe.value = s))
    .catch(console.error)
    .finally(() => (isLoading.value = false));

  return { stripe, isLoading };
}

export function useStripePayIntent(campaign) {
  const { stripe, isLoading } = useStripe();
  const { showError } = useToaster();

  const elements = ref();
  const isError = ref(false);

  const init = async () => {
    if (!stripe.value) return;
    isLoading.value = true;

    const options = {
      clientSecret: campaign.stripePaymentIClientSecret,
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };
    try {
      elements.value = stripe.value.elements(options);
    } catch {
      isError.value = true;
      showError("Cannot initialize stripe");
    }
    const paymentElement = elements.value.create("payment");
    paymentElement.mount("#payment-element");
    isLoading.value = false;
  };

  const submit = async () => {
    if (!stripe.value) return;

    const { error } = await stripe.value.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements: elements.value,
      confirmParams: {
        return_url: `${PROJECT_URL}/campaign/${campaign.id}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      const messageContainer = document.querySelector("#error-message");
      messageContainer.textContent = error.message;
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  watch([stripe, campaign], init);

  return { submit, stripe, isLoading, isError };
}

export function useStripeRedirect() {
  const { stripe } = useStripe();
  const { showError, showSuccess, showWarn } = useToaster();

  const run = () => {
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

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
          showWarn("Payment processing. We'll update you when payment is received.");
          break;
        case "requires_payment_method":
          showError("Payment failed. Please try another payment method.");
          break;
        default:
          showError("Something went wrong.");
          break;
      }
    });
  };

  watch(stripe, () => {
    if (!stripe.value) return;

    run();
  });
}
