import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, of, ReplaySubject, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectUserUID } from '../../store/reducers/auth-state.reducer';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { CoreActions } from '../actions/auth-state.actions';
import { IUser } from '../../constants/Interfaces/common.interfaces';
import firebase from 'firebase/compat';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

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
  let actions$: ReplaySubject<any>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
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
    actions$ = new ReplaySubject<any>(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  
  describe('signUpWithEmail$', () => {
    const mockIUser: IUser = { id: 'mockId', firstName: 'dummyName' } as IUser;
    const mockData: firebase.auth.UserCredential = { user: { uid: 'mockUID' } } as firebase.auth.UserCredential;
    
    beforeEach(() => {
      authService.signUp = createSpy().and.returnValue(of(mockData));
      // spyOn(authService, 'signUp').and.returnValue(of(mockData));
    });
    
    it('should call signUp with proper user', (done: DoneFn) => {
      actions$.next(CoreActions.signUpWithEmail({ user: mockIUser }));
      effects.signUpWithEmail$.subscribe(() => {
        expect(authService.signUp).toHaveBeenCalledWith(mockIUser);
        done();
      });
    });
    
    it('should return CoreActions.signUpWithEmailSuccess if succeeded', (done: DoneFn) => {
      actions$.next(CoreActions.signUpWithEmail({ user: mockIUser }));
      effects.signUpWithEmail$.subscribe(result => {
        expect(result).toEqual(CoreActions.signUpWithEmailSuccess({ user: mockIUser, data: mockData }));
        done();
      });
    });
    
    it('should return CoreActions.signUpWithEmailError if failed', (done: DoneFn) => {
      authService.signUp = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
      actions$.next(CoreActions.signUpWithEmail({ user: mockIUser }));
      effects.signUpWithEmail$.subscribe(result => {
        expect(result).toEqual(CoreActions.signUpWithEmailError({ error : { error: 'dummyError' } as any }));
        done();
      });
    });
  });
  
  describe('uploadUserPhoto$', () => {
    const mockFile = new File(['dummyData'], 'dummyFile');
    const mockData: firebase.storage.UploadTaskSnapshot = { state: 'dummyState' } as firebase.storage.UploadTaskSnapshot;
    let getActionFromUploadTaskSnapshotSpy: Spy;
    
    beforeEach(() => {
      authService.uploadUserPhoto = createSpy().and.returnValue(of(mockData));
      getActionFromUploadTaskSnapshotSpy = spyOn<any>(effects, 'getActionFromUploadTaskSnapshot');
      // effects['getActionFromUploadTaskSnapshot'] = createSpy();
    });
    
    it('should call uploadUserPhoto with proper data', (done: DoneFn) => {
      actions$.next(CoreActions.uploadUserPhoto({ file: mockFile }));
      effects.uploadUserPhoto$.subscribe(() => {
        expect(authService.uploadUserPhoto).toHaveBeenCalledWith(mockFile, 'dummyUID');
        done();
      });
    });
    
    // xit('should return CoreActions.signUpWithEmailSuccess if succeeded', (done: DoneFn) => {
    //   actions$.next(CoreActions.signUpWithEmail({ user: mockIUser }));
    //   effects.signUpWithEmail$.subscribe(result => {
    //     expect(result).toEqual(CoreActions.signUpWithEmailSuccess({ user: mockIUser, data: mockData }));
    //     done();
    //   });
    // });
    //
    // xit('should return CoreActions.signUpWithEmailError if failed', (done: DoneFn) => {
    //   authService.signUp = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
    //   actions$.next(CoreActions.signUpWithEmail({ user: mockIUser }));
    //   effects.signUpWithEmail$.subscribe(result => {
    //     expect(result).toEqual(CoreActions.signUpWithEmailError({ error : { error: 'dummyError' } as any }));
    //     done();
    //   });
    // });
  });
});
