'use client';

import * as card from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import { RiEdit2Fill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import { GET_TASK_BY_EMAIL } from '@/lib/query';
import { ETaskStatus, ITask } from '@/lib/types';
import { Loader } from '@/components/shared/Loader';

interface IProps {
  userEmail: string;
}

export const AllTasks = ({ userEmail }: IProps) => {
  const { data, loading } = useQuery(GET_TASK_BY_EMAIL, {
    variables: { userEmail },
  });

  if (loading) return <Loader className='mt-8' />;
  const tasks = data?.task as ITask[];

  return (
    <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {tasks.map((task) => (
        <card.Card className='grid h-full grid-rows-[auto_1fr]' key={task.id}>
          <card.CardHeader>
            <card.CardTitle>{task.title}</card.CardTitle>
            <div className='flex items-center justify-between gap-6'>
              <card.CardDescription>{task.category.name}</card.CardDescription>
              <div className='flex items-center gap-3'>
                <span className='cursor-pointer rounded-md bg-blue-600 p-1 text-white'>
                  <RiEdit2Fill />
                </span>
                <span className='cursor-pointer rounded-md bg-red-600 p-1 text-white'>
                  <TbTrashFilled />
                </span>
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
              <div className='flex items-center gap-3'>
                <p
                  className={cn(
                    'cursor-pointer rounded-md px-2 py-1 text-sm text-white',
                    task.status === ETaskStatus.COMPLETED && 'bg-lime-500',
                    task.status === ETaskStatus.PENDING && 'bg-yellow-600',
                  )}
                >
                  {task.status}
                </p>
              </div>
            </div>
          </card.CardContent>
        </card.Card>
      ))}
    </div>
  );
};
