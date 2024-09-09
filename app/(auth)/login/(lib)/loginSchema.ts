import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(4, { message: 'Password length is 4' }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
