// src/app/signup-page/signup-form/signup-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService, LoginUser } from 'src/app/login/login.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  public user: LoginUser = {
    email: 'test@test.fr',
    password: '123456',
  };
  public form!: FormGroup;
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

  signup() {
    return this.loginService
      .signUp({
        email: String(this.emailField?.value),
        password: String(this.passwordField?.value),
      })
      .subscribe();
  }
}
