import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state.interface';
import { UsersService } from '../users.service';
import { UsersPageIndexComponent } from './users-page-index.component';

describe('UsersPageIndexComponent', () => {
  let component: UsersPageIndexComponent;
  let fixture: ComponentFixture<UsersPageIndexComponent>;
  const initialState: AppState = {
    login: { user: undefined },
    users: { users: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersPageIndexComponent],
      imports: [HttpClientModule],
      providers: [UsersService, provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
