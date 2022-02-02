import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RoutesEnum } from '../constants/Enums/common.enums';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userData.pipe(
      map((user) => user && user.uid ? true : this.router.createUrlTree(['/', RoutesEnum.LOG_IN])),
    );
  }
}
