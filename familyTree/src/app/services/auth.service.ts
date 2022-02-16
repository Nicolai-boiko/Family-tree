import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import { BehaviorSubject, from, Observable, take, tap } from 'rxjs';
import { IUser } from '../constants/Interfaces/common.interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/state/auth.state';
import { UserIsLoggedIn } from '../store/actions/auth-state.actions';
import { UserIsLoggedOut } from '../store/actions/auth-state.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState; // переделать header
  private $showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.$showLoader.asObservable(); //переделать loader
  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<IAuthState>,
  ) {}

  /* Check is user logged in firebase.auth.User */
  checkUserAuth() {
    this.angularFireAuth.onAuthStateChanged((data: firebase.User | null) => {
      console.log(data);
      /* data
        ? this.store.dispatch(UserIsLoggedIn({ data }))
        : this.store.dispatch(UserIsLoggedOut()); */
    });
  }

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
