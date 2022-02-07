import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { USER_COLLECTION, RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { catchError, finalize, from, of, take, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  public userDoc!: AngularFirestoreDocument<IUser>;

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
    private authService: AuthService,
    private afs: AngularFirestore,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.userData$.pipe(
      take(1),
      tap(user => {
        const usersCollection = this.afs.collection<IUser>(USER_COLLECTION);
        usersCollection.valueChanges({ idField: user?.uid }).pipe(
          take(1),
          tap((usersArray) => this.user = usersArray[0]),
        ).subscribe(() => {
          this.userDoc = this.afs.doc<IUser>(`${USER_COLLECTION}/${this.user.uid}`);
          this.profileForm = new FormGroup({
            firstName: new FormControl(this.user.firstName, [
              Validators.required,
              Validators.pattern(/[a-zA-Z]/g),
              Validators.maxLength(50),
            ]),
            secondName: new FormControl(this.user.secondName, [
              Validators.required,
              Validators.pattern(/[a-zA-Z]/g),
              Validators.maxLength(50),
            ]),
            gender: new FormControl(this.user.gender, [
              Validators.required,
            ]),
            country: new FormControl(this.user.country, [
              Validators.pattern(/[a-zA-Z]/g),
              Validators.maxLength(50),
            ]),
            city: new FormControl(this.user.city, [
              Validators.pattern(/[a-zA-Z]/g),
              Validators.maxLength(50),
            ]),
            postcode: new FormControl(this.user.postcode, [
              Validators.pattern(/\d/g),
              Validators.maxLength(8),
            ]),
          })
        });
      }),
    ).subscribe();
  }

  onSubmit(): void {
    this.authService.$showLoader.next(true);
    const profileFormValue = this.profileForm.getRawValue();
    from(this.userDoc.update(profileFormValue)).pipe(
      take(1),
      tap(() => this.toastr.success('You are sign out!', '')),
      finalize(() => this.authService.$showLoader.next(false)),
      catchError((error) => {
        this.toastr.error(`${error.message}`, `Code: ${error.code}`);
        return of(error);
      }),
    ).subscribe();
  }
}
