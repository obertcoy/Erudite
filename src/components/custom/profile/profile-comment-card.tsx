import { Card } from '@/components/ui/card';
import ProfileCommentCardHeader from './profile-comment-card-header';
import ProfileCommentCardContent from './profile-comment-card-content';
import ProfileCommentCardFooter from './profile-comment-card-footer';

import { UserCommentEntity } from '@/lib/model/entity/comment/comment.entity';

interface CommentCardProps {
  data: UserCommentEntity;
}

export default function ProfileCommentCard({ data }: CommentCardProps) {
  return (
    <div>
      <Card className="w-full shadow-none border-none px-4">
        <ProfileCommentCardHeader data = {data}/>
        <ProfileCommentCardContent data = {data}/>
        {/* <ProfileCommentCardFooter data = {data}/> */}
      </Card>
    </div>
  );
}
