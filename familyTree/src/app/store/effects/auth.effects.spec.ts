import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

class MockAuthService {
  signUp() { return of(); }
}

class MockStore {

}

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: AuthService;
  let toastService: ToastrService;
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useClass: MockStore },
      ],
    });
    
    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
  });
});
