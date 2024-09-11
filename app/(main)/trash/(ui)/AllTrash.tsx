'use client';

import * as card from '@/components/ui/card';

import { ETaskStatus, ITask } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { Loader } from '@/components/shared/Loader';
import { GET_DELETED_TASK_BY_EMAIL } from '@/lib/query';
import { RestoreTask } from './RestoreTask';
import { cn } from '@/lib/utils';
import { PermanentlyDeleteTask } from './PermanentlyDelete';

interface IProps {
  userEmail: string;
}

export const AllTrash = ({ userEmail }: IProps) => {
  const { data, loading } = useQuery(GET_DELETED_TASK_BY_EMAIL, {
    variables: { userEmail },
  });

  if (loading) return <Loader className='mt-8' />;
  const tasks = data?.task as ITask[];

  return (
    <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {tasks?.map((task) => (
        <card.Card className='grid h-full grid-rows-[auto_1fr]' key={task.id}>
          <card.CardHeader>
            <card.CardTitle>{task.title}</card.CardTitle>
            <div className='flex items-center justify-between gap-6'>
              <card.CardDescription>{task.category.name}</card.CardDescription>
              <div className='flex items-center gap-3'>
                <RestoreTask taskId={task.id} />
                <PermanentlyDeleteTask taskId={task.id} />
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
              <span
                className={cn(
                  'cursor-pointer rounded-md px-2 py-1 text-sm text-white',
                  task.status === ETaskStatus.COMPLETED && 'bg-lime-500',
                  task.status === ETaskStatus.PENDING && 'bg-yellow-600',
                )}
              >
                {task.status}
              </span>
            </div>
          </card.CardContent>
        </card.Card>
      ))}
    </div>
  );
};
