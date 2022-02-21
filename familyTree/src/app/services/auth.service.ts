import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import { from, Observable } from 'rxjs';
import { IUser } from '../constants/Interfaces/common.interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/state/auth.state';
import { CoreActions } from '../store/actions/auth-state.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<IAuthState>,
  ) {}

  /* Check is user logged in firebase.auth.User */
  checkUserAuth() {
    this.angularFireAuth.onIdTokenChanged((data: firebase.User | null) => {
      if(data) {
        Object.freeze(data);
        this.store.dispatch(CoreActions.userIsLoggedIn({ data }));
      } else {
        this.store.dispatch(CoreActions.userIsLoggedOut());
      }
    })
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
