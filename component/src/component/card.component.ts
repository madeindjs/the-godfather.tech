import {Card} from "../interfaces";
import {store} from "../store";

class CardComponent extends HTMLElement {
  public card?: Card;

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

    this.card = store.getCard(uuid);

    this.render();
  }

  disconnectedCallback() {
    console.log("board destroyed");
  }

  render() {
    if (!this.shadowRoot || !this.card) {
      throw Error("Cannot render card");
    }

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "KanbanCard");

    // const uuidElement = document.createElement("p");
    // uuidElement.textContent = `id: ${this.card.uuid}`;
    // wrapper.append(uuidElement);

    const nameElement = document.createElement("input");
    nameElement.setAttribute("class", "KanbanCard-name");
    nameElement.value = this.card.name;
    nameElement.onkeyup = (event) => {
      // @ts-ignore
      this.card.name = event.target?.value;
      store.onChange("edit-card");
    };
    wrapper.append(nameElement);

    const descriptionElement = document.createElement("textarea");
    descriptionElement.value = this.card.description;
    descriptionElement.onkeyup = (event) => {
      // @ts-ignore
      this.card?.description = event.target?.value;
      store.onChange("edit-card");
    };
    wrapper.append(descriptionElement);

    const removeButtonElement = document.createElement("button");
    removeButtonElement.textContent = "Delete";
    removeButtonElement.onclick = () => {
      store.removeCard((this.card as Card).uuid);
      this.remove();
    };
    wrapper.append(removeButtonElement);

    const style = document.createElement("style");
    style.textContent = `
      .KanbanCard {
        border: 1px solid lightblue;
        padding: 1rem;
        margin: 0.5rem;
        box-shadow: 5px 5px 5px lightgray;
      }

      input, textarea {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: none;
        border-bottom: 1px solid transparent;
      }

      input:hover, textarea:hover {
        border-bottom: 1px dashed black;
      }

      input:focus, textarea:focus {
        border-bottom: 1px solid transparent;
      }

      .KanbanCard-name {
        font-size: 1.2rem;
      }

      .KanbanCard:hover {
        box-shadow: 5px 5px 5px lightblue;
      }

      input, textarea {
        width: 100%;
      }
    `;

    this.shadowRoot?.append(style, wrapper);
  }
}

export class CardOnChangeEvent extends Event {
  constructor(public readonly card: Card) {
    super("card-on-change");
  }
}

customElements.define("kanban-card", CardComponent);
