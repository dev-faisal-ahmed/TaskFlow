import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUpdateTaskSchema, updateTaskSchema } from './taskSchema';
import { GET_TASK_BY_EMAIL, UPDATE_TASK } from '@/lib/query';

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
    refetchQueries: [GET_TASK_BY_EMAIL],
  });

  useEffect(() => {
    /* for syncing form state with actual sate from server,
    I had to do this bcz after first update the form state still contains the previous serve state. 
    */
    form.reset({ title, description });
  }, [title, description, form]);

  const onUpdateTask = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Category...🔃');
    try {
      await updateTask({
        variables: { id: taskId, ...formData },
      });
      toast.success('Task Updated', { id });
      setIsOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || 'Something went wrong', { id });
    }
  });

  return { form, onUpdateTask, isOpen, setIsOpen, loading };
};
