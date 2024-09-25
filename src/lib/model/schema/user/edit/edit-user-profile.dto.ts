import { z } from 'zod';

export const EditUserProfileSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Minimum of 5 chacters for username' }).optional(),
  bio: z.string().max(100, { message: 'Maximum length is 100 characters' }).optional(),
  // profileImage: z.instanceof(File).refine(
  //   (file) => {
  //     return file.type.startsWith('image/') && file.size <= MAX_IMAGE_SIZE;
  //   },
  //   {
  //     message: 'File must be an image and the size is less than 5 MB',
  //   },
  // ),
  // bannerImage: z.instanceof(File).refine(
  //   (file) => {
  //     return file.type.startsWith('image/') && file.size <= MAX_IMAGE_SIZE;
  //   },
  //   {
  //     message: 'File must be an image and the size is less than 5 MB',
  //   },
  // ),
  profileImageUrl: z.string().optional(),
  bannerImageUrl: z.string().optional(),
});

export type EditUserProfileDto = z.infer<typeof EditUserProfileSchema>;
