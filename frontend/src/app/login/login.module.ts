import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [LoginService],
})
export class LoginModule {}
