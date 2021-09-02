// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideMockStore } from '@ngrx/store/testing';
// import { AppState } from 'src/app/state.interface';
// import { CreditsCardComponent } from './credits-card.component';

// describe('CreditsCardComponent', () => {
//   let component: CreditsCardComponent;
//   let fixture: ComponentFixture<CreditsCardComponent>;
//   const initialState: AppState = {
//     login: { user: undefined },
//     boards: { boards: [] },
//     credits: { summary: { total: 0, current: 0 } },
//     toasts: { display: [] },
//   };
//   let httpTestingController: HttpTestingController;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CreditsCardComponent],
//       provider: [provideMockStore({ initialState })],
//       imports: [HttpClientTestingModule],
//     }).compileComponents();
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreditsCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//     const req = httpTestingController.expectOne(
//       'https://fakerapi.it/api/v1/users'
//     );

//     req.flush([]);
//   });
// });
