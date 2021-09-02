import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { AppState } from './state.interface';

describe('AuthorizationInterceptor', () => {
  const initialState: AppState = {
    login: { user: undefined },
    boards: { boards: [] },
    credits: { summary: { total: 0, current: 0 } },
    toasts: { display: [] },
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthorizationInterceptor, provideMockStore({ initialState })],
      imports: [HttpClientModule, RouterTestingModule],
    })
  );

  it('should be created', () => {
    const interceptor: AuthorizationInterceptor = TestBed.inject(
      AuthorizationInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
