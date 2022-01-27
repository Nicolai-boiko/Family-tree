import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable } from 'rxjs';
import { RoutesEnum } from '../app-routing.module';
import { take} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  public isEmailSend = false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp(formValue: Record<string, string>): void {
    from(this.angularFireAuth.createUserWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
        take(1),
    ).subscribe(() => this.router.navigate(['/', RoutesEnum.LOG_IN]));
  }

  /* Sign in */
  signIn(formValue: Record<string, string>): void {
    from(this.angularFireAuth.signInWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
      take(1),
  ).subscribe(() => this.router.navigate(['/', RoutesEnum.TREE]));
  }

  /* Sign out */
  signOut(): void {
    from(this.angularFireAuth.signOut()).pipe(
      take(1),
    ).subscribe(() => this.router.navigate(['/', RoutesEnum.LOG_IN]));
  }

  /* Reset password */
  ressetPassword(email: string): void {
    from(this.angularFireAuth.sendPasswordResetEmail(email)).pipe(
      take(1),
    )
    .subscribe(() => this.isEmailSend = true);
  }
}
