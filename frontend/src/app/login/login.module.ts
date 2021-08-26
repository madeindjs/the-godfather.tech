import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';

@NgModule({
  imports: [CommonModule],
  providers: [LoginService],
})
export class LoginModule {}
