'use client';

import {
  GET_DELETED_TASK_BY_EMAIL,
  GET_TASKS,
  RESTORE_TASK,
} from '@/lib/query';

import { toast } from 'sonner';
import { TbRestore } from 'react-icons/tb';
import { useMutation } from '@apollo/client';
import { catchAsync } from '@/helpers/catchAsync';

interface IProps {
  taskId: string;
}

export const RestoreTask = ({ taskId }: IProps) => {
  const [restoreTask] = useMutation(RESTORE_TASK, {
    refetchQueries: [GET_TASKS, GET_DELETED_TASK_BY_EMAIL],
  });

  const onRestore = async () => {
    const id = toast.loading('Restoring the task...!');
    await catchAsync(async () => {
      await restoreTask({ variables: { id: taskId } });
      toast.success('Task restored successfully', { id });
    }, id);
  };

  return (
    <div
      onClick={onRestore}
      className='cursor-pointer rounded-md bg-blue-600 p-1 text-white'
    >
      <TbRestore />
    </div>
  );
};
