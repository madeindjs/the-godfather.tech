// src/app/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setCreditsSummaryAction } from './credits.actions';
import { CreditsSummary } from './credits.service';

export interface CreditsState {
  summary: CreditsSummary;
}

export const initialState: CreditsState = { summary: { total: 0, current: 0 } };

const _creditsReducer = createReducer(
  initialState,
  on(setCreditsSummaryAction, (state, { summary }) => ({
    ...state,
    summary,
  }))
);

export function creditsReducer(state, action) {
  return _creditsReducer(state, action);
}
