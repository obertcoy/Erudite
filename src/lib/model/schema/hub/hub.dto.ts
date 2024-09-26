import { MAX_IMAGE_SIZE } from '@/lib/constant/constant';
import { validateFile } from '@/lib/utils';
import { z } from 'zod';
import { RuleSchema } from './rule.dto';
import { RoleSchema } from './role.dto';

export const HubSchema = z.object({
  hubId: z.string().optional(),
  hubName: z
    .string()
    .min(5, { message: 'Hub name must be at least 5 characters long.' })
    .max(50, { message: 'Hub name cannot exceed 50 characters.' }),
  hubDescription: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(500, { message: 'Description cannot exceed 500 characters.' }),
  hubBannerImage: z.instanceof(File, {message: 'Please upload a valid image file for the hub banner'}).refine(
    (file) => {
      return validateFile(file);
    },
    {
      message: `File must be a valid image and the size must be less than ${MAX_IMAGE_SIZE} bytes`,
    },
  ),
  hubRules: z.array(RuleSchema),
  hubRoles: z.array(RoleSchema).optional(),
});

export type HubDto = z.infer<typeof HubSchema>;
