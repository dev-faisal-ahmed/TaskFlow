'use client';

import * as select from '@/components/ui/select';
import * as customForm from '@/components/ui/form';

import { ICategory } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_BY_EMAIL } from '@/lib/query';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  label: string;
  placeholder: string;
  userEmail: string;
  defaultValue?: string;
}

export const SelectCategory = ({
  form,
  name,
  label,
  placeholder,
  userEmail,
  defaultValue,
}: IProps) => {
  const { data, loading } = useQuery(GET_CATEGORY_BY_EMAIL, {
    variables: { userEmail },
  });

  const categories = data?.category as ICategory[];

  return (
    <customForm.FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <customForm.FormItem>
          <customForm.FormLabel className='font-semibold'>
            {label}
          </customForm.FormLabel>
          <select.Select
            onValueChange={field.onChange}
            defaultValue={field.value || defaultValue}
          >
            <customForm.FormControl>
              <select.SelectTrigger>
                <select.SelectValue
                  placeholder={loading ? 'Wait...' : placeholder}
                />
              </select.SelectTrigger>
            </customForm.FormControl>
            <select.SelectContent>
              {categories?.map((category) => (
                <select.SelectItem key={category.id} value={category.id}>
                  {category.name}
                </select.SelectItem>
              ))}
            </select.SelectContent>
          </select.Select>
          <customForm.FormMessage />
        </customForm.FormItem>
      )}
    />
  );
};
