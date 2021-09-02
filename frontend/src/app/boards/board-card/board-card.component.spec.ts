import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state.interface';
import { BoardCardComponent } from './board-card.component';

describe('BoardCardComponent', () => {
  let component: BoardCardComponent;
  let fixture: ComponentFixture<BoardCardComponent>;
  const initialState: AppState = {
    login: { user: undefined },
    boards: { boards: [] },
    credits: { summary: { total: 0, current: 0 } },
    toasts: { display: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardCardComponent],
      providers: [provideMockStore({ initialState })],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
