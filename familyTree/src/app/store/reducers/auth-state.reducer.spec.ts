import { CoreActions } from '../actions/auth-state.actions';
import { authFeature, selectUserPhotoURL } from './auth-state.reducer';
import { IAuthState, UploadStatus } from '../state/auth.state';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';

const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' };

const initialMockAuthState: IAuthState = {
    user: {
        firstName: 'dummyFirstName',
        photoUrl: 'dummyPhotoUrl',
        uid: 'dummyUID',
    },
    errorMessage: null,
    infoMessage: null,
    isLoading: false,
    isEmailSend: false,
    isInitializing: true,
    progressStatus: UploadStatus.Ready,
    loadProgress: 0,
};

describe('auth-state.reducer', () => {
    describe('reducer', () => {
        describe('signUpWithEmail', () => {
            it('should reset state of messages, start loading and set email send to false', () => {
                const result = authFeature.reducer(initialMockAuthState, CoreActions.signUpWithEmail({ user: mockIUser }));
            
                expect(result.isLoading).toBeTrue();
                expect(result.errorMessage).toBeNull();
                expect(result.infoMessage).toBeNull();
                expect(result.isEmailSend).toBeFalse();
            });
        });
    
        describe('unknown action', () => {
            it('should return the default state', () => {
                const action = {
                    type: 'Unknown',
                };
                const state = authFeature.reducer(initialMockAuthState, action);
                expect(state).toBe(initialMockAuthState);
            });
        });
    
        describe('signUpWithEmail action', () => {
            it('should retrieve all books and update the state in an immutable way', () => {
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
        })
    });
    
    describe("selectors", () => {
        it('selectIsLoading', () => {
            const dummyStateForIsLoading = {
                isLoading: true,
            };
            
            expect(authFeature.selectIsLoading.projector(dummyStateForIsLoading)).toBeTrue();
        });
        
        
        /* const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName', uid: 'dummyUID' };
        const initialState: IAuthState = {
            user: mockIUser,
            errorMessage: null,
            infoMessage: null,
            isLoading: false,
            isEmailSend: false,
            isInitializing: true,
            progressStatus: UploadStatus.Success,
            loadProgress: 50,
        }; */
        
        describe('selectUserPhotoURL', () => {
            it('should select the user photo URL', () => {
                const selectMockUser = authFeature.selectUser.projector(initialMockAuthState);
                const result = selectUserPhotoURL.projector(selectMockUser);
                expect(result).toEqual('dummyPhotoUrl');
            });
        });
        
        // describe('selectUserUID', () => {
        //     it('should select the user uid', () => {
        //         const result = selectUserUID.projector(mockUser);
        //         expect(result).toEqual('dummyUID');
        //     });
        // });
    });
});
