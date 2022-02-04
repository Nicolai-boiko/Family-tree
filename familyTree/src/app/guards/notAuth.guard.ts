import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, map} from 'rxjs';
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
    return this.authService.userData$.pipe(
      map((user) => user && user.uid ? this.router.createUrlTree(['/']) : true),
    );
  }
}
