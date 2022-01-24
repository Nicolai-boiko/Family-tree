import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLoggedIn: boolean = false;
  constructor(private authenticationService: AuthService, private router: Router){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.authenticationService.userData.subscribe(res => {
      if (res && res.uid) {
        this.isLoggedIn = true;
      } 
    })
    if (this.isLoggedIn === false) {
      this.router.navigate([''])
    }
    return this.isLoggedIn;
  }
}
