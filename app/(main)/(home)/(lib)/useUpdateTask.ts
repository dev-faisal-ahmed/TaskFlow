import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { catchAsync } from '@/helpers/catchAsync';
import { zodResolver } from '@hookform/resolvers/zod';
import { GET_TASKS, UPDATE_TASK } from '@/lib/query';
import { TUpdateTaskSchema, updateTaskSchema } from './taskSchema';

interface IUpdateTaskPayload {
  id: string;
  title: string;
  description: string;
}

export const useUpdateTask = ({
  id: taskId,
  title,
  description,
}: IUpdateTaskPayload) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TUpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: { title, description },
  });

  const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  useEffect(() => {
    /* for syncing form state with actual sate from server,
    I had to do this bcz after first update the form state still contains the previous serve state. 
    */
    form.reset({ title, description });
  }, [title, description, form]);

  const onUpdateTask = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Category...🔃');

    await catchAsync(async () => {
      await updateTask({
        variables: { id: taskId, ...formData },
      });
      toast.success('Task Updated', { id });
      setIsOpen(false);
    }, id);
  });

  return { form, onUpdateTask, isOpen, setIsOpen, loading };
};
