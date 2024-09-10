'use client';

import * as toolTip from '@/components/ui/tooltip';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ETaskStatus } from '@/lib/types';
import { useMutation } from '@apollo/client';
import { GET_TASK_BY_EMAIL, UPDATE_TASK_STATUS } from '@/lib/query';

interface IProps {
  taskId: string;
  status: ETaskStatus;
}

export const UpdateTaskStatus = ({ taskId, status }: IProps) => {
  const [updateTask, { loading }] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [GET_TASK_BY_EMAIL],
  });

  const onUpdateTaskStatus = async () => {
    // disable multiple when task is being updated
    if (loading) return;
    if (status === ETaskStatus.COMPLETED)
      return toast.error('Task is already completed', { duration: 1000 });

    const id = toast.loading('Updating Status');

    console.log({ taskId, status: ETaskStatus.COMPLETED });

    try {
      await updateTask({
        variables: { id: taskId, status: ETaskStatus.COMPLETED },
      });

      toast.success('Updated task status', { id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || 'Something went wrong', { id });
    }
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
        <toolTip.TooltipContent>
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
