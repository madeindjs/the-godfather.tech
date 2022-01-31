// @ts-check
import axios from "axios";
import { userStore } from "../store/UserStore";

/**
 *
 * @returns {Promise<Array>}
 */
export function getUserRepositories() {
  const userState = userStore.getState();

  // @ts-ignore
  const apiUrl = userState.githubInformation?.repos_url;

  if (apiUrl === undefined) {
    return Promise.resolve([]);
  }

  return axios
    .get(apiUrl)
    .then((response) => response.data)
    .catch(() => []);
}
