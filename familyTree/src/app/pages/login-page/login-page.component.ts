import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { FormHelper } from '../form.helper';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { IAuthState } from '../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public gender: typeof GenderEnum = GenderEnum;
  public pageURL: RoutesEnum = this.activatedRoute.snapshot.url[0].path as RoutesEnum;
  public authForm: FormGroup;
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
    private store: Store<IAuthState>,
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup(FormHelper.getFormData(this.pageURL));
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const user: IUser = this.authForm.getRawValue() as IUser;
      
      this.pageURL === RoutesEnum.REGISTRATION
          ? this.store.dispatch(CoreActions.signUpWithEmail({ user }))
          : this.store.dispatch(CoreActions.signInWithEmail({ user }));
    }
  }
}
