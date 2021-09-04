//src/app/signup-page/signup-form/signup-form.component.spec.ts
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/app/login/login.reducer';
import { LoginService } from 'src/app/login/login.service';
import { ToastService } from 'src/app/toast/toast.service';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  // let store: Store<AppState>;
  // let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [
        StoreModule.forRoot({ login: loginReducer as any }),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [LoginService, ToastService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    // httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('signup', () => {
  //   it('should update store', (done) => {
  //     const email = 'toto@toto.fr';
  //     const password = 'tototo';
  //     component.emailField?.setValue(email);
  //     component.passwordField?.setValue(password);

  //     // const user$ = store
  //     //   .select((state: AppState) => state.login.user)
  //     //   .pipe(take(1));

  //     component
  //       .signup()
  //       .pipe(
  //         take(1),
  //         mergeMap(() =>
  //           store.select((state: AppState) => state.login.user).pipe(take(1))
  //         )
  //       )
  //       .subscribe(
  //         (user) => {
  //           expect(user).toBeDefined();
  //           expect(user?.email).toEqual(email);
  //           done();
  //         },
  //         (e: any) => {
  //           throw Error(e);
  //         }
  //       );
  //     // component.signup().add(() => {
  //     //   user$.subscribe((user) => {
  //     //     expect(user).toBeDefined();
  //     //     expect(user?.email).toEqual(email);
  //     //     done();
  //     //   });
  //     // });

  //     const req = httpTestingController.expectOne(
  //       'http://api.lvh.me/api/v1/users'
  //     );

  //     req.flush({});
  //   });
  // });

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
