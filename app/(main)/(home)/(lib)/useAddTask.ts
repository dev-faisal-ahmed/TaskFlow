import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTaskSchema, TAddTaskSchema } from './taskSchema';
import { ADD_TASK, GET_TASK_BY_EMAIL } from '@/lib/query';

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
    try {
      await addTask({
        variables: { title, description, categoryId, userEmail },
      });
      toast.success('Task Added', { id });
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || 'Something went wrong', { id });
    }
  });

  return { form, onAddTask, isOpen, setIsOpen, loading };
};
