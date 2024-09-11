'use client';

import * as dialog from '@/components/ui/dialog';
import * as customForm from '@/components/ui/form';

import { RiEdit2Fill } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { useUpdateTask } from '../(lib)/useUpdateTask';
import { TextInput } from '@/components/shared/form/TextInput';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';

interface IProps {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  userEmail: string;
}

export const UpdateTask = ({ id, title, description }: IProps) => {
  const { form, isOpen, setIsOpen, loading, onUpdateTask } = useUpdateTask({
    id,
    title,
    description,
  });
  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger>
        <span className='block cursor-pointer rounded-md bg-blue-600 p-1 text-white'>
          <RiEdit2Fill />
        </span>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>Add New Task</dialog.DialogHeader>
        <dialog.DialogDescription>Input task details</dialog.DialogDescription>

        <customForm.Form {...form}>
          <form className='flex flex-col gap-3' onSubmit={onUpdateTask}>
            <TextInput
              label='Title'
              form={form}
              name='title'
              placeholder='@ Go to super market'
            />
            <CustomTextarea
              label='Description'
              form={form}
              name='description'
              placeholder='@ Need to go to super market to find grocery'
            />
            <Button disabled={loading} className='mt-3'>
              Update Task
            </Button>
          </form>
        </customForm.Form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
