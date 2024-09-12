import { AllTrash } from './(ui)/AllTrash';

export const metadata = {
  title: 'TaskFlow | Trash',
};

export default function TrashPage() {
  return (
    <>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='text-lg font-semibold'>Deleted Tasks</h3>
      </div>
      <AllTrash />
    </>
  );
}
