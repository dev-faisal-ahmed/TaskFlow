import { z } from 'zod';

export const addTaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  categoryId: z.string().min(1, { message: 'CategoryId is required' }),
});

export type TAddTaskSchema = z.infer<typeof addTaskSchema>;
