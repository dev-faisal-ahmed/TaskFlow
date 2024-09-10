import { getServerSession } from 'next-auth';
import { AddCategory } from './(ui)/AddCategory';

export const metadata = {
  title: 'Task Flow | Categories',
};

export default async function CategoriesPage() {
  const userInfo = await getServerSession();
  const { user } = userInfo!;
  return (
    <main>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='text-lg font-semibold'>All Categories</h3>
        <AddCategory userEmail={user?.email as string} />
      </div>
    </main>
  );
}
