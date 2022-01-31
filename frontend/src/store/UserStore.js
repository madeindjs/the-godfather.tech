// @ts-check
import { Store } from "./abstract";

/**
 * @typedef UserState
 * @property {string} id
 * @property {string} email
 * @property {string} token
 * @property {any} githubInformation
 *
 */

const LOCAL_STORAGE_KEY = "user_store";

export class UserStore extends Store {
  /**
   * @returns {UserState}
   * @protected
   */
  _data() {
    const userStr = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (userStr) {
      try {
        const user = JSON.parse(userStr);

        console.log(user);

        return user;
      } catch (error) {
        console.error(error);
      }
    }

    return { id: undefined, email: undefined, token: undefined, githubInformation: undefined };
  }

  /**
   * @param {UserState} user
   */
  login(user) {
    this._state.id = user.id;
    this._state.email = user.email;
    this._state.token = user.token;
    this._state.githubInformation = user.githubInformation;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  logout() {
    this._state.id = undefined;
    this._state.email = undefined;
    this._state.token = undefined;
    this._state.githubInformation = undefined;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export const userStore = new UserStore();
