import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CreditsCardComponent } from './credits-card/credits-card.component';
import { CreditsService } from './credits.service';

@NgModule({
  declarations: [CreditsCardComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [CreditsService],
  exports: [CreditsCardComponent],
})
export class CreditsModule {}
