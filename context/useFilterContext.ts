import { useContext } from 'react';
import { FilterContext } from './FilterContext';

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context)
    throw Error('You are trying to access the context from outside');

  return context;
};
