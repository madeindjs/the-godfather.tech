import {v4 as uuidv4} from "uuid";
import {Board, Card, Column, Uuid} from "./interfaces";

const LOCAL_STORAGE_KEY = "embedKanban";

interface StoreDBLocalStorage {
  boards: Array<Board>;
  columns: Array<Column>;
  cards: Array<Card>;
  apiKey: string | undefined;
  version: number;
}

interface StoreDB {
  boards: Map<Uuid, Board>;
  columns: Map<Uuid, Column>;
  cards: Map<Uuid, Card>;
  apiKey: string | undefined;
}

export type StoreChangeEvent =
  | "new-card"
  | "edit-card"
  | "delete-card"
  | "new-column"
  | "edit-column"
  | "delete-column"
  | "new-board";

export class Store {
  public onChangeListeners = new Map<Uuid, (event: StoreChangeEvent) => void>();
  private readonly db: StoreDB = {
    boards: new Map<Uuid, Board>(),
    columns: new Map<Uuid, Column>(),
    cards: new Map<Uuid, Card>(),
    apiKey: "",
  };

  constructor() {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedState === null) {
      return;
    }

    try {
      const previousStore: StoreDBLocalStorage = JSON.parse(savedState);

      this.db.apiKey = previousStore.apiKey;
      previousStore.boards.forEach((board) =>
        this.db.boards.set(board.uuid, board)
      );
      previousStore.columns.forEach((column) =>
        this.db.columns.set(column.uuid, column)
      );
      previousStore.cards.forEach((card) => this.db.cards.set(card.uuid, card));

      console.log("Loaded state %o (%o)", this.db, previousStore);
    } catch (_e) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  set apiKey(apiKey: string | undefined) {
    this.db.apiKey = apiKey;
  }

  get apiKey(): string | undefined {
    return this.db.apiKey;
  }

  // Board

  getBoard(uuid: Uuid): Board {
    const board = this.db.boards.get(uuid);

    if (board === undefined) {
      throw Error(`Cannot find board ${uuid}`);
    }

    return board;
  }

  getBoardColumn(columnUuid: Uuid): Board {
    for (const [_, board] of this.db.boards) {
      if (board.columns.includes(columnUuid)) {
        return board;
      }
    }
    throw Error(`Cannot retrieve board of column ${columnUuid}`);
  }

  createBoard(uuid: Uuid = uuidv4()): Board {
    const board: Board = {columns: [], uuid};
    this.db.boards.set(board.uuid, board);
    this.onChange("new-board");

    return board;
  }

  // Column

  getColumn(uuid: Uuid): Column {
    const column = this.db.columns.get(uuid);

    if (column === undefined) {
      throw Error(`Cannot find column ${uuid}`);
    }

    return column;
  }

  getColumns(boardUuid: Uuid): Column[];
  getColumns(board: Board): Column[];
  getColumns(board: unknown): Column[] {
    if (typeof board === "string") {
      board = this.getBoard(board);
    }

    return (board as Board).columns.map((uuid) => this.getColumn(uuid));
  }

  createColumn(board: Board, name: string): Column;
  createColumn(boardUuid: Uuid, name: string): Column;
  createColumn(board: unknown, name: string): Column {
    if (typeof board === "string") {
      board = this.getBoard(board);
    }

    const column: Column = {
      uuid: uuidv4(),
      name: name,
      cards: [],
    };

    (board as Board).columns.push(column.uuid);
    this.db.columns.set(column.uuid, column);
    this.onChange("new-column");

    return column;
  }

  removeColumn(uuid: Uuid) {
    const column = this.getColumn(uuid);
    column.cards.forEach((card) => this.removeCard(card));

    this.db.columns.delete(uuid);
    const board = this.getBoardColumn(uuid);
    board.columns = board.columns.filter((column) => column !== uuid);

    this.onChange("delete-column");
  }

  // Card

  getCard(uuid: Uuid): Card {
    const card = this.db.cards.get(uuid);

    if (card === undefined) {
      throw Error(`Cannot find card ${uuid}`);
    }

    return card;
  }

  getColumnCard(cardUuid: Uuid): Column {
    for (const [_, column] of this.db.columns) {
      if (column.cards.includes(cardUuid)) {
        return column;
      }
    }
    throw Error(`Cannot retrieve column of card ${cardUuid}`);
  }

  createCard(columnUuid: Uuid): Card;
  createCard(column: Column): Card;
  createCard(column: unknown): Card {
    if (typeof column === "string") {
      column = this.getColumn(column);
    }

    const card: Card = {
      uuid: uuidv4(),
      name: "New card",
      description: "",
    };

    this.db.cards.set(card.uuid, card);
    (column as Column).cards.push(card.uuid);

    this.onChange("new-card");

    return card;
  }

  removeCard(uuid: Uuid): void {
    this.db.cards.delete(uuid);
    const column = this.getColumnCard(uuid);
    column.cards = column.cards.filter((card) => card !== uuid);

    this.onChange("delete-card");
  }

  // Changes

  toObject(): StoreDBLocalStorage {
    return {
      apiKey: this.db.apiKey,
      boards: Array.from(this.db.boards.values()),
      columns: Array.from(this.db.columns.values()),
      cards: Array.from(this.db.cards.values()),
      version: 1,
    };
  }

  onChange(message: StoreChangeEvent) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.toObject()));

    for (const [_, listener] of this.onChangeListeners) {
      listener(message);
    }
  }
}

export const store = new Store();
