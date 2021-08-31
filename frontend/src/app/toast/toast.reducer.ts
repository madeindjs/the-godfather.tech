// src/app/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { displayToastAction, hideToastAction } from './toast.actions';
import { Toast } from './toast.service';

export interface ToastsState {
  display: Toast[];
}

export const initialState: ToastsState = { display: [] };

const _toastsReducer = createReducer(
  initialState,
  on(displayToastAction, (state, { toast }) => ({
    ...state,
    display: [...state.display, toast],
  })),
  on(hideToastAction, (state, { toast }) => ({
    ...state,
    display: state.display.filter((t) => t.id !== toast.id),
  }))
);

export function toastsReducer(state: ToastsState, action: any) {
  return _toastsReducer(state, action);
}
