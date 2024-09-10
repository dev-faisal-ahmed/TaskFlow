'use client';

import * as dialog from '@/components/ui/dialog';
import * as customForm from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { useAddTask } from '../(lib)/useAddTask';
import { TextInput } from '@/components/shared/form/TextInput';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';
import { SelectCategory } from '@/components/shared/form/SelectCategory';

interface IProps {
  userEmail: string;
}

export const AddTask = ({ userEmail }: IProps) => {
  const { form, isOpen, setIsOpen, loading, onAddTask } = useAddTask(userEmail);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button>Add Task</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>Add New Task</dialog.DialogHeader>
        <dialog.DialogDescription>Input task details</dialog.DialogDescription>

        <customForm.Form {...form}>
          <form className='flex flex-col gap-3' onSubmit={onAddTask}>
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
            <SelectCategory
              form={form}
              label='Category'
              name='categoryId'
              placeholder='Select Category'
              userEmail={userEmail}
            />
            <Button className='mt-3'>Add Task</Button>
          </form>
        </customForm.Form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
