import { z } from 'zod';

export const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const gendersEnum = genders.map((gender) => gender.value) as [
  string,
  ...string[],
];

export const RegisterUserSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Minimum of 5 chacters for username' }),
  email: z.string().email({ message: 'Check the email format' }),
  gender: z.enum(gendersEnum, { message: 'Select a valid gender' }),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
