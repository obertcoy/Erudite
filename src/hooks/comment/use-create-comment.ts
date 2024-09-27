import { CommentDto } from '@/lib/model/schema/comment/comment.dto';

import { createCommentUpdate } from '@/services/comment-service';
import { toast } from 'sonner';

export function useCreateComment() {
  const { createComment, postCanisterId, postCommentsCanisterId } =
    createCommentUpdate();

  const execute = async (commentDto: CommentDto) => {
    try {
      const toastId = toast.loading('Adding your comment...');

      const result = await createComment([
        commentDto.commentBody,
        BigInt(commentDto.postId),
        postCommentsCanisterId,
        postCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      return toast.success('Comment added successfuly', { id: toastId });
    } catch (err) {
      toast.error('Error: Failed to add comment');
      return null;
    }
  };

  return { execute };
}
