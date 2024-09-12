import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { registerAction } from './registerAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, TRegisterSchema } from './registerSchema';

export const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onRegister = form.handleSubmit(async (formData) => {
    const id = toast.loading(`Registering user...🔃`);
    try {
      setIsLoading(true);
      const response = await registerAction(formData);
      const { success, error } = response;
      if (error) return toast.error(error, { id });

      toast.success(success, { id });
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  });

  return { form, onRegister, isLoading };
};
