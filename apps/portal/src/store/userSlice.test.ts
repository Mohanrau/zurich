import userReducer, { setUserData, UserState, User } from './userSlice';

describe('userSlice reducer', () => {
  const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
  };

  it('should return the initial state when passed an empty action', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setUserData action with filtering', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        avatar: 'avatar1.png',
        first_name: 'George',
        last_name: 'Smith',
        email: 'george@example.com',
      },
      {
        id: 2,
        avatar: 'avatar2.png',
        first_name: 'Alice',
        last_name: 'Wonderland',
        email: 'alice@example.com',
      },
      {
        id: 3,
        avatar: 'avatar3.png',
        first_name: 'Greg',
        last_name: 'Williams',
        email: 'greg@example.com',
      },
      {
        id: 4,
        avatar: 'avatar4.png',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
      },
      {
        id: 5,
        avatar: 'avatar5.png',
        first_name: 'Walter',
        last_name: 'White',
        email: 'walter@example.com',
      },
    ];

    const expectedUsers = [
      {
        id: 1,
        avatar: 'avatar1.png',
        first_name: 'George',
        last_name: 'Smith',
        email: 'george@example.com',
      },
      {
        id: 2,
        avatar: 'avatar2.png',
        first_name: 'Alice',
        last_name: 'Wonderland',
        email: 'alice@example.com',
      },
      {
        id: 3,
        avatar: 'avatar3.png',
        first_name: 'Greg',
        last_name: 'Williams',
        email: 'greg@example.com',
      },
      {
        id: 5,
        avatar: 'avatar5.png',
        first_name: 'Walter',
        last_name: 'White',
        email: 'walter@example.com',
      },
    ];

    const action = setUserData(mockUsers);
    const result = userReducer(initialState, action);

    expect(result.users).toEqual(expectedUsers);
  });
});
