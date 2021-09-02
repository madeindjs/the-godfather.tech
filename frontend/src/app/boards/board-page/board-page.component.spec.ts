import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BoardPageComponent } from './board-page.component';

describe('BoardPageComponent', () => {
  let component: BoardPageComponent;
  let fixture: ComponentFixture<BoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'test' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
