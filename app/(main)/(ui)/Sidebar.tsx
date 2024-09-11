'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { links } from '../(lib)/links';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className='hidden min-h-screen min-w-[240px] flex-col bg-white p-6 md:flex'>
      <Link className='font-semibold' href={'/'}>
        {' '}
        <span className='border-y-2 border-primary bg-primary px-3 py-1 text-white'>
          Task
        </span>
        <span className='border-y-2 border-primary px-3 py-1'>Flow</span>
      </Link>
      <div className='mt-8 flex flex-col gap-2'>
        {links.map(({ url, icon, title }) => (
          <Link
            key={url}
            href={url}
            className={cn(
              'flex items-center gap-2 rounded-md px-4 py-2 hover:bg-neutral-300 hover:text-black',
              pathname === url && 'bg-primary text-white',
            )}
          >
            <span>{icon}</span>
            <span>{title}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};
