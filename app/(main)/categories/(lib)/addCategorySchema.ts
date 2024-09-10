import { z } from 'zod';

export const addCategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type TAddCategorySchema = z.infer<typeof addCategorySchema>;
