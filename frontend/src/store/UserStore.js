// @ts-check
import { Store } from "./abstract";

/**
 * @typedef UserState
 * @property {string} id
 * @property {string} email
 * @property {string} token
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
    console.log(userStr);

    if (userStr) {
      try {
        const user = JSON.parse(userStr);

        console.log(user);

        return user;
      } catch (error) {
        console.error(error);
      }
    }

    return { id: undefined, email: undefined, token: undefined };
  }

  /**
   * @param {UserState} user
   */
  login(user) {
    this._state.id = user.id;
    this._state.email = user.email;
    this._state.token = user.token;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }
}

export const userStore = new UserStore();
