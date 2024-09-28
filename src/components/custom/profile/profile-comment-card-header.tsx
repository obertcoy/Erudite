import { CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { UserCommentEntity } from '@/lib/model/entity/comment/comment.entity';
import ProfileAvatar from '@/components/ui/profile-avatar';

interface CommentCardProps {
  data: UserCommentEntity;
}

export default function ProfileCommentCardHeader({ data }: CommentCardProps) {
  return (
    <CardHeader className="p-0 flex flex-col justify-center gap-y-3">
      <div className="flex items-center gap-x-2">
        <ProfileAvatar username={data.user.username} profileImageUrl={data.user.profileImageUrl}/>
        <div className="flex items-center">
          <div className="text-sm">{data.user.username}</div>
          &nbsp;·&nbsp;
          {/* <div className="text-xs text-muted-foreground">2 hours ago</div> */}
        </div>
      </div>
    </CardHeader>
  );
}
