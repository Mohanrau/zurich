'use server';

export async function getUserDataById({ id }: { id: number }) {
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  const data = await res.json();

  return data.data;
}
