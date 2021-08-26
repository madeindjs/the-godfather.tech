import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginCardComponent } from './login-card/login-card.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, LoginCardComponent],
  imports: [
    CommonModule,
    LoginModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageModule {}
