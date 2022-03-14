// @ts-check
import { computed, ref } from "vue";
import { getCampaign } from "../utils/campaigns";
import { useToaster } from "./useToaster";

/**
 * @param {string} id
 */
export function useCampaign(id) {
  const campaign = ref(undefined);
  const isLoading = ref(true);

  const { showError } = useToaster();

  const activeText = computed(() => {
    if (!campaign.value) {
      return "?";
    }

    if (campaign.value.deactivateAt) {
      return "not active";
    }

    if (!campaign.value.paidAt) {
      return "not paid";
    }

    return "active";
  });

  const fetchCampaign = () =>
    getCampaign(id)
      .then((c) => (campaign.value = c))
      .catch(() => showError(`Cannot fetch campaign`))
      .finally(() => (isLoading.value = false));

  fetchCampaign();

  return { campaign, isLoading, activeText, fetchCampaign };
}
