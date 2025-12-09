import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
  isLoading: boolean;
}

// 2. Define the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  userToken: null,
  isLoading: true,
};

// 3. Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{token: string}>) => {
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
      state.isLoading = false;
    },
    signOut: state => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.isLoading = false;
    },
    restoreToken: (state, action: PayloadAction<{token: string | null}>) => {
      state.userToken = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.isLoading = false;
    },
  },
});

export const {signIn, signOut, restoreToken} = authSlice.actions;

export default authSlice.reducer;
