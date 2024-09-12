/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, PropsWithChildren, useState } from 'react';

interface IFilterContext {
  filters: Record<string, any>;
  onUpdateFilter: (key: string, value: any) => void;
  resetFilter: () => void;
}

export const FilterContext = createContext<IFilterContext | null>(null);

export const FilterContextProvider = ({ children }: PropsWithChildren) => {
  const [filters, setFilters] = useState<Record<string, any>>({
    sortOrder: 'desc',
  });

  const onUpdateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilter = () => {
    setFilters({ sortOrder: 'desc' });
  };

  return (
    <FilterContext.Provider value={{ filters, onUpdateFilter, resetFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
