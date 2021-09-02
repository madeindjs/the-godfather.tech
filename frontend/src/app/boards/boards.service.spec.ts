import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../state.interface';
import { Board, BoardsService } from './boards.service';

describe('BoardsService', () => {
  let service: BoardsService;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    login: { user: undefined },
    boards: { boards: [] },
    credits: { summary: { total: 0, current: 0 } },
    toasts: { display: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BoardsService);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected boards', () => {
    const expectedBoards: Board[] = [];

    service
      .getAll()
      .subscribe((boards) => expect(boards).toEqual(expectedBoards));

    const req = httpTestingController.expectOne(
      'https://fakerapi.it/api/v1/boards'
    );

    req.flush({ data: expectedBoards });

    // store
    //   .select((state: AppState) => state.boards.boards)
    //   .subscribe((boards) => expect(boards).toEqual(expectedBoards));
  });
});
