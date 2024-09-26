import { MAX_IMAGE_SIZE } from '@/lib/constant/constant';
import { validateFile } from '@/lib/utils';
import { z } from 'zod';

export const PostSchema = z.object({
  postTitle: z.string().min(1, 'Post title is required'),
  postBody: z.string().min(1, 'Post body is required'),
  postBannerImage: z
    .instanceof(File, {
      message: 'Please upload a valid image file for the hub banner',
    })
    .refine(
      (file) => {
        return validateFile(file);
      },
      {
        message: `File must be a valid image and the size must be less than ${MAX_IMAGE_SIZE} bytes`,
      },
    )
    .optional(),
  hubId: z.bigint({ message: 'Selecting a hub is required' }),
});

export type PostDto = z.infer<typeof PostSchema>;
