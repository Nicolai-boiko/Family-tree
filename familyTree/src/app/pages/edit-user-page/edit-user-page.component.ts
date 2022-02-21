import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/state/auth.state';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {

  public profileForm!: FormGroup;
  public gender: typeof GenderEnum = GenderEnum;
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public user!: IUser;

  get firstNameControl(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }
  get secondNameControl(): FormControl {
    return this.profileForm.get('secondName') as FormControl;
  }
  get countryControl(): FormControl {
    return this.profileForm.get('country') as FormControl;
  }
  get cityControl(): FormControl {
    return this.profileForm.get('city') as FormControl;
  }
  get postcodeControl(): FormControl {
    return this.profileForm.get('postcode') as FormControl;
  }

  constructor(
    private store: Store<IAuthState>,
  ) { }

  ngOnInit(): void {
    this.store.select(authFeature.selectUser).subscribe(((user) => 
    this.profileForm = new FormGroup({
      firstName: new FormControl(user?.firstName, [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      secondName: new FormControl(user?.secondName, [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      gender: new FormControl(user?.gender, [
        Validators.required,
      ]),
      country: new FormControl(user?.country, [
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      city: new FormControl(user?.city, [
        Validators.pattern(/[a-zA-Z]/g),
        Validators.maxLength(50),
      ]),
      postcode: new FormControl(user?.postcode, [
        Validators.pattern(/\d/g),
        Validators.maxLength(8),
      ]),
    })
    ))
  }

  onSubmit(): void {
    const user = this.profileForm.getRawValue();
    this.store.dispatch(CoreActions.updateUserCollection({ user }));
  }
}
