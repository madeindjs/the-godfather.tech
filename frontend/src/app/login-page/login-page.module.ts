import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditsModule } from '../credits/credits.module';
import { LoginModule } from '../login/login.module';
import { LoginCardComponent } from './login-card/login-card.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, LoginCardComponent],
  imports: [
    CommonModule,
    LoginModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CreditsModule,
  ],
})
export class LoginPageModule {}
