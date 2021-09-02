// import { HttpClientModule } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideMockStore } from '@ngrx/store/testing';
// import { of } from 'rxjs';
// import { LoginService } from 'src/app/login/login.service';
// import { AppState } from 'src/app/state.interface';
// import { LoginCardComponent } from './login-card.component';

// describe('LoginCardComponent', () => {
//   let component: LoginCardComponent;
//   let fixture: ComponentFixture<LoginCardComponent>;
//   const initialState: AppState = {
//     login: { user: undefined },
//     boards: { boards: [] },
//     credits: { summary: { total: 0, current: 0 } },
//     toasts: { display: [] },
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       providers: [
//         provideMockStore({ initialState }),
//         {
//           provide: LoginService,
//           getLoggedUserInformation: {
//             params: of({ email: 'test@test.fr' }),
//           },
//         },
//       ],
//       imports: [HttpClientModule],
//       declarations: [LoginCardComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
