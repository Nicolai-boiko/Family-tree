import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RoutesEnum } from '../constants/Enums/common.enums';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class notAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
  ) {}
  
  canActivate(): Observable<boolean | UrlTree> {
    return this.angularFireAuth.authState.pipe(
      map((user) => user && user.uid ? this.router.createUrlTree(['/', RoutesEnum.HOME]) : true),
    );
  }
}
