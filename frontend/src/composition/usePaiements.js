// @ts-check

import axios from "axios";
import { ref } from "vue";
import { PROJECT_API_URL } from "../constants/project";
import { getToken } from "../utils/user";
import { useToaster } from "./useToaster";

export function usePaiements() {
  const paiements = ref([]);
  const isLoading = ref(false);

  const { showError } = useToaster();

  const fetchPaiements = async () => {
    const token = getToken();

    if (token === undefined) {
      return Promise.resolve([]);
    }

    isLoading.value = true;

    return axios
      .get(`${PROJECT_API_URL}/paiements`, { headers: { Authorization: `bearer ${token}` } })
      .then((response) => (paiements.value = response.data))
      .catch(() => showError("Cannot fetch paiements"))
      .finally(() => (isLoading.value = false));
  };

  return { fetchPaiements, paiements, isLoading };
}
