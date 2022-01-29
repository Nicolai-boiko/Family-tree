import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { RoutesEnum } from '../app-routing.module';
import { finalize, take} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  public showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp(formValue: Record<string, string>): void {
    this.showLoader.next(true);
    from(this.angularFireAuth.createUserWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
        take(1),
        finalize(() => this.showLoader.next(false)),
    ).subscribe(() => this.router.navigate(['/', RoutesEnum.LOG_IN]));
  }

  /* Sign in */
  signIn(formValue: Record<string, string>): void {
    this.showLoader.next(true);
    from(this.angularFireAuth.signInWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
      take(1),
      finalize(() => this.showLoader.next(false)),
  ).subscribe(() => this.router.navigate(['/', RoutesEnum.TREE]));
  }

  /* Sign out */
  signOut(): void {
    this.showLoader.next(true);
    from(this.angularFireAuth.signOut()).pipe(
      take(1),
      finalize(() => this.showLoader.next(false)),
    ).subscribe(() => this.router.navigate(['/', RoutesEnum.LOG_IN]));
  }

  /* Reset password */
  resetPassword(email: string): Observable<void> {
    return from(this.angularFireAuth.sendPasswordResetEmail(email));
  }
}
