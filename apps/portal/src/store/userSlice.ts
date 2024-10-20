import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserState {
  users: User[];
  emailsVisible: { [key: number]: boolean };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  emailsVisible: {},
  loading: false,
  error: null,
};

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  let page = 1;
  let allUsers: User[] = [];
  let totalPages = 1;

  do {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    totalPages = data.total_pages;
    allUsers = [...allUsers, ...data.data];
    page++;
  } while (page <= totalPages);

  // Filter users whose first name starts with 'G' or last name starts with 'W'
  return allUsers.filter(
    (user) => user.first_name.startsWith('G') || user.last_name.startsWith('W')
  );
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleEmailVisibility: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.emailsVisible[userId] = !state.emailsVisible[userId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { toggleEmailVisibility } = userSlice.actions;
export default userSlice.reducer;
