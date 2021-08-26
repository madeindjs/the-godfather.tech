import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginGuard } from './login.guard';
import { AppState } from './state.interface';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  const initialState: AppState = {
    login: { user: undefined },
    users: { users: [] },
  };

  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    guard = TestBed.inject(LoginGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow when user is connected', (done) => {
    store.setState({
      ...initialState,
      login: { user: { email: 'test@test.fr', password: '123456' } },
    } as AppState);

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should disallow when user is not connected', (done) => {
    store.setState({
      ...initialState,
      login: { user: undefined },
    } as AppState);

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
  });
});
