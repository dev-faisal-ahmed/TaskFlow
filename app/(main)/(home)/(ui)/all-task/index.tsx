/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as card from '@/components/ui/card';

import { ITask } from '@/lib/types';
import { GET_TASKS } from '@/lib/query';
import { useQuery } from '@apollo/client';
import { UpdateTask } from './UpdateTask';
import { DeleteTask } from './DeleteTask';
import { useSession } from 'next-auth/react';
import { Loader } from '@/components/shared/Loader';
import { UpdateTaskStatus } from './UpdateTaskStatus';
import { useFilterContext } from '@/context/useFilterContext';
import { generateTaskFilterQuery } from '@/helpers/queryHelper';

export const AllTasks = () => {
  const { data: userInfo } = useSession();
  const { filters } = useFilterContext();

  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: {
      whereQuery: generateTaskFilterQuery(
        filters,
        userInfo?.user?.email as string,
      ),
      sortOrder: filters.sortOrder,
    },
  });
  console.log({ sortOrder: filters.sortOrder });
  console.log({ error });

  // on filter update

  if (loading) return <Loader className='mt-8' />;
  const tasks = data?.task as ITask[];

  if (!tasks || !tasks.length)
    return <p className='mt-8 text-center font-semibold'>No Task Found!</p>;

  return (
    <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {tasks.map((task) => (
        <card.Card className='grid h-full grid-rows-[auto_1fr]' key={task.id}>
          <card.CardHeader>
            <card.CardTitle className='line-clamp-1'>
              {task.title}
            </card.CardTitle>
            <div className='flex items-center justify-between gap-6'>
              <card.CardDescription>{task.category.name}</card.CardDescription>
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
  );
};
