// @ts-check
import { Store } from "./abstract";

/**
 * @typedef {'success' | 'error' | 'warn'} ToastLevel
 */

/**
 * @typedef Toast
 * @property {ToastLevel} level
 * @property {string} message
 * @property {number} id
 */

/**
 * @typedef ToastState
 * @property {Toast[]} toasts
 */

export class ToastStore extends Store {
  /**
   * @protected
   * @returns {ToastState}
   */
  _data() {
    return { toasts: [] };
  }

  /**
   * @param {string} message
   * @param {ToastLevel} level
   */
  display(message, level) {
    this._state.toasts = [...this._state.toasts, { message, level, id: new Date().getTime() }];
  }

  /**
   *
   * @param {number} id
   */
  remove(id) {
    this._state.toasts = this._state.toasts.filter((toast) => id !== toast.id);
  }
}

export const toastStore = new ToastStore();
