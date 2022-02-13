// @ts-check
import axios from "axios";
import { userStore } from "../store/UserStore";

/**
 * @param {string | undefined} pseudo
 * @returns {Promise<Array>}
 */
export function getUserRepositories(pseudo = undefined) {
  let apiUrl = "";

  if (pseudo) {
    apiUrl = `https://api.github.com/users/${pseudo}/repos`;
  } else {
    const userState = userStore.getState();
    // @ts-ignore
    apiUrl = userState.githubInformation?.repos_url;
  }

  if (apiUrl === undefined) {
    return Promise.resolve([]);
  }

  return axios
    .get(apiUrl)
    .then((response) => response.data)
    .catch(() => []);
}
