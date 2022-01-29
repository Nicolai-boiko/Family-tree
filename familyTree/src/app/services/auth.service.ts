import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable, of } from 'rxjs';
import { RoutesEnum } from '../app-routing.module';
import { catchError, take, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp(formValue: Record<string, string>): void {
    from(this.angularFireAuth.createUserWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
        take(1),
        tap(() => {
          this.router.navigate(['/', RoutesEnum.LOG_IN]);
          this.toastr.success('You are successfully registered!', '');
        }),
        catchError((error) => {
          this.toastr.error(`${error.message}`, `Code: ${error.code}`);
          return of(error);
        }),
    ).subscribe();
  }

  /* Sign in */
  signIn(formValue: Record<string, string>): void {
    from(this.angularFireAuth.signInWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
      take(1),
      tap(() => this.router.navigate(['/', RoutesEnum.TREE])),
      catchError((error) => {
        this.toastr.error(`${error.message}`, `Code: ${error.code}`);
        return of(error);
      }),
  ).subscribe();
  }

  /* Sign out */
  signOut(): void {
    from(this.angularFireAuth.signOut()).pipe(
      take(1),
      tap(() => this.router.navigate(['/', RoutesEnum.LOG_IN])),
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
