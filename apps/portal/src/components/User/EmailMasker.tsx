import { useState, useTransition } from 'react';
import { getUserDataById } from '../../services/actions/getUserData';
import { User } from '../../store/userSlice';

export default function EmailMasker({ user }: { user: User }) {
  const [localEmail, setLocalEmail] = useState('');
  const [isPending, startTransition] = useTransition();

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

  const getUser = (id: number) => {
    startTransition(async () => {
      const result = await getUserDataById({ id });
      setLocalEmail(result.email);
    });
  };

  return (
    <div>
      {!localEmail && (
        <button
          disabled={isPending}
          onClick={() => getUser(user.id)}
          className="bg-gray-100 p-2 rounded mx-4 text-black"
        >
          <EyeIcon />
        </button>
      )}
      {localEmail ? localEmail : user.email}
    </div>
  );
}
