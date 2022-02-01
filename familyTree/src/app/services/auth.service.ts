import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { RoutesEnum } from '../app-routing.module';
import { finalize, catchError, take, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null> = this.angularFireAuth.authState;
  private $showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.$showLoader.asObservable();
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  /* Sign up Observable<firebase.auth.UserCredential> */
  signUp({ email, password  }: IUser): Observable<firebase.auth.UserCredential> {
    return from<Promise<firebase.auth.UserCredential>>(this.angularFireAuth.createUserWithEmailAndPassword(email, password as string));
  }

  /* Sign in */
  // ToDo rework like signUp
  signIn(formValue: any): any {
    this.$showLoader.next(true);
    from(this.angularFireAuth.signInWithEmailAndPassword(formValue['email'], formValue['password'])).pipe(
      take(1),
      tap(() => {
        this.router.navigate(['/', RoutesEnum.TREE]);
        this.toastr.success('You are successfully logged in!', '');
      }),
      finalize(() => this.$showLoader.next(false)),
      catchError((error) => {
        this.toastr.error(`${error.message}`, `Code: ${error.code}`);
        return of(error);
      }),
  ).subscribe();
  }

  /* Sign out */
  // ToDo rework like signUp
  signOut(): void {
    this.$showLoader.next(true);
    from(this.angularFireAuth.signOut()).pipe(
      take(1),
      tap(() => {
        this.router.navigate(['/', RoutesEnum.LOG_IN]);
        this.toastr.success('You are sign out!', '');
      }),
      finalize(() => this.$showLoader.next(false)),
      catchError((error) => {
        this.toastr.error(`${error.message}`, `Code: ${error.code}`);
        return of(error);
      }),
    ).subscribe();
  }

  /* Reset password */
  // ToDo rework like signUp
  resetPassword(email: string): Observable<void> {
    return from(this.angularFireAuth.sendPasswordResetEmail(email));
  }
}
