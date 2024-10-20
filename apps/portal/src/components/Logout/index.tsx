'use client';

import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../store/authSlice';

interface Props {
  className?: string;
}

const Logout = (props: Props) => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await signOut();
    await dispatch(clearSession());
  };

  return (
    <button {...props} onClick={handleLogin}>
      Logout
    </button>
  );
};

export default Logout;
