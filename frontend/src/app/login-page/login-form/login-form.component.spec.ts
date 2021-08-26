//src/app/login-page/login-form/login-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/app/login/login.reducer';
import { LoginService } from 'src/app/login/login.service';
import { AppState } from 'src/app/state.interface';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [StoreModule.forRoot({ login: loginReducer })],
      providers: [LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should update store', (done) => {
      const email = 'toto@toto.fr';
      const password = 'tototo';
      component.emailField.setValue(email);
      component.passwordField.setValue(password);
      component.login();

      store
        .select((state: AppState) => state.login.user)
        .subscribe((user) => {
          expect(user).toBeDefined();
          expect(user.email).toEqual(email);
          expect(user.password).toEqual(password);
          done();
        });
    });
  });

  describe('validity', () => {
    it('should accept form', () => {
      component.emailField.setValue('toto@toto.fr');
      component.passwordField.setValue('tototo');
      expect(component.form.valid).toBeTrue();
    });

    it('should reject form (email is not valid)', () => {
      component.emailField.setValue('toto');
      component.passwordField.setValue('tototo');
      expect(component.form.valid).toBeFalse();
    });

    it('should reject form (password is too short)', () => {
      component.emailField.setValue('toto@toto.fr');
      component.passwordField.setValue('to');
      expect(component.form.valid).toBeFalse();
    });
  });
});
