'use server';

import { getServerSession } from 'next-auth';

export const getUser = async () => {
  const userInfo = await getServerSession();
  return { user: userInfo?.user };
};
