require("./column.component");
require("./new-column.component");
import {Board} from "../interfaces";
import {store, StoreChangeEvent} from "../store";
import {postJson} from "../utils/fetch.utils";

class BoardComponent extends HTMLElement {
  private board?: Board;
  private apiUrl: string = "http://embed-kanban.io/v1/boards/";

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "api-url":
        this.apiUrl = newValue;
        break;
      case "uuid":
        store.onChangeListeners.delete(oldValue);
        store.onChangeListeners.set(newValue, (event) =>
          this.renderOnStoreChange(event)
        );
        this.board = store.getBoard(newValue);

        break;
    }
  }

  /**
   * Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    const apiUrl = this.getAttribute("api-url");

    if (apiUrl) {
      this.apiUrl = apiUrl;
    }

    const uuid = this.getAttribute("uuid");
    if (uuid) {
      try {
        this.board = store.getBoard(uuid);
      } catch (error) {
        this.board = store.createBoard(uuid);
        store.createColumn(this.board, "TODO");
        store.createColumn(this.board, "DONE");
        console.error("Could not retrieve last board, create new one");
      }
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
  }

  render() {
    if (!this.board || !this.shadowRoot) {
      throw Error("Cannot render board");
    }
    this.shadowRoot.innerHTML = "";

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

  private renderOnStoreChange(event: StoreChangeEvent) {
    const events: StoreChangeEvent[] = [
      "new-column",
      "delete-column",
      "delete-card",
    ];

    if (events.includes(event)) {
      this.render();
    }

    postJson(this.apiUrl, store.toObject(), {});
  }
}

customElements.define("kanban-board", BoardComponent);
