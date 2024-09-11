import { AddTask } from './(ui)/AddTask';
import { AllTasks } from './(ui)/AllTasks';
import { getUser } from '@/helpers/getUser';

export const metadata = {
  title: 'Task Flow | Home',
};

export default async function Home() {
  const { user } = await getUser();

  return (
    <>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='text-lg font-semibold'>All Tasks</h3>
        <AddTask userEmail={user?.email as string} />
      </div>
      <AllTasks userEmail={user?.email as string} />
    </>
  );
}
