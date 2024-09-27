import { Card } from '@/components/ui/card';
import CommentCardHeader from './comment-card-header';
import CommentCardContent from './comment-card-content';
import CommentCardFooter from './comment-card-footer';
import { UserCommentEntity } from '@/lib/model/entity/comment/comment.entity';

interface CommentCardProps {
  data: UserCommentEntity;
}

export default function CommentCard({ data }: CommentCardProps) {
  return (
    <div>
      <Card className="w-full shadow-none border-none">
        <CommentCardHeader userData={data.user} />
        <CommentCardContent commentData={data.comment} />
        <CommentCardFooter />
      </Card>
    </div>
  );
}
