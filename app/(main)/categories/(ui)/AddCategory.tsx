'use client';

import * as customForm from '@/components/ui/form';
import * as dialog from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useAddCategory } from '../(lib)/useAddCategory';
import { TextInput } from '@/components/shared/form/TextInput';

interface IProps {
  userEmail: string;
}

export const AddCategory = ({ userEmail }: IProps) => {
  const { form, onAddCategory, isOpen, setIsOpen, loading } =
    useAddCategory(userEmail);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button>Add Category</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Category</dialog.DialogTitle>
          <dialog.DialogDescription>
            Input Category Details
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <customForm.Form {...form}>
          <form onSubmit={onAddCategory}>
            <TextInput
              label='Category Name'
              placeholder='@Productivity'
              name='name'
              form={form}
            />
            <Button disabled={loading} className='ml-auto mt-6 block'>
              Add Category
            </Button>
          </form>
        </customForm.Form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
