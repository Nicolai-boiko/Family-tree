import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { RoutesEnum } from '../constants/Enums/common.enums';
import { finalize, catchError, take, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../constants/Interfaces/common.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  private $showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.$showLoader.asObservable();
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp({ email, password }: User): void {
    this.$showLoader.next(true);
    from(this.angularFireAuth.createUserWithEmailAndPassword(email, password)).pipe(
        take(1),
        tap(() => {
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
  signIn({ email, password }: User): void {
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
