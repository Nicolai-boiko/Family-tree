import { CoreActions } from '../actions/auth-state.actions';
import { authFeature, selectUserPhotoURL, selectUserUID } from './auth-state.reducer';
import { IAuthState, UploadStatus } from '../state/auth.state';
import { GenderEnum } from 'src/app/constants/Enums/common.enums';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import firebase from 'firebase/compat';

const mockIUser: IUser = {
    firstName: 'dummyFirstName',
    secondName: 'dummySecondName',
    photoUrl: 'dummyPhotoUrl',
    uid: 'dummyUID',
    email: 'dummyEmail',
    password: 'dummyPassword',
    thirdName: 'dummyFirstName',
    gender: GenderEnum.MALE,
    id: 'dummyFirstName',
    registrationDate: 'dummyFirstName',
    country: 'dummyFirstName',
    city: 'dummyFirstName',
    postcode: 'dummyFirstName',
    birthday: 'dummyFirstName',
    telephone: 'dummyFirstName',
};

const initialMockAuthState: IAuthState = {
    user: null,
    errorMessage: null,
    infoMessage: null,
    isLoading: false,
    isEmailSend: false,
    isInitializing: true,
    progressStatus: UploadStatus.Ready,
    loadProgress: 0,
};

const mockFile = new File(['dummyData'], 'dummyFile');

describe('auth-state.reducer', () => {
    describe('reducer', () => {
        describe('unknown action', () => {
            it('should return the default state', () => {
                const action = {
                    type: 'Unknown',
                };
                const state = authFeature.reducer(initialMockAuthState, action);
                expect(state).toBe(initialMockAuthState);
            });
        });

        describe('signUpWithEmail', () => {
            it('should reset state of messages, start loading and set email send to false', () => {
                const action = CoreActions.signUpWithEmail({ user: mockIUser });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: true,
                    errorMessage: null,
                    infoMessage: null,
                    isEmailSend: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('sendPasswordResetEmail', () => {
            it('should reset state of messages, start loading and set email send to false', () => {
                const action = CoreActions.signUpWithEmail({ user: mockIUser });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: true,
                    errorMessage: null,
                    infoMessage: null,
                    isEmailSend: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });
        
        describe('getUserCollection', () => {
            it('should reset state of messages, start loading and set email send to false', () => {
                const action = CoreActions.getUserCollection({ userUID: 'dummyUID' });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: true,
                    errorMessage: null,
                    infoMessage: null,
                    isEmailSend: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });
        
        describe('updateUserCollection', () => {
            it('should reset state of messages, start loading and set email send to false', () => {
                const action = CoreActions.updateUserCollection({ user: mockIUser });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: true,
                    errorMessage: null,
                    infoMessage: null,
                    isEmailSend: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });
        
        describe('logoutStart', () => {
            it('should reset state of messages, start loading and set email send to false', () => {
                const action = CoreActions.logoutStart();
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: true,
                    errorMessage: null,
                    infoMessage: null,
                    isEmailSend: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('signUpWithEmailSuccess', () => {
            it('should set isLoading to false', () => {
                const action = CoreActions.signUpWithEmailSuccess({ user: mockIUser, data: mockIUser as firebase.auth.UserCredential });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('signInWithEmailSuccess', () => {
            it('should set isLoading to false', () => {
                const action = CoreActions.signInWithEmailSuccess();
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('updateUserCollectionSuccess', () => {
            it('should set isLoading to false', () => {
                const action = CoreActions.updateUserCollectionSuccess({ userUID: 'dummyUID' });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('signUpWithEmailError', () => {
            it('should user to null, isLoading to false, update errorMessage', () => {
                const action = CoreActions.signUpWithEmailError({ error: { name: 'dummyErrorName', code: 'dummyErrorCode' } });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: null,
                    isLoading: false,
                    errorMessage: { name: 'dummyErrorName', code: 'dummyErrorCode' },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('signInWithEmailError', () => {
            it('should user to null, isLoading to false, update errorMessage', () => {
                const action = CoreActions.signInWithEmailError({ error: { name: 'dummyErrorName', code: 'dummyErrorCode' } });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: null,
                    isLoading: false,
                    errorMessage: { name: 'dummyErrorName', code: 'dummyErrorCode' },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('signInWithEmail', () => {
            it('should reset state of messages, start loading to true and set email send to false and update user', () => {
                const action = CoreActions.signInWithEmail({ user: mockIUser });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: {
                        ...initialMockAuthState.user,
                        email: 'dummyEmail',
                        password: null,
                    },
                    isLoading: true,
                    errorMessage: null,
                    infoMessage: null,
                    isEmailSend: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('logoutEnd', () => {
            it('should reset state of user, isLoading, isInitializing', () => {
                const action = CoreActions.logoutEnd();
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: null,
                    isLoading: false,
                    isInitializing: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('userIsLoggedOut', () => {
            it('should set state of isInitializing to false', () => {
                const action = CoreActions.userIsLoggedOut();
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isInitializing: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('sendPasswordResetEmailSuccess', () => {
            it('should set state of isLoading to false and isEmailSend to true', () => {
                const action = CoreActions.sendPasswordResetEmailSuccess();
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: false,
                    isEmailSend: true,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('sendPasswordResetEmailError', () => {
            it('should set isLoading to false, update errorMessage', () => {
                const action = CoreActions.sendPasswordResetEmailError({ error: { name: 'dummyErrorName', code: 'dummyErrorCode' } });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: false,
                    errorMessage: { name: 'dummyErrorName', code: 'dummyErrorCode' },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('updateUserCollectionError', () => {
            it('should set isLoading to false, update errorMessage', () => {
                const action = CoreActions.updateUserCollectionError({ error: { name: 'dummyErrorName', code: 'dummyErrorCode' } });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    isLoading: false,
                    errorMessage: { name: 'dummyErrorName', code: 'dummyErrorCode' },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('getUserCollectionSuccess', () => {
            it('should set isInitializing and isLoading to false and update user', () => {
                const action = CoreActions.getUserCollectionSuccess({ userCollection: mockIUser });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: {
                        ...initialMockAuthState.user,
                        ...mockIUser,
                    },
                    isLoading: false,
                    isInitializing: false,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('getUserCollectionError', () => {
            it('should reset user and set isLoading to false, update errorMessage', () => {
                const action = CoreActions.getUserCollectionError({ error: { name: 'dummyErrorName', code: 'dummyErrorCode' } });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: null,
                    isLoading: false,
                    errorMessage: { name: 'dummyErrorName', code: 'dummyErrorCode' },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('uploadUserPhoto', () => {
            it('should set progressStatus to started and loadProgress to 0', () => {
                const action = CoreActions.uploadUserPhoto({ file: mockFile });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    progressStatus: UploadStatus.Started,
                    loadProgress: 0,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('uploadUserPhotoProgress', () => {
            it('should set progressStatus to running and loadProgress to 50', () => {
                const action = CoreActions.uploadUserPhotoProgress({ loadProgress: 50 });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    progressStatus: UploadStatus.Running,
                    loadProgress: 50,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('uploadUserPhotoSuccess', () => {
            it('should set progressStatus to success and loadProgress to 50', () => {
                const action = CoreActions.uploadUserPhotoSuccess({ taskRef: 'dummyRef' });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    progressStatus: UploadStatus.Success,
                    loadProgress: 0,
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('uploadUserPhotoError', () => {
            it('should set progressStatus to failed, update error message', () => {
                const action = CoreActions.uploadUserPhotoError({ error: { name: 'dummyErrorName', code: 'dummyErrorCode' } });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    progressStatus: UploadStatus.Failed,
                    errorMessage: { name: 'dummyErrorName', code: 'dummyErrorCode' },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('writeFromFirebaseInUserPhotoURL', () => {
            it('should update user photoUrl', () => {
                const action = CoreActions.writeFromFirebaseInUserPhotoURL({ downloadURL: 'dummyDownloadURL' });
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: {
                        ...initialMockAuthState.user,
                        photoUrl: 'dummyDownloadURL',
                    },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });

        describe('clearPhotoUserURL', () => {
            it('should set user photoUrl to ""', () => {
                const action = CoreActions.clearPhotoUserURL();
                const state = authFeature.reducer(initialMockAuthState, action);
                const newState: IAuthState = {
                    ...initialMockAuthState,
                    user: {
                        ...initialMockAuthState.user,
                        photoUrl: '',
                    },
                };

                expect(state).toEqual(newState);
                expect(state).not.toBe(newState);
            });
        });
    });

    describe("selectors", () => {
        it('selectIsLoading', () => {
            expect(authFeature.selectIsLoading.projector(initialMockAuthState)).toBeFalse();
        });
        
        it('selectUser', () => {
            expect(authFeature.selectUser.projector(initialMockAuthState)).toBeNull();
        });
    
        it('selectErrorMessage', () => {
            expect(authFeature.selectErrorMessage.projector(initialMockAuthState)).toBeNull();
        });
    
        it('selectInfoMessage', () => {
            expect(authFeature.selectInfoMessage.projector(initialMockAuthState)).toBeNull();
        });
    
        it('selectIsEmailSend', () => {
            expect(authFeature.selectIsEmailSend.projector(initialMockAuthState)).toBeFalse();
        });
    
        it('selectIsInitializing', () => {
            expect(authFeature.selectIsInitializing.projector(initialMockAuthState)).toBeTrue();
        });
        
        it('selectProgressStatus', () => {
            expect(authFeature.selectProgressStatus.projector(initialMockAuthState)).toEqual(UploadStatus.Ready);
        });
    
        it('selectLoadProgress', () => {
            expect(authFeature.selectLoadProgress.projector(initialMockAuthState)).toEqual(0);
        });

        it('selectUserPhotoURL', () => {
            const selectedMockUser: IUser = { photoUrl: 'dummyPhotoUrl' };
            
            const result = selectUserPhotoURL.projector(selectedMockUser);
            expect(result).toEqual('dummyPhotoUrl');
        });

        it('selectUserUID', () => {
            const selectedMockUser: IUser = { uid: 'dummyUID' };
    
            const result = selectUserUID.projector(selectedMockUser);
            expect(result).toEqual('dummyUID');
        });
    });
});
