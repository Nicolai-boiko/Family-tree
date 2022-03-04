import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import { filter, from, map, Observable, take } from 'rxjs';
import { IUser } from '../constants/Interfaces/common.interfaces';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/state/auth.state';
import { CoreActions } from '../store/actions/auth-state.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { USER_COLLECTION } from 'src/app/constants/Enums/common.enums';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<IAuthState>,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  /* Check is user logged in firebase.auth.User */
  checkUserAuth(): void {
    this.angularFireAuth.onIdTokenChanged((data: firebase.User | null) => {
      this.store.dispatch(data ? CoreActions.getUserCollection({ userUID: data.uid }) : CoreActions.userIsLoggedOut());
    });
  }

  /* Create firebase user collection */
  createCollection(user: IUser, data: firebase.auth.UserCredential): void {
    // it comes from firebase better to handle it here
    const userUID: string | undefined = data.user?.uid;
    if (userUID) {
      this.afs.collection<IUser>(USER_COLLECTION).doc(userUID).set({
        ...user,
        password: '',
        registrationDate: new Date().toLocaleString(),
        uid: userUID,
      });
    }
  }

  /* Get user collection from firebase */
  getCollection(userUID: string): Observable<IUser> {
    return this.afs.collection<IUser>(USER_COLLECTION).valueChanges().pipe(
      take(1), // Needed because of valueChanges() subscribe to changes and not unsubscribe in effects (firebase specificity)
      map((collections: IUser[]) => collections.find(users => users.uid === userUID) || null),
      filter(Boolean),
    );
  }
  /* Update user collection in firebase */
  updateCollection(userFormData: IUser, uid: string): void {
    this.afs.doc<IUser>(`${USER_COLLECTION}/${uid}`).update(userFormData);
  }

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp({ email, password }: IUser): Observable<firebase.auth.UserCredential> {
    return from<Promise<firebase.auth.UserCredential>>(this.angularFireAuth.createUserWithEmailAndPassword(email as string, password as string));
  }

  /* Sign in */
  signIn({ email, password }: IUser): Observable<firebase.auth.UserCredential> {
    return from<Promise<firebase.auth.UserCredential>>(this.angularFireAuth.signInWithEmailAndPassword(email as string, password as string));
  }

  /* Sign out */
  signOut(): Observable<void> {
    return from<Promise<void>>(this.angularFireAuth.signOut());
  }

  /* Reset password */
  resetPassword(email: string): Observable<void> {
    return from<Promise<void>>(this.angularFireAuth.sendPasswordResetEmail(email));
  }

  uploadUserPhoto(file: File, uid: string): Observable<firebase.storage.UploadTaskSnapshot | undefined> {
    return this.storage.upload(uid, file).snapshotChanges();
  }

  getPhotoURL(taskRef: string): Observable<string> {
    return this.storage.ref(taskRef).getDownloadURL();
  }
}
