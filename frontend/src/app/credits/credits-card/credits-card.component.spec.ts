import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CreditsCardComponent } from './credits-card.component';

describe('CreditsCardComponent', () => {
  let component: CreditsCardComponent;
  let fixture: ComponentFixture<CreditsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditsCardComponent],
      imports: [HttpClientModule, StoreModule.forRoot({})],
    }).compileComponents();
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
