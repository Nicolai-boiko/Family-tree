import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPageHelper } from './login-page.helper';
import { GenderEnum } from '../../constants/Enums/common.enums';
import { IUser } from '../../models';
import { IAuthState } from '../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { SignUpWithEmail } from '../../store/actions/auth-state.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public sexEnum: typeof GenderEnum = GenderEnum;
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
    private readonly activatedRoute: ActivatedRoute,
    private readonly authenticationService: AuthService,
    private readonly store: Store<IAuthState>,
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup(LoginPageHelper.getFormData(this.isRegistrationPage));
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const userData: IUser = this.authForm.getRawValue() as IUser;
      
      this.isRegistrationPage
          ? this.store.dispatch<SignUpWithEmail>(new SignUpWithEmail(userData))
          : this.authenticationService.signIn(userData);
    }
  }
}
