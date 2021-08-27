import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CreditsService } from '../credits.service';

@Component({
  selector: 'app-credits-card',
  templateUrl: './credits-card.component.html',
  styleUrls: ['./credits-card.component.scss'],
})
export class CreditsCardComponent implements OnInit {
  public total$: Observable<number>;
  public current$: Observable<number>;

  constructor(private readonly creditsService: CreditsService) {}

  ngOnInit(): void {
    const creditSummary$ = this.creditsService.getSummary().pipe(share());
    this.total$ = creditSummary$.pipe(map((s) => s.total));
    this.current$ = creditSummary$.pipe(map((s) => s.current));
  }
}
