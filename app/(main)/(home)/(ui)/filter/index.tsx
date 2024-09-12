/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as sheet from '@/components/ui/sheet';
import * as select from '@/components/ui/select';

import { FiSearch } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { useFilterContext } from '@/context/useFilterContext';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_BY_EMAIL } from '@/lib/query';
import { useSession } from 'next-auth/react';
import { Label } from '@/components/ui/label';
import { ETaskStatus, ICategory } from '@/lib/types';
import { Loader } from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { SelectFilter } from './SelectFilter';

export const FilterSheet = () => {
  const { data } = useSession();

  const { data: categoryData, loading } = useQuery(GET_CATEGORY_BY_EMAIL, {
    variables: { userEmail: data?.user?.email },
  });

  const { onUpdateFilter, filters, resetFilter } = useFilterContext()!;

  return (
    <sheet.Sheet>
      <sheet.SheetTrigger>
        <span className='flex items-center gap-3 rounded-full bg-neutral-300 px-6 py-2 text-sm'>
          <FiSearch />
          <span>Search Here...</span>
        </span>
      </sheet.SheetTrigger>
      <sheet.SheetContent className='flex h-full flex-col'>
        <sheet.SheetHeader>
          <sheet.SheetTitle>Advanced Filtering!</sheet.SheetTitle>
        </sheet.SheetHeader>
        <div className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <Label className='font-semibold'>Keyword</Label>
            <Input
              placeholder='Search Here....!'
              value={filters.key || ''}
              onChange={(e) => onUpdateFilter('key', e.target.value)}
            />
          </div>

          <SelectFilter
            filterKey='categoryId'
            label='Category'
            placeholder='Select Any Category'
          >
            {loading && <Loader />}
            {!categoryData?.category?.length && (
              <p className='px-2 py-1 font-semibold'>No Category Found</p>
            )}
            {categoryData?.category?.map((category: ICategory) => (
              <select.SelectItem key={category.id} value={category.id}>
                {category.name}
              </select.SelectItem>
            ))}
          </SelectFilter>

          <SelectFilter
            filterKey='status'
            label='Task Status'
            placeholder='Select Any Status'
          >
            <select.SelectItem value={ETaskStatus.COMPLETED}>
              {ETaskStatus.COMPLETED}
            </select.SelectItem>
            <select.SelectItem value={ETaskStatus.PENDING}>
              {ETaskStatus.PENDING}
            </select.SelectItem>
          </SelectFilter>

          <SelectFilter
            filterKey='sortOrder'
            label='Sort By Date'
            placeholder='Select Order'
          >
            <select.SelectItem value='asc'>Ascending Order</select.SelectItem>
            <select.SelectItem value='desc'>Descending Order</select.SelectItem>
          </SelectFilter>
        </div>

        <div className='mt-auto flex items-center gap-3'>
          <sheet.SheetClose asChild>
            <Button
              onClick={resetFilter}
              className='w-full'
              variant={'destructive'}
            >
              Remove Filer
            </Button>
          </sheet.SheetClose>
          <sheet.SheetClose asChild>
            <Button className='w-full'>Done</Button>
          </sheet.SheetClose>
        </div>
      </sheet.SheetContent>
    </sheet.Sheet>
  );
};
