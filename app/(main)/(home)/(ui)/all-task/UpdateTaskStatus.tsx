'use client';

import * as toolTip from '@/components/ui/tooltip';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ETaskStatus } from '@/lib/types';
import { useMutation } from '@apollo/client';
import { catchAsync } from '@/helpers/catchAsync';
import { GET_TASKS, UPDATE_TASK_STATUS } from '@/lib/query';

interface IProps {
  taskId: string;
  status: ETaskStatus;
}

export const UpdateTaskStatus = ({ taskId, status }: IProps) => {
  const [updateTask, { loading }] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [GET_TASKS],
  });

  const onUpdateTaskStatus = async () => {
    // disable multiple when task is being updated
    if (loading) return;
    if (status === ETaskStatus.COMPLETED)
      return toast.error('Task is already completed', { duration: 1000 });

    const id = toast.loading('Updating Status');

    await catchAsync(async () => {
      await updateTask({
        variables: { id: taskId, status: ETaskStatus.COMPLETED },
      });

      toast.success('Updated task status', { id });
    }, id);
  };

  return (
    <toolTip.TooltipProvider>
      <toolTip.Tooltip>
        <toolTip.TooltipTrigger>
          <span
            onClick={onUpdateTaskStatus}
            className={cn(
              'cursor-pointer rounded-md px-2 py-1 text-sm text-white',
              status === ETaskStatus.COMPLETED && 'bg-lime-500',
              status === ETaskStatus.PENDING && 'bg-yellow-600',
            )}
          >
            {status}
          </span>
        </toolTip.TooltipTrigger>
        <toolTip.TooltipContent sideOffset={12}>
          <p>
            {status === ETaskStatus.PENDING
              ? 'Mask as completed'
              : 'Already completed '}
          </p>
        </toolTip.TooltipContent>
      </toolTip.Tooltip>
    </toolTip.TooltipProvider>
  );
};
