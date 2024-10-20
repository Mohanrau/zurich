'use client';
import Link from 'next/link';
import Login from '../Login';
import Logout from '../Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Header() {
  const sessionState = useSelector((state: RootState) => state?.auth?.session);
  return (
    <header className="flex flex-wrap items-center justify-between px-12 h-32 -mb-32 relative">
      <ul className="order-last md:order-first flex-1 flex justify-center md:justify-start list-reset">
        <li>
          <Link
            href="/"
            className="text-sm text-grey-darker no-underline hover:text-black"
          >
            Home
          </Link>
        </li>
        {sessionState && (
          <li className="ml-8">
            <Link
              href="/dashboard"
              className="text-sm text-grey-darker no-underline hover:text-black"
            >
              Dashboard
            </Link>
          </li>
        )}
      </ul>

      <div className="w-full md:w-auto flex justify-center">
        <Link
          href="/"
          className="block text-center text-black text-lg no-underline"
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMyA5aDlsLTE0IDE1IDMtOWgtOWwxNC0xNS0zIDl6bS04LjY5OSA1aDguMDg2bC0xLjk4NyA1Ljk2MyA5LjI5OS05Ljk2M2gtOC4wODZsMS45ODctNS45NjMtOS4yOTkgOS45NjN6Ii8+PC9zdmc+"
            alt="Zurich Portal"
            className="w-10 h-auto"
          />
        </Link>
      </div>

      <ul className="flex-1 flex justify-center md:justify-end list-reset">
        <li className="ml-8 hidden md:inline">
          {sessionState ? (
            <Logout className="text-sm font-bold px-4 py-3 no-underline text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-800"></Logout>
          ) : (
            <Login className="text-sm font-bold px-4 py-3 no-underline text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-800"></Login>
          )}
        </li>
      </ul>
    </header>
  );
}
