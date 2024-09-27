import {
  CommentEntity,
  convertAllRawCommentEntityToCommentEntity,
  UserCommentEntity,
} from '@/lib/model/entity/comment/comment.entity';
import {
  convertRawDetailedPostEntityToDetailedPostEntity,
  DetailedPostEntity,
} from '@/lib/model/entity/post/detailed-post.entity';
import {
  convertRawUserEntityToUserEntity,
  UserEntity,
} from '@/lib/model/entity/user/user.entity';

import { getHubDetailedPostByPostIdQuery } from '@/services/hub-posts-service';
import { getCommentsByPostIdQuery } from '@/services/post-comments-service';
import { getUserQuery } from '@/services/user-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useGetCommentsByPostId(postId: string) {
  const [userComments, setUserComments] = useState<UserCommentEntity[]>();
  const [isLoading, setIsLoading] = useState(true);

  const { getCommentsByPostId, commentCanisterId } = getCommentsByPostIdQuery();
  const { getUser } = getUserQuery();

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const result = await getCommentsByPostId([
        BigInt(postId),
        commentCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error('Error: Failed to fetch posts');
      } else {
        const comments: CommentEntity[] =
          convertAllRawCommentEntityToCommentEntity(result.ok);

        const userPromises = comments.map(async (comment: CommentEntity) => {
          const userResult = await getUser([
            [comment.internetIdentity],
            [true],
          ]);
          if (!userResult || 'err' in userResult) {
            toast.error(
              `Error: Failed to fetch user for comment ID ${comment.commentId}`,
            );
            return null;
          }

          const userComment: UserCommentEntity = {
            comment: comment,
            user: convertRawUserEntityToUserEntity(userResult.ok),
          };

          return userComment;
        });

        const userComments = await Promise.all(userPromises);
        setUserComments(userComments.filter((comment): comment is UserCommentEntity => comment !== null));
    }
    } catch (error) {
      toast.error('Error: fetching comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { userComments, isLoading, fetchComments };
}
