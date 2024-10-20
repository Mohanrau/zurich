// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

export interface AuthState {
  session: Session | null;
}

const initialState: AuthState = {
  session: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
