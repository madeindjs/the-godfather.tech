import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { AuthorizationInterceptor } from '../authorization.interceptor';
import { LoginService } from './login.service';

const interceptors: Array<Provider> = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
];
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [LoginService, ...interceptors],
})
export class LoginModule {}
