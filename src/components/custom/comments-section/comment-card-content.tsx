import { CardContent } from '@/components/ui/card';
import { CommentEntity } from '@/lib/model/entity/comment/comment.entity';

interface CommentCardContentProps {
  commentData: CommentEntity;
}

export default function CommentCardContent({
  commentData,
}: CommentCardContentProps) {
  return (
    <CardContent className="flex flex-col justify-center gap-y-3 p-0  ps-8 pb-2">
      <p className="text-sm">{commentData.commentBody}</p>
    </CardContent>
  );
}
