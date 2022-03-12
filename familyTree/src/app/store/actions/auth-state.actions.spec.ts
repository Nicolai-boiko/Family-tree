import { AuthStateActionsEnum, CoreActions } from './auth-state.actions';
import firebase from "firebase/compat";
import { IUser, FirebaseError } from "src/app/constants/Interfaces/common.interfaces";

describe('auth-state.actions', () => {
  describe('signUpWithEmail', () => {
    it('should create signUpWithEmail action type', () => {
      const action = CoreActions.signUpWithEmail;

      expect(action.type).toEqual(AuthStateActionsEnum.SignUpWithEmail);
    });

    it('should has passed props', () => {
      const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' } as IUser;
      const action = CoreActions.signUpWithEmail({ user: mockIUser });

      expect(action.user).toEqual(mockIUser);
    });
  });

  describe('signUpWithEmailSuccess', () => {
    it('should create signUpWithEmailSuccess action type', () => {
      const action = CoreActions.signUpWithEmailSuccess;

      expect(action.type).toEqual(AuthStateActionsEnum.SignUpWithEmailSuccess);
    });

    it('should has passed props', () => {
      const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' } as IUser;
      const mockIData: firebase.auth.UserCredential = { email: 'dummyEmail', firstName: 'dummyName' } as unknown as firebase.auth.UserCredential;
      const action = CoreActions.signUpWithEmailSuccess({ user: mockIUser, data: mockIData });

      expect(action.user).toEqual(mockIUser);
      expect(action.data).toEqual(mockIData);
    });
  });

  describe('signUpWithEmailError', () => {
    it('should create signUpWithEmailError action type', () => {
      const action = CoreActions.signUpWithEmailError;

      expect(action.type).toEqual(AuthStateActionsEnum.SignUpWithEmailError);
    });

    it('should has passed props', () => {
      const MockError: FirebaseError = { code: 'dummyEmail', message: 'dummyName' } as FirebaseError;
      const action = CoreActions.signUpWithEmailError({ error: MockError });

      expect(action.error).toEqual(MockError);
    });
  });

  describe('signInWithEmail', () => {
    it('should create signInWithEmail action type', () => {
      const action = CoreActions.signInWithEmail;

      expect(action.type).toEqual(AuthStateActionsEnum.SignInWithEmail);
    });

    it('should has passed props', () => {
      const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' } as IUser;
      const action = CoreActions.signInWithEmail({ user: mockIUser });

      expect(action.user).toEqual(mockIUser);
    });
  });

  describe('signInWithEmailSuccess', () => {
    it('should create signInWithEmailSuccess action type', () => {
      const action = CoreActions.signInWithEmailSuccess;

      expect(action.type).toEqual(AuthStateActionsEnum.SignInWithEmailSuccess);
    });
  });

  describe('signInWithEmailError', () => {
    it('should create signInWithEmailError action type', () => {
      const action = CoreActions.signInWithEmailError;

      expect(action.type).toEqual(AuthStateActionsEnum.SignInWithEmailError);
    });

    it('should has passed props', () => {
      const MockError: FirebaseError = { code: 'dummyEmail', message: 'dummyName' } as FirebaseError;
      const action = CoreActions.signInWithEmailError({ error: MockError });

      expect(action.error).toEqual(MockError);
    });
  });

  describe('logoutStart', () => {
    it('should create logoutStart action type', () => {
      const action = CoreActions.logoutStart;

      expect(action.type).toEqual(AuthStateActionsEnum.LogoutStart);
    });
  });

  describe('logoutEnd', () => {
    it('should create logoutEnd action type', () => {
      const action = CoreActions.logoutEnd;

      expect(action.type).toEqual(AuthStateActionsEnum.LogoutEnd);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should create sendPasswordResetEmail action type', () => {
      const action = CoreActions.sendPasswordResetEmail;

      expect(action.type).toEqual(AuthStateActionsEnum.SendPasswordResetEmail);
    });

    it('should has passed props', () => {
      const MockEmail: string = 'dummyEmail';
      const action = CoreActions.sendPasswordResetEmail({ email: MockEmail });

      expect(action.email).toEqual(MockEmail);
    });
  });

  describe('sendPasswordResetEmailSuccess', () => {
    it('should create sendPasswordResetEmailSuccess action type', () => {
      const action = CoreActions.sendPasswordResetEmailSuccess;

      expect(action.type).toEqual(AuthStateActionsEnum.SendPasswordResetEmailSuccess);
    });
  });

  describe('sendPasswordResetEmailError', () => {
    it('should create sendPasswordResetEmailError action type', () => {
      const action = CoreActions.sendPasswordResetEmailError;

      expect(action.type).toEqual(AuthStateActionsEnum.SendPasswordResetEmailError);
    });

    it('should has passed props', () => {
      const MockError: FirebaseError = { code: 'dummyEmail', message: 'dummyName' } as FirebaseError;
      const action = CoreActions.sendPasswordResetEmailError({ error: MockError });

      expect(action.error).toEqual(MockError);
    });
  });

  describe('userIsLoggedIn', () => {
    it('should create userIsLoggedIn action type', () => {
      const action = CoreActions.userIsLoggedIn;

      expect(action.type).toEqual(AuthStateActionsEnum.UserIsLoggedIn);
    });

    it('should has passed props', () => {
      const mockUser: firebase.User = { email: 'dummyEmail', firstName: 'dummyName' } as unknown as firebase.User;
      const action = CoreActions.userIsLoggedIn({ data: mockUser });

      expect(action.data).toEqual(mockUser);
    });
  });

  describe('userIsLoggedOut', () => {
    it('should create userIsLoggedOut action type', () => {
      const action = CoreActions.userIsLoggedOut;

      expect(action.type).toEqual(AuthStateActionsEnum.UserIsLoggedOut);
    });
  });

  describe('getUserCollection', () => {
    it('should create getUserCollection action type', () => {
      const action = CoreActions.getUserCollection;

      expect(action.type).toEqual(AuthStateActionsEnum.GetUserCollection);
    });

    it('should has passed props', () => {
      const MockUserUID: string = 'dummyUserUID';
      const action = CoreActions.getUserCollection({ userUID: MockUserUID });

      expect(action.userUID).toEqual(MockUserUID);
    });
  });

  describe('getUserCollectionSuccess', () => {
    it('should create getUserCollectionSuccess action type', () => {
      const action = CoreActions.getUserCollectionSuccess;

      expect(action.type).toEqual(AuthStateActionsEnum.GetUserCollectionSuccess);
    });

    it('should has passed props', () => {
      const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' } as IUser;
      const action = CoreActions.getUserCollectionSuccess({ userCollection: mockIUser });

      expect(action.userCollection).toEqual(mockIUser);
    });
  });

  describe('getUserCollectionError', () => {
    it('should create getUserCollectionError action type', () => {
      const action = CoreActions.getUserCollectionError;

      expect(action.type).toEqual(AuthStateActionsEnum.GetUserCollectionError);
    });

    it('should has passed props', () => {
      const MockError: FirebaseError = { code: 'dummyEmail', message: 'dummyName' } as FirebaseError;
      const action = CoreActions.getUserCollectionError({ error: MockError });

      expect(action.error).toEqual(MockError);
    });
  });

  describe('updateUserCollection', () => {
    it('should create updateUserCollection action type', () => {
      const action = CoreActions.updateUserCollection;

      expect(action.type).toEqual(AuthStateActionsEnum.UpdateUserCollection);
    });

    it('should has passed props', () => {
      const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' } as IUser;
      const action = CoreActions.updateUserCollection({ user: mockIUser });

      expect(action.user).toEqual(mockIUser);
    });
  });

  describe('updateUserCollectionSuccess', () => {
    it('should create updateUserCollectionSuccess action type', () => {
      const action = CoreActions.updateUserCollectionSuccess;

      expect(action.type).toEqual(AuthStateActionsEnum.UpdateUserCollectionSuccess);
    });

    it('should has passed props', () => {
      const MockUserUID: string = 'dummyUserUID';
      const action = CoreActions.updateUserCollectionSuccess({ userUID: MockUserUID });

      expect(action.userUID).toEqual(MockUserUID);
    });
  });

  describe('updateUserCollectionError', () => {
    it('should create updateUserCollectionError action type', () => {
      const action = CoreActions.updateUserCollectionError;

      expect(action.type).toEqual(AuthStateActionsEnum.UpdateUserCollectionError);
    });

    it('should has passed props', () => {
      const MockError: FirebaseError = { code: 'dummyEmail', message: 'dummyName' } as FirebaseError;
      const action = CoreActions.updateUserCollectionError({ error: MockError });

      expect(action.error).toEqual(MockError);
    });
  });

  describe('uploadUserPhoto', () => {
    it('should create uploadUserPhoto action type', () => {
      const action = CoreActions.uploadUserPhoto;

      expect(action.type).toEqual(AuthStateActionsEnum.UploadUserPhoto);
    });

    it('should has passed props', () => {
      const MockFile: File = { size: 5 } as File;
      const action = CoreActions.uploadUserPhoto({ file: MockFile });

      expect(action.file).toEqual(MockFile);
    });
  });

  describe('uploadUserPhotoProgress', () => {
    it('should create uploadUserPhotoProgress action type', () => {
      const action = CoreActions.uploadUserPhotoProgress;

      expect(action.type).toEqual(AuthStateActionsEnum.UploadUserPhotoProgress);
    });

    it('should has passed props', () => {
      const MockLoadProgress: number = 10;
      const action = CoreActions.uploadUserPhotoProgress({ loadProgress: MockLoadProgress });

      expect(action.loadProgress).toEqual(MockLoadProgress);
    });
  });

  describe('uploadUserPhotoSuccess', () => {
    it('should create uploadUserPhotoSuccess action type', () => {
      const action = CoreActions.uploadUserPhotoSuccess;

      expect(action.type).toEqual(AuthStateActionsEnum.UploadUserPhotoSuccess);
    });

    it('should has passed props', () => {
      const MockTaskRef: string = 'dummyUserUID';
      const action = CoreActions.uploadUserPhotoSuccess({ taskRef: MockTaskRef });

      expect(action.taskRef).toEqual(MockTaskRef);
    });
  });

  describe('uploadUserPhotoError', () => {
    it('should create uploadUserPhotoError action type', () => {
      const action = CoreActions.uploadUserPhotoError;

      expect(action.type).toEqual(AuthStateActionsEnum.UploadUserPhotoError);
    });

    it('should has passed props', () => {
      const MockError: FirebaseError = { code: 'dummyEmail', message: 'dummyName' } as FirebaseError;
      const action = CoreActions.uploadUserPhotoError({ error: MockError });

      expect(action.error).toEqual(MockError);
    });
  });

  describe('writeFromFirebaseInUserPhotoURL', () => {
    it('should create writeFromFirebaseInUserPhotoURL action type', () => {
      const action = CoreActions.writeFromFirebaseInUserPhotoURL;

      expect(action.type).toEqual(AuthStateActionsEnum.WriteFromFirebaseInUserPhotoURL);
    });

    it('should has passed props', () => {
      const MockDownloadURL: string = 'dummyUserUID';
      const action = CoreActions.writeFromFirebaseInUserPhotoURL({ downloadURL: MockDownloadURL });

      expect(action.downloadURL).toEqual(MockDownloadURL);
    });
  });

  describe('clearPhotoUserURL', () => {
    it('should create clearPhotoUserURL action type', () => {
      const action = CoreActions.clearPhotoUserURL;

      expect(action.type).toEqual(AuthStateActionsEnum.ClearPhotoUserURL);
    });
  });

});
