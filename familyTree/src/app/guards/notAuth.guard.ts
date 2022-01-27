import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, map, tap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class notAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isUserLogged$.pipe(
      take(1),
      map((isLogged: boolean) => isLogged ? this.router.createUrlTree(['/']) : true),
      tap(() => console.log(this.authService.isUserLogged.getValue())),
    );
  }
}
