// @ts-check

import axios from "axios";
import { ref } from "vue";
import { PROJECT_API_URL } from "../constants/project";
import { getToken } from "../utils/user";
import { useToaster } from "./useToaster";

export function useBalance() {
  const balance = ref(undefined);
  const isLoading = ref(false);

  const { showError } = useToaster();

  const fetchBalance = async () => {
    const token = getToken();

    if (token === undefined) {
      return Promise.resolve(undefined);
    }

    isLoading.value = true;

    return axios
      .get(`${PROJECT_API_URL}/balance`, { headers: { Authorization: `bearer ${token}` } })
      .then((response) => (balance.value = response.data.balance))
      .catch(() => showError("Cannot fetch balance"))
      .finally(() => (isLoading.value = false));
  };

  return { fetchBalance, balance, isLoading };
}
