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
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp(email: string, password: string): void {
    from(this.angularFireAuth.createUserWithEmailAndPassword(email, password)).pipe(
        take(1),
        tap(() => this.isUserLogged.next(true)),
        catchError((err) => {
          this.isUserLogged.next(false);
          return throwError(err);
        }),
        finalize(() => this.router.navigate(['/', RoutesEnum.LOG_IN])),
    ).subscribe();
  }

  /* Sign in */
  signIn(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.signInWithEmailAndPassword(email, password));
  }

  /* Sign out */
  signOut(): void {
    this.angularFireAuth.signOut();
  }

  /* Reset password */
  ressetPassword(email: string): Observable<void> {
    return from(this.angularFireAuth.sendPasswordResetEmail(email));
  }
}
