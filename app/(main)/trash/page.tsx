import { getUser } from '@/helpers/getUser';
import { AllTrash } from './(ui)/AllTrash';

export const metadata = {
  title: 'TaskFlow | Trash',
};

export default async function TrashPage() {
  const { user } = await getUser();

  return (
    <>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='text-lg font-semibold'>Deleted Tasks</h3>
        {/* <AddCategory userEmail={user?.email as string} /> */}
      </div>
      <AllTrash userEmail={user?.email as string} />
    </>
  );
}
