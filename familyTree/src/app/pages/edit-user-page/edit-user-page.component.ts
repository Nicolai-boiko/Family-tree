import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/state/auth.state';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { filter, map, Observable, Subscription, take, tap } from 'rxjs';
import { FormHelper } from '../form.helper';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ComponentCanDeactivate } from 'src/app/guards/exit-edit-page.guard';

import { UserPhotoURLDefaultEnum } from 'src/app/constants/Enums/common.enums';
import { YesOrNoEnum } from 'src/app/constants/Enums/common.enums';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  public downloadPhotoURL$: Observable<string> = this.store.select(authFeature.selectUser).pipe(
    filter(Boolean),
    map((user: IUser) => user.photoUrl || (user.gender === GenderEnum.MALE ? this.manPhotoURLDefault : this.womenPhotoURLDefault))
  );
  public uploadProgress$: Observable<number> = this.store.select(authFeature.selectLoadProgress);
  public profileForm: FormGroup;
  public gender: typeof GenderEnum = GenderEnum;
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public user: IUser;
  public uploadPercent: Observable<number | undefined>;
  public defaultPhoto: string;
  public manPhotoURLDefault: UserPhotoURLDefaultEnum = UserPhotoURLDefaultEnum.MAN_PHOTO_URL_DEFAULT;
  public womenPhotoURLDefault: UserPhotoURLDefaultEnum = UserPhotoURLDefaultEnum.WOMEN_PHOTO_URL_DEFAULT;
  public isFormChanged: boolean;
  private subscription: Subscription;
  private subscriptionForm: Subscription;

  get firstNameControl(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }
  get secondNameControl(): FormControl {
    return this.profileForm.get('secondName') as FormControl;
  }
  get birthdayControl(): FormControl {
    return this.profileForm.get('birthday') as FormControl;
  }
  get countryControl(): FormControl {
    return this.profileForm.get('country') as FormControl;
  }
  get cityControl(): FormControl {
    return this.profileForm.get('city') as FormControl;
  }
  get registrationDateControl(): FormControl {
    return this.profileForm.get('registrationDate') as FormControl;
  }
  get genderControl(): FormControl {
    return this.profileForm.get('gender') as FormControl;
  }
  get postcodeControl(): FormControl {
    return this.profileForm.get('postcode') as FormControl;
  }
  get telephoneControl(): FormControl {
    return this.profileForm.get('telephone') as FormControl;
  }

  constructor(
    public toastr: ToastrService,
    private store: Store<IAuthState>,
    public dialog: MatDialog,
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
        birthday: user?.birthday || '',
        telephone: user?.telephone || '',
      });
    }));
    this.subscriptionForm = this.profileForm.valueChanges.pipe(
      tap(value => this.isFormChanged = !!value),
    ).subscribe();
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
    let dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(ModalComponent, {
      width: '18.75rem',
      disableClose: true,
      autoFocus: true,
      data: { text: 'Are you sure to delete this photo?' },
    });
    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe((data: YesOrNoEnum) => {
      if (data === YesOrNoEnum.YES) {
        this.store.dispatch(CoreActions.clearPhotoUserURL());
      }
    });
  };

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isFormChanged) {
      return true;
    }
    let dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(ModalComponent, {
      width: '18.75rem',
      disableClose: true,
      autoFocus: true,
      data: { text: 'Are you sure to exit WITHOUT saving?' },
    });
    return dialogRef.afterClosed().pipe(
      take(1),
      map(data => data === YesOrNoEnum.YES),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionForm.unsubscribe();
  }
}
