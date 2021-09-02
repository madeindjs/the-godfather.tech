import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CreditsService } from './credits.service';

describe('CreditsService', () => {
  let service: CreditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, StoreModule.forRoot({})],
    });
    service = TestBed.inject(CreditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
