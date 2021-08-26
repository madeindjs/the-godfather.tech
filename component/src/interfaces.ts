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
