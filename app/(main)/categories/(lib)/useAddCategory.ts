import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { INSERT_CATEGORY } from '@/lib/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCategorySchema, TAddCategorySchema } from './addCategorySchema';

export const useAddCategory = (userEmail: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TAddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: { name: '' },
  });

  const [addCategory, { loading }] = useMutation(INSERT_CATEGORY);

  const onAddCategory = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Category...🔃');
    try {
      await addCategory({
        variables: { name: formData.name, userEmail },
      });

      toast.success('Category Added', { id });
      form.reset();
      setIsOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || 'Something went wrong', { id });
    }
  });

  return { form, onAddCategory, isOpen, setIsOpen, loading };
};
