'use client';

import { useState } from 'react';
import { FaBrain } from 'react-icons/fa';
import * as customForm from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader } from '@/components/shared/Loader';
import { getAIDescription } from '../../(lib)/getAIDescription';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  title: string;
}

export const DescriptionInput = ({
  form,
  name,
  label,
  placeholder,
  description,
  title,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log(title);

  const generateDescription = async () => {
    setIsLoading(true);
    const response = await getAIDescription(title);
    form.setValue('description', response);
    setIsLoading(false);
  };
  return (
    <customForm.FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <customForm.FormItem>
          <customForm.FormLabel className='flex items-center justify-between font-semibold'>
            {label}
            <div
              className='flex w-fit cursor-pointer items-center gap-1 rounded bg-neutral-200 px-2 py-1 text-xs font-semibold'
              onClick={generateDescription}
            >
              <FaBrain />
              Generate With AI
            </div>
          </customForm.FormLabel>

          <customForm.FormControl>
            <div className='relative'>
              <Textarea
                disabled={isLoading}
                placeholder={placeholder}
                {...field}
                rows={5}
              />
              {isLoading && (
                <Loader className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
              )}
            </div>
          </customForm.FormControl>
          {/* show error message */}
          <customForm.FormMessage />

          {/* if any description is provided */}
          {description && (
            <customForm.FormDescription>
              {description}
            </customForm.FormDescription>
          )}
        </customForm.FormItem>
      )}
    />
  );
};
