import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {
  private isLoggedOut: boolean = false;
  constructor(private authenticationService: AuthService, private router: Router){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.authenticationService.userData.subscribe(res => {
        if (!res) {
          this.isLoggedOut = true;
        } 
      })
      if (this.isLoggedOut === false) {
        this.router.navigate([''])
      }
      return this.isLoggedOut;
  }
  
}
