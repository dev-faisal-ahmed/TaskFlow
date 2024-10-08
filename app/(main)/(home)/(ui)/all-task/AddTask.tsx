'use client';

import * as dialog from '@/components/ui/dialog';
import * as customForm from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { useAddTask } from '../../(lib)/useAddTask';
import { DescriptionInput } from './DescriptionInput';
import { TextInput } from '@/components/shared/form/TextInput';
import { SelectCategory } from '@/components/shared/form/SelectCategory';

export const AddTask = () => {
  const { form, isOpen, setIsOpen, loading, onAddTask } = useAddTask();

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button>Add Task</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add New Task</dialog.DialogTitle>
        </dialog.DialogHeader>
        <dialog.DialogDescription>Input task details</dialog.DialogDescription>

        <customForm.Form {...form}>
          <form className='flex flex-col gap-3' onSubmit={onAddTask}>
            <TextInput
              label='Title'
              form={form}
              name='title'
              placeholder='@ Go to super market'
            />
            <DescriptionInput
              label='Description'
              form={form}
              name='description'
              placeholder='@ Need to go to super market to find grocery'
              title={form.watch('title')}
            />
            <SelectCategory
              form={form}
              label='Category'
              name='categoryId'
              placeholder='Select Category'
            />
            <Button disabled={loading} className='mt-3'>
              Add Task
            </Button>
          </form>
        </customForm.Form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
