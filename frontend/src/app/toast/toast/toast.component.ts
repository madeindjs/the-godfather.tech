import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state.interface';
import { Toast } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  public toasts$: Observable<Toast[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.toasts$ = this.store.select((state) => state.toasts.display);
  }
}
