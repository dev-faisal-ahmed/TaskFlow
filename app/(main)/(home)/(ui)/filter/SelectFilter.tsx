'use client';

import * as select from '@/components/ui/select';

import { PropsWithChildren } from 'react';
import { Label } from '@/components/ui/label';
import { useFilterContext } from '@/context/useFilterContext';

interface IProps extends PropsWithChildren {
  filterKey: string;
  label: string;
  placeholder: string;
}

export const SelectFilter = ({
  filterKey,
  label,
  placeholder,
  children,
}: IProps) => {
  const { filters, onUpdateFilter } = useFilterContext();

  return (
    <div className='space-y-2'>
      <Label className='font-semibold'>{label}</Label>
      <select.Select
        value={filters[filterKey]}
        onValueChange={(val) => onUpdateFilter(filterKey, val)}
      >
        <select.SelectTrigger>
          {filters[filterKey] ? <select.SelectValue /> : <p>{placeholder}</p>}
        </select.SelectTrigger>
        <select.SelectContent>{children}</select.SelectContent>
      </select.Select>
    </div>
  );
};
