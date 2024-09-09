import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Sidebar } from './(ui)/Sidebar';
import { MobileNavbar } from './(ui)/MobileNavbar';
import { TopBar } from './(ui)/TopBar';

export default async function MainLayout({ children }: PropsWithChildren) {
  const user = await getServerSession();
  if (!user) return redirect('/login');

  return (
    <main className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        {/* <TopBar user={user} /> */}
        <TopBar />
        <main className='customized_scrollbar h-full overflow-y-auto px-5 pb-6'>
          {children}
        </main>
        <MobileNavbar />
      </section>
    </main>
  );
}
