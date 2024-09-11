import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADD_TASK, GET_TASK_BY_EMAIL } from '@/lib/query';
import { addTaskSchema, TAddTaskSchema } from './taskSchema';
import { catchAsync } from '@/helpers/catchAsync';

export const useAddTask = (userEmail: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TAddTaskSchema>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: { title: '', description: '', categoryId: '' },
  });

  const [addTask, { loading }] = useMutation(ADD_TASK, {
    refetchQueries: [GET_TASK_BY_EMAIL],
  });

  const onAddTask = form.handleSubmit(async (formData) => {
    const { title, description, categoryId } = formData;

    const id = toast.loading('Adding Category...🔃');

    await catchAsync(async () => {
      await addTask({
        variables: { title, description, categoryId, userEmail },
      });
      toast.success('Task Added', { id });
      form.reset();
      setIsOpen(false);
    }, id);
  });

  return { form, onAddTask, isOpen, setIsOpen, loading };
};
