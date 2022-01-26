import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUsersGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userData.pipe(
      take(1),
      map(user => user && user.uid ? this.router.createUrlTree(['/']) : true)
    );
  }
}