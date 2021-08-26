// src/app/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { removeBoardAction, setBoardsAction } from './boards.actions';
import { Board } from './boards/boards.service';

export interface BoardsState {
  boards: Board[];
}

export const initialState: BoardsState = { boards: [] };

const _boardsReducer = createReducer(
  initialState,
  on(setBoardsAction, (state, { boards }) => ({
    ...state,
    boards: boards,
  })),
  on(removeBoardAction, (state, { board }) => ({
    ...state,
    users: state.boards.filter(({ id }) => board.id !== id),
  }))
);

export function boardsReducer(state, action) {
  return _boardsReducer(state, action);
}
