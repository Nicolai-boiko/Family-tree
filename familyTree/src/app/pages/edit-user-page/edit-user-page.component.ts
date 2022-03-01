import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/state/auth.state';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormHelper } from '../form.helper';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit, OnDestroy {

  public profileForm!: FormGroup;
  public gender: typeof GenderEnum = GenderEnum;
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public user!: IUser;
  public uploadPercent!: Observable<number | undefined>;
  private downloadURL: BehaviorSubject<string> = new BehaviorSubject('');
  public downloadURL$: Observable<string> = this.downloadURL.asObservable();
  public uploadProgress$: Observable<number> = this.store.select(authFeature.selectLoadProgress);
  private subscription!: Subscription;

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
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
      this.profileForm = new FormGroup(FormHelper.getFormData(RoutesEnum.EDIT_USER));
      this.subscription = this.store.select(authFeature.selectUser).subscribe(((user) => {
        this.profileForm.patchValue({
          firstName: user?.firstName || '',
          secondName: user?.secondName || '',
          gender: user?.gender || '',
          country: user?.country || '',
          city: user?.city || '',
          postcode: user?.postcode || '',
          registrationDate: user?.registrationDate || '',
          photoUrl: user?.photoUrl || '',
        });
        if(user?.photoUrl) {
          this.downloadURL.next(user.photoUrl);
        } else {
          this.downloadURL.next('');
        }
      }));
  }

  onSubmit(): void {
    if(this.profileForm.valid) {
      const user: IUser = this.profileForm.getRawValue();
      this.store.dispatch(CoreActions.updateUserCollection({ user }));
    }
  }

  uploadPhoto(event: Event): void { 
    this.store.dispatch(CoreActions.uploadUserPhoto({ event }));
  }

  deletePhoto(): void {
    this.downloadURL.next('');
    this.profileForm.controls['photoUrl'].setValue('');
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
