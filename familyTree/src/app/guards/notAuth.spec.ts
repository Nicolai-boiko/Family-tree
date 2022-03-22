import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../constants/Interfaces/common.interfaces';
import { authFeature } from '../store/reducers/auth-state.reducer';
import { notAuthGuard } from './notAuth.guard';

class MockRouter {
  createUrlTree() {}
}

class MockStore {
  IsInitializing$ = new BehaviorSubject(false);
  storeUser$: Observable<IUser> = new BehaviorSubject({} as IUser);
  select(selector: any) {
    switch (selector) {
      case authFeature.selectIsInitializing:
        return this.IsInitializing$;
      case authFeature.selectUser:
        return this.storeUser$;
      default:
        return;
    }
  }
}

describe('notAuthGuard', () => {
  let guard: notAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Store, useClass: MockStore },
      ]});
    guard = TestBed.inject(notAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
