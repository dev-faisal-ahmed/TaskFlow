'use client';

import * as card from '@/components/ui/card';

import { UpdateTask } from './UpdateTask';
import { DeleteTask } from './DeleteTask';
import { Loader } from '@/components/shared/Loader';
import { UpdateTaskStatus } from './UpdateTaskStatus';
import { useGetTasks } from '../../(lib)/useGetTasks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const AllTasks = () => {
  const { tasks, loading, jumpPage, totalPages, page } = useGetTasks();

  if (loading) return <Loader className='mt-8' />;

  if (!tasks || !tasks.length)
    return <p className='mt-8 text-center font-semibold'>No Task Found!</p>;

  return (
    <>
      <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {tasks.map((task) => (
          <card.Card className='grid h-full grid-rows-[auto_1fr]' key={task.id}>
            <card.CardHeader>
              <card.CardTitle className='line-clamp-1'>
                {task.title}
              </card.CardTitle>
              <div className='flex items-center justify-between gap-6'>
                <card.CardDescription>
                  {task.category.name}
                </card.CardDescription>
                <div className='flex items-center gap-3'>
                  <UpdateTask categoryId={task.category.id} {...task} />
                  <DeleteTask taskId={task.id} />
                </div>
              </div>
            </card.CardHeader>

            <card.CardContent className='flex flex-col'>
              <card.CardDescription className='mb-2'>
                {task.description}
              </card.CardDescription>
              <div className='mt-auto flex items-center justify-between'>
                <p className='text-sm font-semibold'>
                  {new Date(task.date).toString().slice(0, 10)}
                </p>

                <UpdateTaskStatus taskId={task.id} status={task.status} />
              </div>
            </card.CardContent>
          </card.Card>
        ))}
      </div>

      {/* show this only when page is greater than 1 */}
      {totalPages > 1 && (
        <div className='mt-6 flex items-center justify-end gap-2'>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              onClick={() => jumpPage(index + 1)}
              variant={'outline'}
              className={cn(
                page === index + 1 && 'bg-primary font-semibold text-white',
              )}
              key={index + 1}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
