import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RoutesEnum } from '../constants/Enums/common.enums';
import { IAuthState } from '../store/state/auth.state';
import { Store } from '@ngrx/store';
import { authFeature } from '../store/reducers/auth-state.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store<IAuthState>,
    private router: Router,
  ) {}
  
  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(authFeature.selectUser).pipe(
      map(user => !!user ? true : this.router.createUrlTree(['/', RoutesEnum.LOG_IN])),
    );
  }
}
