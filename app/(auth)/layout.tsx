import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const user = await getServerSession();
  if (user) return redirect('/');

  return children;
}
