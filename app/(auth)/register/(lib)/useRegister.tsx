import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, TRegisterSchema } from './registerSchema';

export const useRegister = () => {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onRegister = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return { form, onRegister };
};
