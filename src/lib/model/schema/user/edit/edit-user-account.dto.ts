import { z } from 'zod';
import { gendersEnum } from '../register-user.dto';

export const EditUserAccountSchema = z.object({
  email: z.string().email({ message: 'Check the email format' }),
  gender: z.enum(gendersEnum, { message: 'Select a valid gender' }),
});

export type EditUserAccountDto = z.infer<typeof EditUserAccountSchema>;
