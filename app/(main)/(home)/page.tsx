import { FilterContextProvider } from '@/context/FilterContext';
import { AddTask } from './(ui)/AddTask';
import { AllTasks } from './(ui)/all-task';
import { getUser } from '@/helpers/getUser';
import { FilterSheet } from './(ui)/filter';

export const metadata = {
  title: 'Task Flow | Home',
};

export default async function Home() {
  const { user } = await getUser();

  return (
    <FilterContextProvider>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='hidden whitespace-nowrap text-lg font-semibold md:block'>
          All Tasks
        </h3>
        <div className='flex w-full items-center justify-between gap-3 md:justify-end'>
          <FilterSheet />
          <AddTask userEmail={user?.email as string} />
        </div>
      </div>
      <AllTasks userEmail={user?.email as string} />
    </FilterContextProvider>
  );
}
