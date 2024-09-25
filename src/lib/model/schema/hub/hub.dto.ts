import { MAX_IMAGE_SIZE } from '@/lib/constant/constant';
import { validateFile, validateImageURL } from '@/lib/utils';
import { z } from 'zod';
import { RoleEntity } from '../../entity/hub/role.entity';

export const HubSchema = z.object({
  hubId: z.string().optional(),
  hubName: z.string(),
  hubDescription: z.string(),
  hubProfileImage: z
    .instanceof(File)
    .refine(
      (file) => {
        return validateFile(file);
      },
      {
        message: `File must be a valid image and the size must be less than ${MAX_IMAGE_SIZE} bytes`,
      },
    )
    .optional(),
  hubRoles: z.array(z.custom<RoleEntity>()).optional(),
});

export type HubDto = z.infer<typeof HubSchema>;
