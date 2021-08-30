require("./column.component");
require("./new-column.component");
import {Board, StoreChangeEvent} from "../interfaces";
import {store} from "../store";
import {putJson} from "../utils/fetch.utils";
import {Logger} from "../utils/logger.utils";

class BoardComponent extends HTMLElement {
  private readonly logger = new Logger("BoardComponent");
  private board?: Board;
  private apiUrl: string = "http://embed-kanban.io/v1/boards/";

  static get observedAttributes() {
    return ["api-url", "uuid"];
  }

  constructor() {
    super();
    this.logger.log("constructor");
    this.attachShadow({mode: "open"});
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.logger.log(`attributeChangedCallback %s (%s)`, name, newValue);
    switch (name) {
      case "api-url":
        this.apiUrl = newValue;
        break;
      case "uuid":
        store.onChangeListeners.delete(oldValue);
        store.onChangeListeners.set(newValue, (event) =>
          this.renderOnStoreChange(event)
        );
        this.board = this.loadOrCreateBoard(newValue);
        break;
    }
  }

  private loadOrCreateBoard(uuid: string): Board {
    try {
      return store.getBoard(uuid);
    } catch (error) {
      const board = store.createBoard(uuid);
      store.createColumn(board, "TODO");
      store.createColumn(board, "DONE");
      this.logger.log("Could not retrieve last board, create new one");
      return board;
    }
  }

  /**
   * Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    const apiUrl = this.getAttributeNode("api-url");

    if (apiUrl) {
      this.apiUrl = apiUrl.value;
    }

    const uuid = this.getAttribute("uuid");
    if (uuid) {
      this.board = this.loadOrCreateBoard(uuid);
    } else {
      this.board = store.createBoard();
      store.createColumn(this.board, "TODO");
      store.createColumn(this.board, "DONE");
    }
    store.onChangeListeners.set(this.board.uuid, (event) =>
      this.renderOnStoreChange(event)
    );

    this.render();
  }

  disconnectedCallback() {
    if (this.board) {
      store.onChangeListeners.delete(this.board.uuid);
    }
    this.logger.log("disconnectedCallback");
  }

  render() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: "open"});
    }

    this.removeShadowRootChildren();

    if (!this.board || !this.shadowRoot) {
      throw Error("Cannot render board");
    }

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "KanbanBoard");

    for (const column of store.getColumns(this.board.uuid)) {
      const columnElement = document.createElement("kanban-column");
      columnElement.setAttribute("uuid", column.uuid);
      wrapper.append(columnElement);
    }

    const newColumnElement = document.createElement("kanban-new-column");
    newColumnElement.setAttribute("board-uuid", this.board.uuid);
    wrapper.append(newColumnElement);

    const style = document.createElement("style");
    style.textContent = `
      .KanbanBoard {
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
      }
    `;

    this.shadowRoot?.append(style, wrapper);
  }

  private removeShadowRootChildren() {
    if (!this.shadowRoot) {
      return;
    }

    let child = this.shadowRoot.lastElementChild;
    //remove the last child while it exists
    while (child) {
      this.shadowRoot.removeChild(child);
      child = this.shadowRoot.lastElementChild;
    }
  }

  private renderOnStoreChange(event: StoreChangeEvent) {
    const events: StoreChangeEvent[] = [
      "new-column",
      "delete-column",
      "delete-card",
    ];

    if (events.includes(event)) {
      this.render();
    }

    if (!this.board) {
      return;
    }

    putJson(
      `${this.apiUrl}/boards/${this.board.uuid}`,
      {data: store.getBoardDefinition(this.board.uuid)},
      {}
    );
  }
}

customElements.define("kanban-board", BoardComponent);
