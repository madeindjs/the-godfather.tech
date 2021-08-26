import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutPageRoutingModule } from './about-page-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent],
  imports: [CommonModule, AboutPageRoutingModule],
})
export class AboutPageModule {}
