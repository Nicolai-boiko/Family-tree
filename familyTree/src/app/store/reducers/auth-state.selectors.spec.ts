import { IUser } from "src/app/constants/Interfaces/common.interfaces";
import { IAuthState, UploadStatus } from "../state/auth.state";
import { authFeature, selectUserPhotoURL, selectUserUID } from "./auth-state.reducer";


describe("Selectors", () => {
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

    const initialState: IUser = { email: 'dummyEmail', photoUrl: 'dummyURL', uid: 'dummyUID' };

    describe('selectUserPhotoURL', () => {
        it('should select the user photo URL', () => {
            const result = selectUserPhotoURL.projector(initialState);
            expect(result).toEqual('dummyURL');
        });
    });

    describe('selectUserUID', () => {
        it('should select the user uid', () => {
            const result = selectUserUID.projector(initialState);
            expect(result).toEqual('dummyUID');
        });
    });
});