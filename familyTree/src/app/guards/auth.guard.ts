import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { RoutesEnum } from '../constants/Enums/common.enums';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/state/auth.state';
import { authFeature } from '../store/reducers/auth-state.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<IAuthState>,
  ) {}
  
  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(authFeature.selectIsInitializing).pipe(
      filter((isInit) => !isInit),
      switchMap(() =>  this.store.select(authFeature.selectUser).pipe(
          map((user) =>  user ? true : this.router.createUrlTree(['/', RoutesEnum.LOG_IN])),
        ))
    );
  }
}
