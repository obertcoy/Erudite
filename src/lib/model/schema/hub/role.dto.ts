import { z } from 'zod';
import { PermissionDto, PermissionSchema } from './permission.dto';

export const RoleSchema = z.object({
    roleName: z.string()
      .min(5, { message: 'Rule title must be at least 5 characters long.' })
      .max(100, { message: 'Rule title cannot exceed 100 characters.' }),
    
    rolePermission: PermissionSchema
  });

export type RoleDto = z.infer<typeof RoleSchema>;
