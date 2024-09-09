import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().min(4, { message: 'Password length is 4' }),
    confirmPassword: z.string().min(4, { message: 'Password length is 4' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
