import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/state/auth.state';
import { authFeature, selectUserPhotoURL } from 'src/app/store/reducers/auth-state.reducer';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { map, Observable, Subscription } from 'rxjs';
import { FormHelper } from '../form.helper';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit, OnDestroy {
  public profileForm: FormGroup;
  public gender: typeof GenderEnum = GenderEnum;
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public user: IUser;
  public uploadPercent: Observable<number | undefined>;
  public defaultPhoto: string;
  public downloadPhotoURL$: Observable<string | undefined> = this.store.select(selectUserPhotoURL);
  public uploadProgress$: Observable<number> = this.store.select(authFeature.selectLoadProgress);
  private subscription: Subscription;

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
    public authService: AuthService,
    public toastr: ToastrService,
    private store: Store<IAuthState>,
  ) { }

  ngOnInit(): void {
    this.store.select(authFeature.selectUser).pipe(
      map(user => {
        if (user) {
          this.defaultPhoto = user.gender === 'male' ? '../../../assets/img/man.png' : '../../../assets/img/women.png';
        } else {
          return;
        }
      })
    ).subscribe();
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
    }));
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const user: IUser = this.profileForm.getRawValue();
      this.store.dispatch(CoreActions.updateUserCollection({ user }));
    }
  }

  uploadPhoto(event: Event): void {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    const file: File = fileList[0];
    if (file.size > 5 * 1024 * 1024) {
      this.toastr.error('To big file');
    } else {
      this.store.dispatch(CoreActions.uploadUserPhoto({ file }));
    }
  };

  deletePhoto(): void {
    this.store.dispatch(CoreActions.clearPhotoUserURL());
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
