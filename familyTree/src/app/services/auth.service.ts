import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import { from, map, Observable, take, } from 'rxjs';
import { IUser } from '../constants/Interfaces/common.interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/state/auth.state';
import { CoreActions } from '../store/actions/auth-state.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { USER_COLLECTION } from 'src/app/constants/Enums/common.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<IAuthState>,
    private afs: AngularFirestore,
  ) { }

  /* Check is user logged in firebase.auth.User */
  checkUserAuth(): void {
    this.angularFireAuth.onIdTokenChanged((data: firebase.User | null) => {
      if (data) {
        const userUID: string = data.uid;
        this.store.dispatch(CoreActions.getUserCollection({ userUID }));
      } else {
        this.store.dispatch(CoreActions.userIsLoggedOut());
      }
    });
  }

  /* Create firebase user collection */
  createCollection(user: IUser, data: firebase.auth.UserCredential): void {
    const userUID = data.user?.uid;
    if (userUID) {
      this.afs.collection<IUser>(USER_COLLECTION).doc(userUID).set({
        ...user,
        password: '',
        registrationDate: new Date().toLocaleString(),
        uid: userUID,
      });
    } else {
      return;
    }
  }

  /* Get user collection from firebase */
  getCollection(UserUID: string): Observable<IUser> {
    return this.afs.collection<IUser>(USER_COLLECTION).valueChanges().pipe(
      take(1),
      map((collections: IUser[]) => collections.filter(users => users.uid === UserUID)[0]),
    );
  }
  /* Update user collection in firebase */
  updateCollection(userFormData: IUser, uid: string): void {
    this.afs.doc<IUser>(`${USER_COLLECTION}/${uid}`).update(userFormData);
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
