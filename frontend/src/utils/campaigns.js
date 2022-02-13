// @ts-check
import axios from "axios";
import { PROJECT_API_URL } from "../constants/project";
import { getToken } from "./user";

/**
 * @returns {Promise<Array>}
 */
export function getCampaigns() {
  const token = getToken();

  if (token === undefined) {
    return Promise.resolve([]);
  }

  return axios
    .get(`${PROJECT_API_URL}/campaigns`, { headers: { Authorization: `bearer ${token}` } })
    .then((response) => response.data);
}

/**
 * @param {number | string} id
 * @returns {Promise<Array>}
 */
export function getCampaign(id) {
  const token = getToken();

  if (token === undefined) {
    return Promise.resolve(undefined);
  }

  return axios
    .get(`${PROJECT_API_URL}/campaigns/${id}`, { headers: { Authorization: `bearer ${token}` } })
    .then((response) => response.data);
}

/**
 * @param {{tags: string[], amountPerDay: number, content: string, totalPrice: number, minStars?: number, maxStars?: number}} campaign
 * @returns {Promise<Array>}
 */
export function createCampaign(campaign) {
  const token = getToken();

  if (token === undefined) {
    return Promise.reject();
  }

  return axios
    .post(`${PROJECT_API_URL}/campaigns`, campaign, { headers: { Authorization: `bearer ${token}` } })
    .then((response) => response.data);
}

export function removeCampaign(id) {
  const token = getToken();

  if (token === undefined) {
    return Promise.resolve([]);
  }

  return axios.delete(`${PROJECT_API_URL}/campaigns/${id}`, { headers: { Authorization: `bearer ${token}` } });
}

export function deactivateCampaign(id) {
  const token = getToken();

  if (token === undefined) {
    return Promise.resolve([]);
  }

  return axios.post(
    `${PROJECT_API_URL}/campaigns/${id}/activate`,
    {},
    { headers: { Authorization: `bearer ${token}` } }
  );
}
