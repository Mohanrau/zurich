import userReducer, {
  toggleEmailVisibility,
  fetchUsers,
  UserState,
} from './userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// Mock data for the users
const mockUsers = [
  {
    id: 1,
    first_name: 'George',
    last_name: 'Smith',
    email: 'george@example.com',
    avatar: 'https://test.com',
  },
  {
    id: 2,
    first_name: 'Paul',
    last_name: 'Wright',
    email: 'paul@example.com',
    avatar: 'https://test.com',
  },
];

// Mock fetch response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: mockUsers,
        total_pages: 1,
      }),
  })
) as jest.Mock;

describe('userSlice', () => {
  let initialState: UserState;

  beforeEach(() => {
    initialState = {
      users: [],
      emailsVisible: {},
      loading: false,
      error: null,
    };
  });

  test('should return the initial state', () => {
    const action = { type: 'unknown' };
    const state = userReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  test('should handle toggleEmailVisibility', () => {
    const previousState: UserState = {
      ...initialState,
      users: mockUsers,
      emailsVisible: { 1: true }, // Email is visible for user with ID 1
    };

    const state = userReducer(previousState, toggleEmailVisibility(1));
    expect(state.emailsVisible[1]).toBe(false);
  });

  describe('fetchUsers async thunk', () => {
    let store: any;

    beforeEach(() => {
      store = configureStore({
        reducer: {
          users: userReducer,
        },
      });
    });

    test('should set loading to true when fetchUsers is pending', async () => {
      const dispatch = store.dispatch as ThunkDispatch<
        UserState,
        void,
        AnyAction
      >;
      await dispatch(fetchUsers.pending());

      const state = store.getState().users;
      expect(state.loading).toBe(true);
    });

    test('should set users and stop loading when fetchUsers is fulfilled', async () => {
      const dispatch = store.dispatch as ThunkDispatch<
        UserState,
        void,
        AnyAction
      >;
      await dispatch(fetchUsers());

      const state = store.getState().users;
      expect(state.loading).toBe(false);
      expect(state.users).toEqual(mockUsers);
    });

    test('should handle fetchUsers rejection and set error message', async () => {
      global.fetch = jest.fn(() => Promise.reject('API error')) as jest.Mock;

      const dispatch = store.dispatch as ThunkDispatch<
        UserState,
        void,
        AnyAction
      >;
      await dispatch(fetchUsers());

      const state = store.getState().users;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('API error');
    });
  });
});
