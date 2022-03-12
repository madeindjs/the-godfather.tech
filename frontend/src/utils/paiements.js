// @ts-check
import axios from "axios";
import { PROJECT_API_URL } from "../constants/project";
import { getToken } from "./user";

/**
 * @param {{amount: number, }} paiement
 * @returns {Promise<{clientSecret: string}>}
 */
export function createPaiement(paiement) {
  const token = getToken();

  if (token === undefined) {
    return Promise.reject();
  }

  return axios
    .post(`${PROJECT_API_URL}/paiements`, paiement, { headers: { Authorization: `bearer ${token}` } })
    .then((response) => response.data);
}
