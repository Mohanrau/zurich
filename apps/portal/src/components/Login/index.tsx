'use client';

import { signIn, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setSession } from '../../store/authSlice';
import { useEffect } from 'react';

interface Props {
  className?: string;
}

const Login = (props: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  useEffect(() => {
    if (session) {
      dispatch(setSession(session));
    }
  }, [session, dispatch]);

  return (
    <button {...props} onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default Login;
