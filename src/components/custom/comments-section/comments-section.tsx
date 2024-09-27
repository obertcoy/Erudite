import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import CommentCard from './comment-card';
import { useEffect } from 'react';
import useGetCommentsByPostId from '@/hooks/post-comments/use-get-comments-by-post-id';
import { formatShortNumber } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
  refetchComment: boolean;
}

export default function CommentsSection({
  postId,
  refetchComment,
}: CommentSectionProps) {
  const { userComments, isLoading, fetchComments } =
    useGetCommentsByPostId(postId);

  useEffect(() => {
    fetchComments();
  }, [refetchComment]);


  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <MessageCircle className="size-4" />
        <h1 className="font-medium text-lg">Comments</h1>
        <Badge>{formatShortNumber(userComments?.length ?? 0)}</Badge>
      </div>
      {!isLoading &&
        userComments &&
        userComments.map((userComment, idx) => <CommentCard data={userComment} key={idx} />)}
    </div>
  );
}
