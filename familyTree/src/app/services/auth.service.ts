import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null>;
  public showSpinner = new BehaviorSubject(false);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userData = angularFireAuth.authState;
  }
  /* Sign up */
  SignUp(email: string, password: string): void {
    this.showSpinner.next(true);
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.showSpinner.next(false)
        console.log('You are Successfully signed up!', res);
      })
      .catch((error) => {
        this.showSpinner.next(false)
        this.toastr.error('Something is wrong', '')
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string): void {
    this.showSpinner.next(true);
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.showSpinner.next(false)
        this.router.navigate(['/tree']);
      })
      .catch((error) => {
        this.showSpinner.next(false)
        if (error.code === 'auth/wrong-password') {
          this.toastr.error('Wrong password', '');
        } else if (error.code === 'auth/user-not-found') {
          this.toastr.error('Wrong email', '');
        }
        console.log('Something went wrong:', error.message);
        console.log('Error code:', error.code);
      });
  }

  /* Sign out */
  SignOut(): void {
    this.angularFireAuth.signOut();
  }

  /* Sign out */
  ressetPassword(email: string): Promise<void> {
    this.angularFireAuth.sendPasswordResetEmail(email);
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }
}
