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
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';

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
  success = createSpy();
  error = createSpy();
}

class MockRouter {
  navigate = createSpy();
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

const mockIUser: IUser = { id: 'mockId', firstName: 'dummyName' } as IUser;
const mockData: firebase.auth.UserCredential = { user: { uid: 'mockUID' } } as firebase.auth.UserCredential;
const mockUserCollection: IUser = { uid: 'mockId', firstName: 'dummyName' };
const mockFile = new File(['dummyData'], 'dummyFile');
let mockTaskSnapshot: firebase.storage.UploadTaskSnapshot = { state: 'dummyState', ref: { fullPath: 'dummyRef' } } as firebase.storage.UploadTaskSnapshot;

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: ReplaySubject<any>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let store: Store;
  let router: Router;

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
    router = TestBed.inject(Router);
    actions$ = new ReplaySubject<any>(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('signUpWithEmail$', () => {
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
        expect(result).toEqual(CoreActions.signUpWithEmailError({ error: { error: 'dummyError' } as any }));
        done();
      });
    });
  });

  describe('signUpWithEmailSuccess$', () => {
    beforeEach(() => {
      authService.createCollection = createSpy().and.returnValue(of({}));
    });

    it('should call createCollection with proper user and data', (done: DoneFn) => {
      actions$.next(CoreActions.signUpWithEmailSuccess({ user: mockIUser, data: mockData }));
      effects.signUpWithEmailSuccess$.subscribe(() => {
        expect(authService.createCollection).toHaveBeenCalledWith(mockIUser, mockData);
        done();
      });
    });

    it('should navigate to RoutesEnum.HOME and toast success', (done: DoneFn) => {
      actions$.next(CoreActions.signUpWithEmailSuccess({ user: mockIUser, data: mockData }));
      effects.signUpWithEmailSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/', RoutesEnum.HOME]);
        expect(toastrService.success).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('signUpWithEmailError$', () => {
    it('should toast error', (done: DoneFn) => {
      actions$.next(CoreActions.signUpWithEmailError({ error: { error: 'dummyError' } } as any));
      effects.signUpWithEmailError$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('signInWithEmail$', () => {
    beforeEach(() => {
      authService.signIn = createSpy().and.returnValue(of(mockData));
      // spyOn(authService, 'signUp').and.returnValue(of(mockData));
    });

    it('should call signIn with proper user', (done: DoneFn) => {
      actions$.next(CoreActions.signInWithEmail({ user: mockIUser }));
      effects.signInWithEmail$.subscribe(() => {
        expect(authService.signIn).toHaveBeenCalledWith(mockIUser);
        done();
      });
    });

    it('should return CoreActions.signInWithEmailSuccess if succeeded', (done: DoneFn) => {
      actions$.next(CoreActions.signInWithEmail({ user: mockIUser }));
      effects.signInWithEmail$.subscribe(result => {
        expect(result).toEqual(CoreActions.signInWithEmailSuccess());
        done();
      });
    });

    it('should return CoreActions.signInWithEmailError if failed', (done: DoneFn) => {
      authService.signIn = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
      actions$.next(CoreActions.signInWithEmail({ user: mockIUser }));
      effects.signInWithEmail$.subscribe(result => {
        expect(result).toEqual(CoreActions.signInWithEmailError({ error: { error: 'dummyError' } as any }));
        done();
      });
    });
  });

  describe('signInWithEmailSuccess$', () => {
    it('should navigate to RoutesEnum.HOME and toast success', (done: DoneFn) => {
      actions$.next(CoreActions.signInWithEmailSuccess());
      effects.signInWithEmailSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/', RoutesEnum.TREE]);
        expect(toastrService.success).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('signInWithEmailError$', () => {
    it('should toast error', (done: DoneFn) => {
      actions$.next(CoreActions.signInWithEmailError({ error: { error: 'dummyError' } } as any));
      effects.signInWithEmailError$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('logoutStart$', () => {
    beforeEach(() => {
      authService.signOut = createSpy().and.returnValue(of({}));
    });

    it('should call signOut', (done: DoneFn) => {
      actions$.next(CoreActions.logoutStart());
      effects.logoutStart$.subscribe(() => {
        expect(authService.signOut).toHaveBeenCalled();
        done();
      });
    });

    it('should return CoreActions.logoutEnd', (done: DoneFn) => {
      actions$.next(CoreActions.logoutStart());
      effects.logoutStart$.subscribe(result => {
        expect(result).toEqual(CoreActions.logoutEnd());
        done();
      });
    });
  });

  describe('logoutEnd$', () => {
    it('should navigate to RoutesEnum.HOME and toast success', (done: DoneFn) => {
      actions$.next(CoreActions.logoutEnd());
      effects.logoutEnd$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/', RoutesEnum.HOME]);
        expect(toastrService.success).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('sendPasswordResetEmail$', () => {
    const mockEmail = 'dummyEmail';
    beforeEach(() => {
      authService.resetPassword = createSpy().and.returnValue(of({}));
    });

    it('should call resetPassword with proper user', (done: DoneFn) => {
      actions$.next(CoreActions.sendPasswordResetEmail({ email: mockEmail }));
      effects.sendPasswordResetEmail$.subscribe(() => {
        expect(authService.resetPassword).toHaveBeenCalledWith(mockEmail);
        done();
      });
    });

    it('should return CoreActions.sendPasswordResetEmailSuccess if succeeded', (done: DoneFn) => {
      actions$.next(CoreActions.sendPasswordResetEmail({ email: mockEmail }));
      effects.sendPasswordResetEmail$.subscribe(result => {
        expect(result).toEqual(CoreActions.sendPasswordResetEmailSuccess());
        done();
      });
    });

    it('should return CoreActions.sendPasswordResetEmailError if failed', (done: DoneFn) => {
      authService.resetPassword = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
      actions$.next(CoreActions.sendPasswordResetEmail({ email: mockEmail }));
      effects.sendPasswordResetEmail$.subscribe(result => {
        expect(result).toEqual(CoreActions.sendPasswordResetEmailError({ error: { error: 'dummyError' } as any }));
        done();
      });
    });
  });

  describe('sendPasswordResetEmailSuccess$', () => {
    it('should toast success', (done: DoneFn) => {
      actions$.next(CoreActions.sendPasswordResetEmailSuccess());
      effects.sendPasswordResetEmailSuccess$.subscribe(() => {
        expect(toastrService.success).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('sendPasswordResetEmailError$', () => {
    it('should toast error', (done: DoneFn) => {
      actions$.next(CoreActions.sendPasswordResetEmailError({ error: { error: 'dummyError' } } as any));
      effects.sendPasswordResetEmailError$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getUserCollection$', () => {
    const mockUserUID = 'dummyUID';

    beforeEach(() => {
      authService.getCollection = createSpy().and.returnValue(of(mockUserCollection));
    });

    it('should call getCollection with proper userUID', (done: DoneFn) => {
      actions$.next(CoreActions.getUserCollection({ userUID: mockUserUID }));
      effects.getUserCollection$.subscribe(() => {
        expect(authService.getCollection).toHaveBeenCalledWith(mockUserUID);
        done();
      });
    });

    it('should return CoreActions.getUserCollectionSuccess if succeeded', (done: DoneFn) => {
      actions$.next(CoreActions.getUserCollection({ userUID: mockUserUID }));
      effects.getUserCollection$.subscribe(result => {
        expect(result).toEqual(CoreActions.getUserCollectionSuccess({ userCollection: mockUserCollection }));
        done();
      });
    });

    it('should return CoreActions.getUserCollectionError if failed', (done: DoneFn) => {
      authService.getCollection = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
      actions$.next(CoreActions.getUserCollection({ userUID: mockUserUID }));
      effects.getUserCollection$.subscribe(result => {
        expect(result).toEqual(CoreActions.getUserCollectionError({ error: { error: 'dummyError' } as any }));
        done();
      });
    });
  });

  describe('getUserCollectionError$', () => {
    it('should toast error', (done: DoneFn) => {
      actions$.next(CoreActions.getUserCollectionError({ error: { error: 'dummyError' } } as any));
      effects.getUserCollectionError$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('updateUserCollection$', () => {
    beforeEach(() => {
      authService.updateCollection = createSpy().and.returnValue(of({}));
    });

    // ToDo should test case if selectUserUId returns null

    it('should call updateCollection with proper user', (done: DoneFn) => {
      actions$.next(CoreActions.updateUserCollection({ user: mockIUser }));
      effects.updateUserCollection$.subscribe(() => {
        expect(authService.updateCollection).toHaveBeenCalledWith(mockIUser, 'dummyUID');
        done();
      });
    });

    it('should return CoreActions.updateUserCollectionSuccess if succeeded', (done: DoneFn) => {
      actions$.next(CoreActions.updateUserCollection({ user: mockIUser }));
      effects.updateUserCollection$.subscribe(result => {
        expect(result).toEqual(CoreActions.updateUserCollectionSuccess({ userUID: 'dummyUID' }));
        done();
      });
    });

    it('should return CoreActions.updateUserCollectionError if failed', (done: DoneFn) => {
      authService.updateCollection = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
      actions$.next(CoreActions.updateUserCollection({ user: mockIUser }));
      effects.updateUserCollection$.subscribe(result => {
        expect(result).toEqual(CoreActions.updateUserCollectionError({ error: { error: 'dummyError' } as any }));
        done();
      });
    });
  });

  describe('updateUserCollectionSuccess$', () => {
    it('should return CoreActions.getUserCollection with proper userUID and toast success', (done: DoneFn) => {
      actions$.next(CoreActions.updateUserCollectionSuccess({ userUID: 'dummyUID' }));
      effects.updateUserCollectionSuccess$.subscribe(result => {
        expect(toastrService.success).toHaveBeenCalled();
        expect(result).toEqual(CoreActions.getUserCollection({ userUID: 'dummyUID' }));
        done();
      });
    });
  });

  describe('updateUserCollectionError$', () => {
    it('should toast error', (done: DoneFn) => {
      actions$.next(CoreActions.updateUserCollectionError({ error: { error: 'dummyError' } } as any));
      effects.updateUserCollectionError$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('uploadUserPhoto$', () => {
    let getActionFromUploadTaskSnapshotSpy: Spy;

    beforeEach(() => {
      authService.uploadUserPhoto = createSpy().and.returnValue(of(mockTaskSnapshot));
      getActionFromUploadTaskSnapshotSpy = spyOn<any>(effects, 'getActionFromUploadTaskSnapshot');
    });

    it('should call uploadUserPhoto with proper data', (done: DoneFn) => {
      actions$.next(CoreActions.uploadUserPhoto({ file: mockFile }));
      effects.uploadUserPhoto$.subscribe(() => {
        expect(authService.uploadUserPhoto).toHaveBeenCalledWith(mockFile, 'dummyUID');
        done();
      });
    });

    it('should call getActionFromUploadTaskSnapshot with proper data', (done: DoneFn) => {
      actions$.next(CoreActions.uploadUserPhoto({ file: mockFile }));
      effects.uploadUserPhoto$.subscribe(() => {
        expect(effects['getActionFromUploadTaskSnapshot']).toHaveBeenCalledWith(mockTaskSnapshot);
        done();
      });
    });

    it('should return uploadUserPhotoError with proper data if failed', (done: DoneFn) => {
      authService.uploadUserPhoto = createSpy().and.returnValue(throwError({ error: 'dummyError' }));
      actions$.next(CoreActions.uploadUserPhoto({ file: mockFile }));
      effects.uploadUserPhoto$.subscribe(result => {
        expect(result).toEqual(CoreActions.uploadUserPhotoError({ error: { error: 'dummyError' } as any }));
        done();
      });
    });
  });

  describe('uploadUserPhotoSuccess$', () => {
    const mockDownloadURL = 'mockDownloadURL';

    beforeEach(() => {
      authService.getPhotoURL = createSpy().and.returnValue(of(mockDownloadURL));
    });

    it('should call getPhotoURL', (done: DoneFn) => {
      actions$.next(CoreActions.uploadUserPhotoSuccess({ taskRef: 'dummyRef' }));
      effects.uploadUserPhotoSuccess$.subscribe(() => {
        expect(authService.getPhotoURL).toHaveBeenCalledWith('dummyRef');
        done();
      });
    });

    it('should return CoreActions.writeFromFirebaseInUserPhotoURL with proper URL and toast success', (done: DoneFn) => {
      actions$.next(CoreActions.uploadUserPhotoSuccess({ taskRef: 'dummyRef' }));
      effects.uploadUserPhotoSuccess$.subscribe(result => {
        expect(toastrService.success).toHaveBeenCalledWith('New photo has uploaded');
        expect(result).toEqual(CoreActions.writeFromFirebaseInUserPhotoURL({ downloadURL: mockDownloadURL }));
        done();
      });
    });
  });

  describe('updateUserCollectionError$', () => {
    it('should toast error', (done: DoneFn) => {
      actions$.next(CoreActions.updateUserCollectionError({ error: { error: 'dummyError' } } as any));
      effects.updateUserCollectionError$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getActionFromUploadTaskSnapshot$', () => {
    it('should return needed action in set case', () => {
      mockTaskSnapshot = { state: 'running', bytesTransferred: 50, totalBytes: 100 } as firebase.storage.UploadTaskSnapshot;
      const { bytesTransferred: loaded, totalBytes: total } = mockTaskSnapshot;
      expect(effects['getActionFromUploadTaskSnapshot'](mockTaskSnapshot)).toEqual(CoreActions.uploadUserPhotoProgress({ loadProgress: Math.round(loaded / total * 100) }));

      mockTaskSnapshot = { state: 'success', ref: { fullPath: 'dummyRef' } } as firebase.storage.UploadTaskSnapshot;
      expect(effects['getActionFromUploadTaskSnapshot'](mockTaskSnapshot)).toEqual(CoreActions.uploadUserPhotoSuccess({ taskRef: mockTaskSnapshot.ref.fullPath }));

      mockTaskSnapshot = { state: 'dummyState' } as firebase.storage.UploadTaskSnapshot;
      expect(effects['getActionFromUploadTaskSnapshot'](mockTaskSnapshot)).toEqual(CoreActions.uploadUserPhotoError({ error: { message: "Photo doesn't updated", code: '' } }));
    });
  });
});
