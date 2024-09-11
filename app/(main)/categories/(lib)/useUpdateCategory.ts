import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, TCategorySchema } from './categorySchema';
import { GET_CATEGORY_BY_EMAIL, UPDATE_CATEGORY } from '@/lib/query';
import { catchAsync } from '@/helpers/catchAsync';

export const useUpdateCategory = (categoryName: string, categoryId: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: categoryName },
  });

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [GET_CATEGORY_BY_EMAIL],
  });

  const onUpdateCategory = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding Category...🔃');

    catchAsync(async () => {
      await updateCategory({
        variables: { name: formData.name, id: categoryId },
      });

      toast.success('Category Updated', { id });
      form.reset();
      setIsOpen(false);
    }, id);
  });

  return { form, onUpdateCategory, isOpen, setIsOpen, loading };
};
