import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHostComponent } from './board-host.component';

describe('BoardHostComponent', () => {
  let component: BoardHostComponent;
  let fixture: ComponentFixture<BoardHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
