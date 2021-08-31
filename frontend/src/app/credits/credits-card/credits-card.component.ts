import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state.interface';
import { CreditsService } from '../credits.service';

@Component({
  selector: 'app-credits-card',
  templateUrl: './credits-card.component.html',
  styleUrls: ['./credits-card.component.scss'],
})
export class CreditsCardComponent implements OnInit {
  public total$!: Observable<number>;
  public current$!: Observable<number>;

  constructor(
    private readonly creditsService: CreditsService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.creditsService.getSummary().subscribe();
    this.total$ = this.store.select((state) => state.credits.summary.total);
    this.current$ = this.store.select((state) => state.credits.summary.current);
  }
}
