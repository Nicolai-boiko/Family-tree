import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<firebase.User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
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
        this.toastr.error('Something is wrong', '')
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
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          this.toastr.error('Wrong password', '');
        } else if (error.code === 'auth/user-not-found') {
          this.toastr.error('Wrong email', '');
        }
        console.log('Something went wrong:', error.message);
        console.log('Error code:', error.code);
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
