import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState;
  }
  /* Sign up */
  signUp(email: string, password: string): void {
    const createUserWithEmailAndPassword = from(
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    );
    createUserWithEmailAndPassword.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.code),
    });
  }

  /* Sign in */
  signIn(email: string, password: string): void {
    const signInWithEmailAndPassword = from(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
    );
    signInWithEmailAndPassword.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.code),
    });
  }

  /* Sign out */
  signOut(): void {
    this.angularFireAuth.signOut();
  }

  /* Reset password */
  ressetPassword(email: string): Observable<void> {
    const sendPasswordResetEmail = from(
      this.angularFireAuth.sendPasswordResetEmail(email)
    );
    sendPasswordResetEmail.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.code),
    });
    return sendPasswordResetEmail;
  }
}
