import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthorizationInterceptor } from './authorization.interceptor';

describe('AuthorizationInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthorizationInterceptor],
      imports: [StoreModule.forRoot({})],
    })
  );

  it('should be created', () => {
    const interceptor: AuthorizationInterceptor = TestBed.inject(
      AuthorizationInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
