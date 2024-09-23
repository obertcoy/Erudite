import { z } from 'zod';

export const EditUserPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // Error will be associated with the confirmPassword field
  });

export type EditUserPasswordDto = z.infer<typeof EditUserPasswordSchema> 