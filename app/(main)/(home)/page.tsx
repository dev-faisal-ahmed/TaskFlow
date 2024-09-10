import { getServerSession } from 'next-auth';
import { AddTask } from './(ui)/AddTask';

export const metadata = {
  title: 'Task Flow | Home',
};

export default async function Home() {
  const userInfo = await getServerSession();
  const { user } = userInfo!;

  return (
    <>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='text-lg font-semibold'>All Tasks</h3>
        <AddTask userEmail={user?.email as string} />
      </div>
    </>
  );
}
