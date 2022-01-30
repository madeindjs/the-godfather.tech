// @ts-check
import { Store } from "./abstract";

/**
 * @typedef UserState
 * @property {string} id
 * @property {string} email
 * @property {string} token
 *
 */

/**
 * @property {UserState} _state
 */
export class UserStore extends Store {
  /**
   * @returns {UserState}
   */
  _data() {
    return { id: undefined, email: undefined, token: undefined };
  }

  /**
   *
   * @param {UserState} user
   */
  login(user) {
    this._state.id = user.id;
    this._state.email = user.email;
    this._state.token = user.token;
  }
}

export const userStore = new UserStore();
