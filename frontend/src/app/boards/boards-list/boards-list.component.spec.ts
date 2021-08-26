import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state.interface';
import { BoardCardComponent } from '../board-card/board-card.component';
import { BoardsListComponent } from './boards-list.component';

describe('UsersListComponent', () => {
  let component: BoardsListComponent;
  let fixture: ComponentFixture<BoardsListComponent>;
  const initialState: AppState = {
    login: { user: undefined },
    boards: { users: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsListComponent, BoardCardComponent],
      imports: [HttpClientModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
