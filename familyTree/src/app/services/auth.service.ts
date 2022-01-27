import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { RoutesEnum } from '../app-routing.module';
import { catchError, finalize, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  public isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserLogged$: Observable<boolean> = this.isUserLogged.asObservable();
  public isEmailSend = false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp(formValue: Record<string, string>): void {
    from(this.angularFireAuth.createUserWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
        take(1),
        tap(() => {
          this.isUserLogged.next(true);
          this.router.navigate(['/', RoutesEnum.LOG_IN]);
      }),
        catchError((err) => {
          this.isUserLogged.next(false);
          return throwError(() => err);
        }),
    ).subscribe();
  }

  /* Sign in */
  signIn(formValue: Record<string, string>): void {
    from(this.angularFireAuth.signInWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
      take(1),
      tap(() => {
        this.isUserLogged.next(true);
        this.router.navigate(['/', RoutesEnum.TREE]);
      }),
      catchError((err) => {
        this.isUserLogged.next(false);
        return throwError(() => err);
      }),
  ).subscribe();
  }

  /* Sign out */
  signOut(): void {
    from(this.angularFireAuth.signOut()).pipe(
      take(1),
      tap(() => this.router.navigate(['/', RoutesEnum.LOG_IN])),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  /* Reset password */
  ressetPassword(email: string): void {
    from(this.angularFireAuth.sendPasswordResetEmail(email))
    .pipe(
      take(1),
      tap(() => this.isEmailSend = true),
      catchError((err) => {
        return throwError(() => err);
      }),
    )
    .subscribe();
  }
}
