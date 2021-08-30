export type Uuid = string;

export interface Column {
  uuid: Uuid;
  name: string;
  cards: Uuid[];
}

export interface Board {
  uuid: Uuid;
  apiKey?: string;
  columns: Uuid[];
}

export interface Card {
  uuid: Uuid;
  name: string;
  description: string;
}

export interface StoreDBLocalStorage {
  boards: Array<Board>;
  columns: Array<Column>;
  cards: Array<Card>;
  version: number;
}

export interface StoreDB {
  boards: Map<Uuid, Board>;
  columns: Map<Uuid, Column>;
  cards: Map<Uuid, Card>;
}

export type StoreChangeEvent =
  | "new-card"
  | "edit-card"
  | "delete-card"
  | "new-column"
  | "edit-column"
  | "delete-column"
  | "new-board";

export interface BoardDefinition {
  uuid: Uuid;
  version: number;
  columns: Array<Column>;
  cards: Array<Card>;
}
