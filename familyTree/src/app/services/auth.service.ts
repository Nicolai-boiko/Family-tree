import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { IUser } from '../constants/Interfaces/common.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  private $showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.$showLoader.asObservable();
  constructor(
    private angularFireAuth: AngularFireAuth,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp({ email, password }: IUser): Observable<firebase.auth.UserCredential> {
    return from<Promise<firebase.auth.UserCredential>>(this.angularFireAuth.createUserWithEmailAndPassword(email, password as string));
  }

  /* Sign in */
  signIn({ email, password }: IUser): Observable<firebase.auth.UserCredential> {
    return from<Promise<firebase.auth.UserCredential>>(this.angularFireAuth.signInWithEmailAndPassword(email, password as string));
  }

  /* Sign out */
  signOut(): Observable<void> {
    return from<Promise<void>>(this.angularFireAuth.signOut());
  }

  /* Reset password */
  resetPassword(email: string): Observable<void> {
    return from<Promise<void>>(this.angularFireAuth.sendPasswordResetEmail(email));
  }
}
