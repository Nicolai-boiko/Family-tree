import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPageHelper } from './login-page.helper';
import { EGender } from 'src/app/constants/Enums/common.enums';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public gender: typeof EGender = EGender;
  public isRegistrationPage: boolean = this.activatedRoute.snapshot.url[0].path === RoutesEnum.REGISTRATION;
  public authForm!: FormGroup;
  public hidePassword = true;
  
  get firstNameControl(): FormControl {
    return this.authForm.get('firstName') as FormControl;
  }
  get secondNameControl(): FormControl {
    return this.authForm.get('secondName') as FormControl;
  }
  get emailControl(): FormControl {
    return this.authForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

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
