import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsCardComponent } from './credits-card.component';

describe('CreditsCardComponent', () => {
  let component: CreditsCardComponent;
  let fixture: ComponentFixture<CreditsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
