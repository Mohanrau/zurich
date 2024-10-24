'use client';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { User, setUserData } from '../../store/userSlice';
import { useEffect } from 'react';
import EmailMasker from './EmailMasker';

const UserList = ({ users }: { users: User[] }) => {
  const dispatch = useDispatch();
  const {
    users: usersList,
    loading,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (users) {
      dispatch(setUserData(users));
    }
  }, [users, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              #
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              Avatar
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              First Name
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {usersList.map((user) => (
            <tr
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              key={user.id}
            >
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Image
                  unoptimized
                  height={25}
                  width={25}
                  alt={user.id.toString()}
                  src={user.avatar}
                />
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.first_name}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.last_name}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <EmailMasker user={user}></EmailMasker>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
