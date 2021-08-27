import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { CreditsCardComponent } from './credits-card/credits-card.component';
import { CreditsService } from './credits.service';

@NgModule({
  declarations: [CreditsCardComponent, BuyCreditsComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [CreditsService],
  exports: [CreditsCardComponent, BuyCreditsComponent],
})
export class CreditsModule {}
