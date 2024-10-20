'use client';

import UserList from '../../components/User/List';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  return (
    <>
      <UserList></UserList>
    </>
  );
}
