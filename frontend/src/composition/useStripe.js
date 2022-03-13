// @ts-check
import { loadStripe } from "@stripe/stripe-js/pure";
import { ref, watch } from "vue";
import { PROJECT_URL } from "../constants/project";
import { getConfigKey } from "../utils/config";
import { createPaiement } from "../utils/paiements";
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

export function useStripeForm() {
  const { stripe, isLoading } = useStripe();

  const elements = ref();
  const amount = ref(10);

  const init = async () => {
    if (!stripe.value) return;
    isLoading.value = true;

    const { clientSecret } = await createPaiement({ amount: amount.value });

    const options = {
      clientSecret,
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };

    elements.value = stripe.value.elements(options);
    const paymentElement = elements.value.create("payment");
    paymentElement.mount("#payment-element");
    isLoading.value = false;
  };

  const submit = async () => {
    const { error } = await stripe.value.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements: elements.value,
      confirmParams: {
        return_url: `${PROJECT_URL}/order-complete`,
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

  return { amount, init, submit, stripe, isLoading };
}

/**
 *
 * @param {string | number} amount
 * @returns
 */
export function useStripePay(amount, campaignId = undefined) {
  const { stripe, isLoading } = useStripe();

  const elements = ref();

  const init = async () => {
    if (!stripe.value) return;
    isLoading.value = true;

    const { clientSecret } = await createPaiement({ amount: Number(amount) });

    const options = {
      clientSecret,
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };

    elements.value = stripe.value.elements(options);
    const paymentElement = elements.value.create("payment");
    paymentElement.mount("#payment-element");
    isLoading.value = false;
  };

  const submit = async () => {
    const { error } = await stripe.value.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements: elements.value,
      confirmParams: {
        return_url: campaignId ? `${PROJECT_URL}/campaign/${campaignId}` : `${PROJECT_URL}/order-complete`,
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

  return { amount, submit, stripe, isLoading, init };
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
