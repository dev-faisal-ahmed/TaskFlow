'use client';

import * as customForm from '@/components/ui/form';

import { TextInput } from '@/components/shared/form/TextInput';
import { useLogin } from '../(lib)/useLogin';
import { PasswordInput } from '@/components/shared/form/PasswordInput';
import { Button } from '@/components/ui/button';

export const LoginFrom = () => {
  const { form, onLogin } = useLogin();
  return (
    <section className='w-full max-w-[400px] rounded-md border bg-white p-6 shadow'>
      <div className='mb-6 text-center'>
        <h1 className='text-xl font-semibold'>Welcome! 👋</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Provide your information to register
        </p>
      </div>
      <customForm.Form {...form}>
        <form className='flex flex-col gap-3' onSubmit={onLogin}>
          <TextInput
            form={form}
            name='email'
            label='Email'
            placeholder='@john@example.com'
          />
          <PasswordInput
            form={form}
            name='password'
            label='Password'
            placeholder='@John Doe'
          />
          <Button type='submit' className='mt-2 w-full'>
            Register
          </Button>
        </form>
      </customForm.Form>
    </section>
  );
};
