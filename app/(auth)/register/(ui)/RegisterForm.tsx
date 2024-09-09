'use client';

import * as customForm from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { useRegister } from '../(lib)/useRegister';
import { TextInput } from '@/components/shared/form/TextInput';
import { PasswordInput } from '@/components/shared/form/PasswordInput';

export const RegisterForm = () => {
  const { form, onRegister } = useRegister();

  return (
    <section className='w-full max-w-[400px] rounded-md border bg-white p-6 shadow'>
      <div className='mb-6 text-center'>
        <h1 className='text-xl font-semibold'>Welcome! 👋</h1>
        <p className='text-sm text-muted-foreground'>
          Provide your information to register
        </p>
      </div>
      <customForm.Form {...form}>
        <form className='flex flex-col gap-3' onSubmit={onRegister}>
          <TextInput
            form={form}
            name='name'
            label='Name'
            placeholder='@John Doe'
          />
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
            description='Minimum length is 4'
          />
          <PasswordInput
            form={form}
            name='confirmPassword'
            label='Confirm Password'
            placeholder='@John Doe'
            description='Write again the password'
          />
          <Button type='submit' className='mt-2 w-full'>
            Register
          </Button>
        </form>
      </customForm.Form>
    </section>
  );
};
