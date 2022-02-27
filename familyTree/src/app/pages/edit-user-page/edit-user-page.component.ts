import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/state/auth.state';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { finalize, Observable, Subscription } from 'rxjs';
import { FormHelper } from '../form.helper';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { ToastrService } from 'ngx-toastr';

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
  public downloadURL!: Observable<string>;
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
    private storage: AngularFireStorage,
    private toastr: ToastrService,
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
        })
      }))
  }

  onSubmit(): void {
    const user: IUser = this.profileForm.getRawValue();
    this.store.dispatch(CoreActions.updateUserCollection({ user }));
  }

  uploadPhoto(event: Event) { 
    const target = event.target as HTMLInputElement;
    if (target.files !== null) {
      if (target.files.length > 0) {
        const file = target.files[0];
        if (file.size > 5 * 1024 * 1024) {
          this.toastr.error('To big file', '');
        } else {
          const filePath = 'name-your-file-path-here';
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, file);
          this.uploadPercent = task.percentageChanges();
          task.snapshotChanges().pipe(
            finalize(() => this.downloadURL = fileRef.getDownloadURL()),
          ).subscribe();
        }
      }
    }
  }

  deletePhoto() {
    this.downloadURL = new Observable<''>();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
