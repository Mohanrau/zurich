import authReducer, { setSession, clearSession } from './authSlice';
import { Session } from 'next-auth';

describe('auth reducer', () => {
  const initialState = {
    session: null,
  };

  const mockSession = {
    expires: '',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      image: 'john.jpg',
    },
    accessToken: 'test-token',
  } as Session;

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      session: null,
    });
  });

  it('should handle setSession', () => {
    const actual = authReducer(initialState, setSession(mockSession));
    expect(actual.session).toEqual(mockSession);
  });

  it('should handle clearSession', () => {
    const stateWithSession = { session: mockSession };
    const actual = authReducer(stateWithSession, clearSession());
    expect(actual.session).toBeNull();
  });
});
