//src/app/signup-page/signup-form/signup-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/app/login/login.reducer';
import { LoginService } from 'src/app/login/login.service';
import { AppState } from 'src/app/state.interface';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [StoreModule.forRoot({ login: loginReducer as any })],
      providers: [LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signup', () => {
    it('should update store', (done) => {
      const email = 'toto@toto.fr';
      const password = 'tototo';
      component.emailField?.setValue(email);
      component.passwordField?.setValue(password);
      component.signup();

      store
        .select((state: AppState) => state.login.user)
        .subscribe((user) => {
          expect(user).toBeDefined();
          expect(user?.email).toEqual(email);
          done();
        });
    });
  });

  describe('validity', () => {
    it('should accept form', () => {
      component.emailField?.setValue('toto@toto.fr');
      component.passwordField?.setValue('tototo');
      expect(component.form.valid).toBeTrue();
    });

    it('should reject form (email is not valid)', () => {
      component.emailField?.setValue('toto');
      component.passwordField?.setValue('tototo');
      expect(component.form.valid).toBeFalse();
    });

    it('should reject form (password is too short)', () => {
      component.emailField?.setValue('toto@toto.fr');
      component.passwordField?.setValue('to');
      expect(component.form.valid).toBeFalse();
    });
  });
});
