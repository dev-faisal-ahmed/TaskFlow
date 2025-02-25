'use client';

import * as customForm from '@/components/ui/form';

import Link from 'next/link';
import { useLogin } from '../(lib)/useLogin';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/shared/form/TextInput';
import { PasswordInput } from '@/components/shared/form/PasswordInput';

export const LoginFrom = () => {
  const { form, onLogin, handleAddDemoCredentials, isLoading } = useLogin();

  return (
    <section className='w-full max-w-[400px] rounded-md border bg-white p-6 shadow'>
      <div className='mb-6 text-center'>
        <h1 className='text-xl font-semibold'>Welcome Again👋</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Provide your credentials to login
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
          <Button type='submit' className='mt-2 w-full' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <p className='text-center text-xs'>
            New Here?{' '}
            <Link href={'/register'} className='text-blue-600 underline'>
              Register
            </Link>
          </p>
          <div className='flex items-center gap-2'>
            <div className='h-[2px] w-full bg-border' />
            <span className='text-xs'> OR</span>
            <div className='h-[2px] w-full bg-border' />
          </div>
          <Button
            type='button'
            className='underline'
            variant='ghost'
            onClick={handleAddDemoCredentials}
          >
            Use Demo credentials
          </Button>
        </form>
      </customForm.Form>
    </section>
  );
};
