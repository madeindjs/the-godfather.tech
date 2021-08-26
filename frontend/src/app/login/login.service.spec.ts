import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../state.interface';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const initialState: AppState = {
    login: { user: { email: 'test@test.fr', password: 'toto' } },
    users: { users: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
