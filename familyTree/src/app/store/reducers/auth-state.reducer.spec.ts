import { CoreActions } from "../actions/auth-state.actions";
import { authFeature } from "./auth-state.reducer";
import { IAuthState } from "../state/auth.state";
import { initialAuthState } from "../state/auth.state";
import { IUser } from "src/app/constants/Interfaces/common.interfaces";

describe('authFeature', () => {
    const MockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' };

    describe('unknown action', () => {
        it('should return the default state', () => {
            const action = {
                type: 'Unknown',
            };
            const state = authFeature.reducer(initialAuthState, action);
            expect(state).toBe(initialAuthState);
        });
    });

    describe('signUpWithEmail action', () => {
        it('should retrieve all books and update the state in an immutable way', () => {
            const action = CoreActions.signUpWithEmail({ user: MockIUser });
            const state = authFeature.reducer(initialAuthState, action);
            const newState: IAuthState = {
                ...initialAuthState,
                isLoading: true,
                errorMessage: null,
                infoMessage: null,
                isEmailSend: false,
            };

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });
    });






});