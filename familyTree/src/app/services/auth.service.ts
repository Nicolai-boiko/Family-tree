import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { RoutesEnum } from '../constants/Enums/common.enums';
import { finalize, catchError, take, tap, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../constants/Interfaces/common.interfaces';
import { USER_COLLECTION } from '../constants/Enums/common.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData$: Observable<firebase.User | null> = this.angularFireAuth.authState;
  public $showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.$showLoader.asObservable();
  private usersCollection: AngularFirestoreCollection<IUser> = this.afs.collection<IUser>(USER_COLLECTION);
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp(user: IUser): void {
    this.$showLoader.next(true);
    from(this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
        take(1),
        tap((firebaseUserCredentials) => {
          const userUID = firebaseUserCredentials.user?.uid;
          this.usersCollection.doc(userUID).set({
            ...user,
            password: '',
            registrationDate: new Date().toLocaleString(),
            uid: userUID,
          });
          this.router.navigate(['/', RoutesEnum.LOG_IN]);
          this.toastr.success('You are successfully registered!', '');
        }),
        finalize(() => this.$showLoader.next(false)),
        catchError((error) => {
          this.toastr.error(`${error.message}`, `Code: ${error.code}`);
          return of(error);
        }),
    ).subscribe();
  }

  /* Sign in */
  signIn({ email, password }: IUser): void {
    this.$showLoader.next(true);
    from(this.angularFireAuth.signInWithEmailAndPassword(email, password)).pipe(
      take(1),
      tap(() => {
        this.router.navigate(['/', RoutesEnum.TREE]);
        this.toastr.success('You are successfully logged in!', '');
      }),
      finalize(() => this.$showLoader.next(false)),
      catchError((error) => {
        this.toastr.error(`${error.message}`, `Code: ${error.code}`);
        return of(error);
      }),
    ).subscribe();
  }

  /* Sign out */
  signOut(): void {
    this.$showLoader.next(true);
    from(this.angularFireAuth.signOut()).pipe(
      take(1),
      tap(() => {
        this.router.navigate(['/', RoutesEnum.HOME]);
        this.toastr.success('You are sign out!', '');
      }),
      finalize(() => this.$showLoader.next(false)),
      catchError((error) => {
        this.toastr.error(`${error.message}`, `Code: ${error.code}`);
        return of(error);
      }),
    ).subscribe();
  }

  /* Reset password */
  resetPassword(email: string): Observable<void> {
    return from(this.angularFireAuth.sendPasswordResetEmail(email));
  }
}
