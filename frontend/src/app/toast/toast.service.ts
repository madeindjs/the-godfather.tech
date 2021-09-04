import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state.interface';
import { displayToastAction, hideToastAction } from './toast.actions';

export type ToastType = 'success' | 'warning' | 'danger' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly store: Store<AppState>) {}

  success(message: string) {
    this.display({ type: 'success', message });
  }

  error(message: string) {
    this.display({ type: 'danger', message });
  }

  display(toast: Pick<Toast, 'message' | 'type'>) {
    const id = Date.now();

    this.store.dispatch(displayToastAction({ toast: { id, ...toast } }));
    setTimeout(
      () => this.store.dispatch(hideToastAction({ toast: { id, ...toast } })),
      5_000
    );
  }
}
