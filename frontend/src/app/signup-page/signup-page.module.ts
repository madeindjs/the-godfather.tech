import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupPageComponent } from './signup-page/signup-page.component';

@NgModule({
  declarations: [SignupPageComponent, SignupFormComponent],
  imports: [
    CommonModule,
    SignupPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignupPageModule {}
