import { AddCategory } from './(ui)/AddCategory';
import { AllCategories } from './(ui)/AllCategories';

export const metadata = {
  title: 'Task Flow | Categories',
};

export default function CategoriesPage() {
  return (
    <>
      <div className='flex items-center justify-between gap-6'>
        <h3 className='text-lg font-semibold'>All Categories</h3>
        <AddCategory />
      </div>
      <AllCategories />
    </>
  );
}
