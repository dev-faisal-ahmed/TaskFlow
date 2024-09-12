import { AllTasks } from './(ui)/all-task';
import { FilterSheet } from './(ui)/filter';
import { AddTask } from './(ui)/all-task/AddTask';
import { FilterContextProvider } from '@/context/FilterContext';

export const metadata = {
  title: 'Task Flow | Home',
};

export default function Home() {
  return (
    <FilterContextProvider>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='hidden whitespace-nowrap text-lg font-semibold md:block'>
          All Tasks
        </h3>
        <div className='flex w-full items-center justify-between gap-3 md:justify-end'>
          <FilterSheet />
          <AddTask />
        </div>
      </div>
      <AllTasks />
    </FilterContextProvider>
  );
}
