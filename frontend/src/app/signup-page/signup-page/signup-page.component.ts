import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/login/login.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  loginUser$: Observable<LoginUser>;
}
