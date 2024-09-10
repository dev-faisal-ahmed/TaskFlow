'use client';

import * as customForm from '@/components/ui/form';
import * as dialog from '@/components/ui/dialog';

import { RiEditFill } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { useUpdateCategory } from '../(lib)/useUpdateCategory';
import { TextInput } from '@/components/shared/form/TextInput';

interface IProps {
  categoryName: string;
  id: string;
}

export const UpdateCategory = ({ categoryName, id }: IProps) => {
  const { form, onUpdateCategory, isOpen, setIsOpen, loading } =
    useUpdateCategory(categoryName, id);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button size={'icon'}>
          <RiEditFill className='text-white' size={18} />
        </Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Update Category</dialog.DialogTitle>
          <dialog.DialogDescription>
            Input Category Details
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <customForm.Form {...form}>
          <form onSubmit={onUpdateCategory}>
            <TextInput
              label='Category Name'
              placeholder='@Productivity'
              name='name'
              form={form}
            />
            <Button disabled={loading} className='ml-auto mt-6 block'>
              Update Category
            </Button>
          </form>
        </customForm.Form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
