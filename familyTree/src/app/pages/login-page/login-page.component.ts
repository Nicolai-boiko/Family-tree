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
    public authenticationService: AuthService
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

  signUp(): void {
    if (this.registerForm.valid) {
      const signUpEmail = this.registerForm.get('email')?.value;
      const signUpPassword = this.registerForm.get('password')?.value;
      this.authenticationService.signUp(signUpEmail, signUpPassword);
    }
  }

  signIn(): void {
    if (this.loginForm.valid) {
      const signInEmail = this.loginForm.get('email')?.value;
      const signInPassword = this.loginForm.get('password')?.value;
      this.authenticationService.signIn(signInEmail, signInPassword);
    }
  }
}
