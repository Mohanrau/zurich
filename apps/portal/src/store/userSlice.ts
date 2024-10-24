import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload.filter(
        (user) =>
          user.first_name.startsWith('G') || user.last_name.startsWith('W')
      );
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
