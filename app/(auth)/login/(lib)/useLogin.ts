import { toast } from 'sonner';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from './loginSchema';

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onLogin = form.handleSubmit(async (formData) => {
    const { email, password } = formData;
    const id = toast.loading('Logging in...🔃');

    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!result?.ok) return toast.error(result?.error, { id });

      toast.success('Login successful');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  });

  return { form, onLogin, isLoading };
};
