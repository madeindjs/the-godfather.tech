import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../state.interface';
import { User, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AppState>;

  const initialState: AppState = { login: undefined, users: { users: [] } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected users', () => {
    const expectedUsers: User[] = [
      {
        email: 'toto@toto.fr',
        firstname: 'toto',
        lastname: 'toto',
        username: 'toto',
        uuid: 'toto',
      },
    ];

    service
      .getUsers()
      .subscribe((users) => expect(users).toEqual(expectedUsers));

    const req = httpTestingController.expectOne(
      'https://fakerapi.it/api/v1/users'
    );

    req.flush({ data: expectedUsers });

    // store
    //   .select((state: AppState) => state.users.users)
    //   .subscribe((users) => expect(users).toEqual(expectedUsers));
  });
});
