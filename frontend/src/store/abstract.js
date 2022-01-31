// @ts-check
import { reactive, readonly } from "vue";

export class Store {
  constructor() {
    let data = this._data();
    this._setup(data);
    /**
     * @protected
     */
    this._state = reactive(data);
  }

  /**
   * @protected
   */
  _data() {
    console.log("data");
    return {};
  }

  /**
   * @param {Object} _data
   * @protected
   */
  // eslint-disable-next-line no-unused-vars
  _setup(_data) {}

  getState() {
    return readonly(this._state);
  }
}
