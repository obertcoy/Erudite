import { CardContent } from '@/components/ui/card';
import { UserCommentEntity } from '@/lib/model/entity/comment/comment.entity';

interface CommentCardProps {
  data: UserCommentEntity;
}


export default function ProfileCommentCardContent({ data }: CommentCardProps) {
  return (
    <CardContent className="flex flex-col justify-center gap-y-3 p-0  ps-8 pb-2">
      <p className="text-sm">
        {data.comment.commentBody}
      </p>
    </CardContent>
  );
}
