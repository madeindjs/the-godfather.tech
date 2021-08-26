import {Uuid} from "../interfaces";
import {store} from "../store";

class NewColumnComponent extends HTMLElement {
  private boardUuid?: Uuid;
  private displayForm: boolean = false;
  private columnName: string = "New column";

  constructor() {
    // Always call super first in constructor
    super();
    this.attachShadow({mode: "open"});
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    switch (name) {
      case "board-uuid":
        this.boardUuid = newValue;
        break;
    }
  }

  /**
   * Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    const uuid = this.getAttribute("board-uuid");
    if (!uuid) {
      throw Error("attribute `board-uuid` is not defined");
    }

    this.boardUuid = uuid;

    this.render();
  }

  disconnectedCallback() {
    console.log("board destroyed");
  }

  render() {
    if (!this.shadowRoot || !this.boardUuid) {
      throw Error("Cannot render `new-column`");
    }

    this.shadowRoot.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "KanbanNewColumn");

    if (this.displayForm) {
      const createColumnCallback = () => {
        store.createColumn(this.boardUuid as Uuid, this.columnName);
        this.displayForm = false;
        this.render();
      };

      const columnNameInputElement = document.createElement("input");
      columnNameInputElement.onkeyup = (event) => {
        if (event.key === "Enter") {
          return createColumnCallback();
        }
        // @ts-ignore
        this.columnName = event.target.value;
      };

      wrapper.append(columnNameInputElement);
      wrapper.append(document.createElement("br"));

      const createButtonElement = document.createElement("button");
      createButtonElement.textContent = "Create";
      createButtonElement.onclick = createColumnCallback;
      wrapper.append(createButtonElement);
    } else {
      const addButtonElement = document.createElement("button");
      addButtonElement.textContent = "Add column";
      addButtonElement.onclick = () => {
        this.displayForm = true;
        this.render();
      };
      wrapper.append(addButtonElement);
    }

    const style = document.createElement("style");
    style.innerText = `
      .KanbanNewColumn {
        min-width: 150px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    `;

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define("kanban-new-column", NewColumnComponent);
