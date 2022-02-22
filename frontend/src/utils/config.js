// @ts-check

import axios from "axios";
import { PROJECT_API_URL } from "../constants/project";

const cache = new Map();

/**
 * @param {string} key
 * @returns {Promise<any>}
 */
export async function getConfigKey(key) {
  if (cache.size !== 0) {
    return cache.get(key);
  }

  const response = await axios.get(`${PROJECT_API_URL}/config`);

  Object.entries(response.data).forEach(([key, value]) => cache.set(key, value));

  return cache.get(key);
}
