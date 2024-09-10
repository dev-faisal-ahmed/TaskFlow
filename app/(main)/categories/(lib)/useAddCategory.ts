import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, TCategorySchema } from './categorySchema';
import { GET_CATEGORY_BY_EMAIL, INSERT_CATEGORY } from '@/lib/query';

export const useAddCategory = (userEmail: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '' },
  });

  const [addCategory, { loading }] = useMutation(INSERT_CATEGORY, {
    refetchQueries: [GET_CATEGORY_BY_EMAIL],
  });

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
