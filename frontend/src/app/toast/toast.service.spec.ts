import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
