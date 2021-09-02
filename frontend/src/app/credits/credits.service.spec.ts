import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../state.interface';
import { CreditsService } from './credits.service';

describe('CreditsService', () => {
  let service: CreditsService;
  const initialState: AppState = {
    login: { user: undefined },
    boards: { boards: [] },
    credits: { summary: { total: 0, current: 0 } },
    toasts: { display: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(CreditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
