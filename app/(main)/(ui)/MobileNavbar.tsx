'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { links } from '../(lib)/links';
import { usePathname } from 'next/navigation';

export const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <section className='flex items-center justify-center gap-5 border-t border-neutral-300 py-2 md:hidden'>
      {links.map(({ url, title, icon }) => (
        <Link
          key={url}
          href={url}
          className={cn(
            'flex w-[80px] flex-col items-center gap-2 rounded-md border border-primary p-1',
            pathname === url && 'bg-primary text-white',
          )}
        >
          <span>{icon}</span>
          <span className='text-xs'>{title}</span>
        </Link>
      ))}
    </section>
  );
};
