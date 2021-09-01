import { Card } from './entities/card.entity';

interface CardEvent {
  card: Card;
}

export const createCardEventName = Symbol.for('card.create');
export const updateCardEventName = Symbol.for('card.update');
export const removeCardEventName = Symbol.for('card.remove');

export interface CreatCardEvent extends CardEvent {}
export interface UpdateCardEvent extends CardEvent {}
export interface RemoveCardEvent extends CardEvent {}
