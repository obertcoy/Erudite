import { z } from 'zod';

export const CommentSchema = z.object({
  commentBody: z.string().trim().min(1, { message: 'Comment cannot be empty' }),
  postId: z.string(),
});

export type CommentDto = z.infer<typeof CommentSchema>;
