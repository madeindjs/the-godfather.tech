import { Component } from '@angular/core';
import { CreditsService } from '../credits.service';

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.scss'],
})
export class BuyCreditsComponent {
  constructor(private readonly creditsService: CreditsService) {}

  buy() {
    this.creditsService.buy().subscribe();
  }
}
