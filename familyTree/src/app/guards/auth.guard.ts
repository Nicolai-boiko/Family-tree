import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RoutesEnum } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isUserLogged$.pipe(
      map((isLogged: boolean) => isLogged ? true : this.router.createUrlTree(['/', RoutesEnum.LOG_IN])),
    );
  }
}
