import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state.interface';
import { BoardsService } from '../boards.service';
import { BoardsPageIndexComponent } from './boards-page-index.component';

describe('UsersPageIndexComponent', () => {
  let component: BoardsPageIndexComponent;
  let fixture: ComponentFixture<BoardsPageIndexComponent>;
  const initialState: AppState = {
    login: { user: undefined },
    boards: { users: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsPageIndexComponent],
      imports: [HttpClientModule],
      providers: [BoardsService, provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsPageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
