import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect } from 'react';
import { fetchUsers, toggleEmailVisibility } from '../../store/userSlice';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, emailsVisible, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart[0] + '******';
    return `${maskedLocalPart}@${domain}`;
  };

  const EyeIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.5C7.5 4.5 3.75 7.5 2.25 12C3.75 16.5 7.5 19.5 12 19.5C16.5 19.5 20.25 16.5 21.75 12C20.25 7.5 16.5 4.5 12 4.5Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.94 17.94C16.2607 19.1025 14.2024 19.7511 12 19.75C7.5 19.75 3.75 16.5 2.25 12C3.21616 9.16766 5.31964 6.85337 8.1 5.76M21.75 12C21.0058 14.364 19.4998 16.3568 17.5 17.67M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C10.8897 8.25 9.88753 8.72526 9.15198 9.52582"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3L21 21"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
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
                    {users.map((user) => (
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
                            height={15}
                            width={15}
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
                          Email:{' '}
                          <button
                            className="bg-gray-100 p-2 rounded mx-4 text-black"
                            onClick={() =>
                              dispatch(toggleEmailVisibility(user.id))
                            }
                          >
                            {emailsVisible[user.id] ? (
                              <EyeOffIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </button>
                          {emailsVisible[user.id]
                            ? user.email
                            : maskEmail(user.email)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
