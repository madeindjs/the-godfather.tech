import {Column} from "../interfaces";
import {store} from "../store";

require("./card.component");

class ColumnComponent extends HTMLElement {
  private column: Column | undefined;

  constructor() {
    // Always call super first in constructor
    super();
    this.attachShadow({mode: "open"});
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log(`updated attributes %o`, {name, oldValue, newValue});
  }

  /**
   * Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    const uuid = this.getAttribute("uuid");
    if (!uuid) {
      throw Error("attribute `uuid` is not defined");
    }

    this.column = store.getColumn(uuid);

    this.render();
  }

  disconnectedCallback() {
    console.log("board destroyed");
  }

  render() {
    if (!this.shadowRoot || !this.column) {
      return;
    }

    this.shadowRoot.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "KanbanColumn");

    const titleWrapper = document.createElement("div");
    titleWrapper.setAttribute("class", "KanbanColumn-title");

    {
      const nameElement = document.createElement("p");
      nameElement.textContent = `${this.column.name} (${this.column.cards.length})`;
      titleWrapper.append(nameElement);

      const removeButtonElement = document.createElement("button");
      removeButtonElement.innerText = "Remove";
      removeButtonElement.onclick = () => {
        store.removeColumn((this.column as Column).uuid);
      };
      titleWrapper.append(removeButtonElement);
    }

    wrapper.append(titleWrapper);

    for (const uuid of this.column.cards) {
      const cardElement = document.createElement("kanban-card");
      cardElement.setAttribute("uuid", uuid);
      wrapper.append(cardElement);
    }

    wrapper.append(document.createElement("hr"));

    const addButtonElement = document.createElement("button");
    addButtonElement.textContent = "Add card";
    addButtonElement.onclick = () => {
      store.createCard(this.column as Column);

      this.render();
    };
    wrapper.append(addButtonElement);

    const style = document.createElement("style");
    style.innerText = `
      .KanbanColumn {
        min-width: 300px;
      }

      .KanbanColumn-title {
        display: flex;
        align-items: center;
      }

      .KanbanColumn-title p {
        flex-grow: 1;
      }

      .KanbanColumn-title button {
        display: none;
      }

      .KanbanColumn-title:hover button {
        display: inline-block;
        position: relative;
        top: 0;
        right: 0;
      }
    `;

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define("kanban-column", ColumnComponent);
