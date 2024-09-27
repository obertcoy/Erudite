import { z } from 'zod';
import { PermissionSchema } from './permission.dto';

export const RoleSchema = z.object({
  roleName: z
    .string()
    .min(2, { message: 'Rule title must be at least 2 characters long.' })
    .max(100, { message: 'Rule title cannot exceed 100 characters.' }),

  permissions: PermissionSchema,

  default: z.boolean(),
});

export type RoleDto = z.infer<typeof RoleSchema>;
