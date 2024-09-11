'use client';

import * as dialog from '@/components/ui/dialog';

import {
  GET_DELETED_TASK_BY_EMAIL,
  PERMANENTLY_DELETE_TASK,
} from '@/lib/query';

import { toast } from 'sonner';
import { useMutation } from '@apollo/client';
import { TbTrashFilled } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { catchAsync } from '@/helpers/catchAsync';

interface IProps {
  taskId: string;
}

export const PermanentlyDeleteTask = ({ taskId }: IProps) => {
  const [deleteTask, { loading }] = useMutation(PERMANENTLY_DELETE_TASK, {
    refetchQueries: [GET_DELETED_TASK_BY_EMAIL],
  });

  const onDeleteTask = async () => {
    const id = toast.loading('Deleting Task');
    await catchAsync(async () => {
      await deleteTask({ variables: { id: taskId } });
      toast.success('Task Deleted', { id });
    }, id);
  };

  return (
    <dialog.Dialog>
      <dialog.DialogTrigger>
        <span className='block cursor-pointer rounded-md bg-red-600 p-1 text-white'>
          <TbTrashFilled />
        </span>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Are you sure?</dialog.DialogTitle>
          <dialog.DialogDescription>
            Once you delete, the task can never be found.
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <div className='flex items-center justify-end gap-4'>
          <dialog.DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </dialog.DialogClose>
          <Button
            onClick={onDeleteTask}
            disabled={loading}
            variant={'destructive'}
          >
            Delete Permanently
          </Button>
        </div>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
