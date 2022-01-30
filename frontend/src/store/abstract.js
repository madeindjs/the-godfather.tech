// @ts-check
import { reactive, readonly } from "vue";

export class Store {
  _state;

  constructor() {
    let data = this._data();
    this._setup(data);
    this._state = reactive(data);
  }

  _data() {
    return {};
  }

  /**
   * @param {Object} _data
   */
  // eslint-disable-next-line no-unused-vars
  _setup(_data) {}

  getState() {
    return readonly(this._state);
  }
}
