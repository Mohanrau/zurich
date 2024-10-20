'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '../store';

interface AppProviderProps extends SessionProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};
