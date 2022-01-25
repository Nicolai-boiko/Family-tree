import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable } from 'rxjs';
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
  signUp(email: string, password: string): void {
    this.showSpinner.next(true);
    const createUserWithEmailAndPassword = from(
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    );
    createUserWithEmailAndPassword.subscribe({
      next: () => {
        this.showSpinner.next(false);
      },
      error: (error) => {
        this.showSpinner.next(false);
        this.toastr.error('Something is wrong', `${error.message}`);
      },
    });
  }

  /* Sign in */
  signIn(email: string, password: string): void {
    this.showSpinner.next(true);
    const signInWithEmailAndPassword = from(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
    );
    signInWithEmailAndPassword.subscribe({
      next: () => {
        this.showSpinner.next(false);
        this.router.navigate(['/tree']);
      },
      error: (error) => {
        this.showSpinner.next(false);
        if (error.code === 'auth/wrong-password') {
          this.toastr.error('Wrong password', '');
        } else if (error.code === 'auth/user-not-found') {
          this.toastr.error('Wrong email', `${error.message}`);
        }
      },
    });
  }

  /* Sign out */
  signOut(): void {
    this.angularFireAuth.signOut();
  }

  /* Resset password */
  ressetPassword(email: string): Observable<void> {
    this.showSpinner.next(true);
    const sendPasswordResetEmail = from(
      this.angularFireAuth.sendPasswordResetEmail(email)
    );
    sendPasswordResetEmail.subscribe({
      next: () => this.showSpinner.next(false),
      error: (err) => console.log(err.code),
    });
    return sendPasswordResetEmail;
  }
}
