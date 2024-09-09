'use client';

import * as dropDown from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

interface IProps {
  name: string | undefined | null;
  email: string | undefined | null;
}

export const ProfileIcon = ({ name, email }: IProps) => {
  const onLogOut = async () => {
    signOut();
    toast.success('Logged out');
  };
  return (
    <dropDown.DropdownMenu>
      <dropDown.DropdownMenuTrigger className='outline-none'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white'>
          {name?.[0]}
        </div>
      </dropDown.DropdownMenuTrigger>
      <dropDown.DropdownMenuContent
        side='bottom'
        align='end'
        className='bg-card'
        sideOffset={10}
      >
        <div className='p-2'>
          <h4 className='text-base'>{name}</h4>
          <p className='text-xs text-muted-foreground'>{email}</p>
          <dropDown.DropdownMenuItem className='cursor-pointer' asChild>
            <Button
              onClick={onLogOut}
              className='mt-4 w-full'
              variant={'destructive'}
            >
              Logout
            </Button>
          </dropDown.DropdownMenuItem>
        </div>
      </dropDown.DropdownMenuContent>
    </dropDown.DropdownMenu>
  );
};
