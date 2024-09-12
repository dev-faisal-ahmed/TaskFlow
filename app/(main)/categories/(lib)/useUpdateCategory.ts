import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, TCategorySchema } from './categorySchema';
import { GET_CATEGORY, UPDATE_CATEGORY } from '@/lib/query';
import { catchAsync } from '@/helpers/catchAsync';

export const useUpdateCategory = (categoryName: string, categoryId: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: categoryName },
  });

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [GET_CATEGORY],
  });

  useEffect(() => {
    /* for syncing form state with actual sate from server,
    I had to do this bcz after first update the form state still contains the previous serve state. 
    */
    form.reset({ name: categoryName });
  }, [form, categoryName]);

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
