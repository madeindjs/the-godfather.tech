// src/app/login-page/login-form/login-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService, LoginUser } from '../../login/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public user: LoginUser = {
    email: 'test@test.fr',
    password: '123456',
  };
  public form: FormGroup;
  public readonly passwordMinLength = 4;

  constructor(private readonly loginService: LoginService) {}

  get valid() {
    return this.form.valid;
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
      ]),
    });
  }

  login() {
    return this.loginService.login({
      email: String(this.emailField.value),
      password: String(this.passwordField.value),
    });
  }
}
