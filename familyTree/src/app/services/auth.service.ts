import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  constructor(
    private angularFireAuth: AngularFireAuth,
  ) {}

  /* Sign up */
  signUp(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password));
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
