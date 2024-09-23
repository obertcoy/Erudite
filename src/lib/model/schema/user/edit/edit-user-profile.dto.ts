import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const EditUserProfileSchema = z.object({
  username: z.string(),
  bio: z.string().max(100, {message: 'Maximum length is 100 characters'}),
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
  profileImageUrl: z.string(),
  bannerImageUrl: z.string()
});

export type EditUserProfileDto = z.infer<typeof EditUserProfileSchema>
