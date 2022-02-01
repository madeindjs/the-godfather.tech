// @ts-check
import { userStore } from "../store/UserStore";

/**
 *
 * @returns {string | undefined}
 */
export function getToken() {
  const userState = userStore.getState();

  // @ts-ignore
  return userState.token;
}
