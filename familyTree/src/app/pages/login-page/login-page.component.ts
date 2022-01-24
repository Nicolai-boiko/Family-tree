import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public currentUrl: string = this.activatedRoute.snapshot.url[0].path;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public hidePassword = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      secondName: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  getControl(formName: FormGroup, control: string): FormControl {
    return formName.get(control) as FormControl;
  }

  signUp(): void {
    if (this.registerForm.valid) {
      this.authenticationService.SignUp(this.getControl(this.registerForm, 'email').value, this.getControl(this.registerForm, 'password').value);
    }
  }

  signIn(): void {
    if (this.loginForm.valid) {
      this.authenticationService.SignIn(this.getControl(this.loginForm, 'email').value, this.getControl(this.loginForm, 'password').value);
    }
  }
}
