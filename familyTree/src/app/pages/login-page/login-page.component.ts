import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
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
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup(LoginPageHelper.getFormData(this.isRegistrationPage));
  }

  onSubmit(): void {
    const formValue = this.authForm.getRawValue();
    if (this.authForm.valid) {
      this.isRegistrationPage
          ? this.authenticationService.signUp(formValue)
          : this.authenticationService.signIn(formValue);
    }
  }
}
