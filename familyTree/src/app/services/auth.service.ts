import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
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
  SignUp(email: string, password: string): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string): void {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.router.navigate(['/tree']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
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
