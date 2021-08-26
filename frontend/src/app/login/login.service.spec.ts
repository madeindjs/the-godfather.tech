import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../state.interface';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const initialState: AppState = {
    login: { user: { email: 'test@test.fr', token: 'toto' } },
    users: { users: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
