import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeature, selectUserUID } from '../../store/reducers/auth-state.reducer';
import { CoreActions } from '../../store/actions/auth-state.actions';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

class MockAuthService {
  signUp() { return of(); }
  signIn() { return of(); }
  signOut() { }
  createCollection() { }
  updateCollection() { }
  getCollection() { return of(); }
  resetPassword() { return of(); }
  uploadUserPhoto() { return of(); }
  getPhotoURL() { return of(); }
}

class MockToastrService {
  success() { }
  error() { }
}

class MockRouter {
  navigate() { }
}

class MockStore {
  selectUserUID$ = new BehaviorSubject('dummyUID');
  dispatch = createSpy();
  select(selector: any) {
    switch (selector) {
      case selectUserUID:
        return this.selectUserUID$;
      default:
        return;
    }
  }
}

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let store: Store;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        { provide: Store, useClass: MockStore },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    });
    
    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});
