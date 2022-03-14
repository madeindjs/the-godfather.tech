// @ts-check
import axios from "axios";
import { ref } from "vue";
import { PROJECT_API_URL } from "../constants/project";
import { useToaster } from "./useToaster";

/**
 * @typedef {{repository: string, totalViews: number, totalPrice: number}} ViewsSummary
 * @returns
 */

/**
 * @returns {Promise<ViewsSummary[]>}
 */
function getSummaryByRepositories() {
  return axios.post(`${PROJECT_API_URL}/views/summary-by-repositories/`, {}).then((response) => response.data);
}

export function useReposSummary() {
  const { showError } = useToaster();

  const reposSummaries = ref([]);
  const isLoading = ref(false);

  const reload = () => {
    isLoading.value = true;

    getSummaryByRepositories()
      .then((c) => (reposSummaries.value = c))
      .catch(() => showError("Cannot load views summaries"))
      .finally(() => (isLoading.value = false));
  };

  reload();

  return { isLoading, reposSummaries, reload };
}
