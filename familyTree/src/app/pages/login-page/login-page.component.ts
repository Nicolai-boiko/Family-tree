import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, take } from 'rxjs';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginPageHelper } from './login-page.helper';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum; //use in template only
  public currentUrl: string = this.activatedRoute.snapshot.url[0].path;
  public isRegistrationPage: boolean = this.activatedRoute.snapshot.url[0].path === RoutesEnum.REGISTRATION;
  public authForm!: FormGroup;
  public hidePassword = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup(LoginPageHelper.getFormData(this.isRegistrationPage));
    // this.currentUrl !== this.routesEnum.REGISTRATION ?
    // this.authForm = new FormGroup({
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.email,
    //     Validators.maxLength(50),
    //   ]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(8),
    //   ]),
    // })
    //     :
    // this.authForm = new FormGroup({
    //   firstName: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern(/[a-zA-Z]/g),
    //     Validators.maxLength(50),
    //   ]),
    //   secondName: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern(/[a-zA-Z]/g),
    //     Validators.maxLength(50),
    //   ]),
    //   gender: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.email,
    //     Validators.maxLength(50),
    //   ]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(8),
    //   ]),
    // })
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      // this.isRegistrationPage
      //     ? this.authenticationService.signUp(this.authForm.get('email')?.value, this.authForm.get('password')?.value)
      //     : this.authenticationService.signIn();
    }
  }

  signUp(): void {
      console.log(this.authForm.getRawValue());
      this.authenticationService.signUp(this.authForm.get('email')?.value, this.authForm.get('password')?.value);
  }

  signIn(): void {
    if (this.authForm.valid) {
      this.authenticationService.signIn(this.authForm.get('email')?.value, this.authForm.get('password')?.value).pipe(
        take(1),
        finalize(() => this.router.navigate(['/', this.routesEnum.TREE]))
      ).subscribe();
    }
  }
}
