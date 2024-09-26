import { z } from 'zod';

export const PermissionSchema = z.object({
    canDeletePost: z.boolean().default(false),
    canEditHub: z.boolean().default(false),
    canCreateEditRoles: z.boolean().default(false),
    canKickMember: z.boolean().default(false),
});

export type PermissionDto = z.infer<typeof PermissionSchema>;
