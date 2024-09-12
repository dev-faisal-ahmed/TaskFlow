import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { ADD_TASK, GET_TASKS } from '@/lib/query';
import { catchAsync } from '@/helpers/catchAsync';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTaskSchema, TAddTaskSchema } from './taskSchema';

export const useAddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  const form = useForm<TAddTaskSchema>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: { title: '', description: '', categoryId: '' },
  });

  const [addTask, { loading }] = useMutation(ADD_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const onAddTask = form.handleSubmit(async (formData) => {
    const { title, description, categoryId } = formData;

    const id = toast.loading('Adding Category...🔃');

    await catchAsync(async () => {
      await addTask({
        variables: {
          title,
          description,
          categoryId,
          userEmail: data?.user?.email as string,
        },
      });
      toast.success('Task Added', { id });
      form.reset();
      setIsOpen(false);
    }, id);
  });

  return { form, onAddTask, isOpen, setIsOpen, loading };
};
