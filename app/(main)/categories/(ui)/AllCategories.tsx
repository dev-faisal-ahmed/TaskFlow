'use client';

import { ICategory } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { UpdateCategory } from './UpdateCategory';
import { Loader } from '@/components/shared/Loader';
import { GET_CATEGORY_BY_EMAIL } from '@/lib/query';

interface IProps {
  userEmail: string;
}

export const AllCategories = ({ userEmail }: IProps) => {
  const { data, loading } = useQuery(GET_CATEGORY_BY_EMAIL, {
    variables: { userEmail },
  });

  if (loading) return <Loader className='mt-6' />;
  const categories = data?.category as ICategory[];

  return (
    <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {categories?.map(({ id, name }) => (
        <div
          key={id}
          className='flex items-center justify-between rounded-md bg-white p-3'
        >
          <h4 className='font-semibold'>{name}</h4>
          <UpdateCategory id={id} categoryName={name} />
        </div>
      ))}
    </div>
  );
};
