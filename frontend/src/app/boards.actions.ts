// src/app/users.actions.ts (git)
import { createAction, props } from '@ngrx/store';
import { Board } from './boards/boards.service';

export const setBoardsAction = createAction(
  'setBoardsAction',
  props<{ boards: Board[] }>()
);

export const removeBoardAction = createAction(
  'removeBoardAction',
  props<{ board: Board }>()
);
