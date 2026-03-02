
import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    user: any | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        credentials: (state, action) => {
            // payload expected to be { user, token }
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});
export const { credentials, logout } = authSlice.actions;
export default authSlice.reducer