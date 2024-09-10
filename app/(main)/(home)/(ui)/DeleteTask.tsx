'use client';

import * as dialog from '@/components/ui/dialog';

import { toast } from 'sonner';
import { useMutation } from '@apollo/client';
import { TbTrashFilled } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { DELETE_TASK, GET_TASK_BY_EMAIL } from '@/lib/query';

interface IProps {
  taskId: string;
}

export const DeleteTask = ({ taskId }: IProps) => {
  const [deleteTask, { loading }] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASK_BY_EMAIL],
  });

  const onDeleteTask = async () => {
    const id = toast.loading('Deleting Task');
    try {
      await deleteTask({ variables: { id: taskId } });
      toast.success('Task Deleted', { id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong', { id });
    }
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
            Once you delete, the task can be found in trash.
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
            Proceed
          </Button>
        </div>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
