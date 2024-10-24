import UserList from './List';
import { User as IUser } from '../../store/userSlice';

const fetchAllUsers = async (page = 1, users: IUser[] = []) => {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`);
  const data = await res.json();

  // Accumulate users
  const allUsers = [...users, ...data.data];

  // If there are more pages, recursively fetch the next page
  if (data.page < data.total_pages) {
    return fetchAllUsers(page + 1, allUsers);
  }

  return allUsers.map((user: IUser) => ({
    id: user.id,
    email: maskEmail(user.email),
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
  })); // Return accumulated users
};

const maskEmail = (email: string) => {
  const [name, domain] = email.split('@');
  const maskedName = name.slice(0, 2) + '***';
  return `${maskedName}@${domain}`;
};

export default async function User() {
  const result = await fetchAllUsers();

  return <UserList users={result}></UserList>;
}
