import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../state.interface';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  const initialState: AppState = {
    login: { user: undefined },
    boards: { boards: [] },
    credits: { summary: { total: 0, current: 0 } },
    toasts: { display: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState }), ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
