import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { IAuthState } from '../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { Observable } from 'rxjs';
import { FormHelper } from '../form.helper';

@Component({
  selector: 'app-restore-password-page',
  templateUrl: './restore-password-page.component.html',
  styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public resetForm!: FormGroup;
  public userEmail: string = this.activatedRoute.snapshot.queryParams['email'];
  public isEmailSend: Observable<boolean> = this.store.select(authFeature.selectIsEmailSend);
  get emailControl(): FormControl {
    return this.resetForm.get('email') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IAuthState>,
  ) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup(FormHelper.getFormData(RoutesEnum.RESTORE_PASSWORD));
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      const email: string = this.emailControl.value;
      this.store.dispatch(CoreActions.sendPasswordResetEmail({ email }));
    }
  }
}
