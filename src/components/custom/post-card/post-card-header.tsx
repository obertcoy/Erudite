import { CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { HubEntity } from '@/lib/model/entity/hub/hub.entity';
import { UserEntity } from '@/lib/model/entity/user/user.entity';
import ProfileAvatar from '@/components/ui/profile-avatar';
import { DetailedPostEntity } from '@/lib/model/entity/post/detailed-post.entity';

interface PostCardHeaderProps {
  data: DetailedPostEntity;
}

export default function PostCardHeader({ data }: PostCardHeaderProps) {
  return (
    <CardHeader className="pb-3 flex flex-col justify-center gap-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProfileAvatar
            username={data.user.username}
            profileImageUrl={data.user.profileImageUrl}
            internetIdentity={data.user.internetIdentity}
          />
          <div className="flex items-center">
            <div className="text-sm">{data.user.username}</div>
            &nbsp;·&nbsp;
            <div className="text-xs text-muted-foreground">2 hours ago</div>
          </div>
        </div>
        <Badge>{data.hub.hubName}</Badge>
      </div>
      <CardTitle>{data.post.postTitle}</CardTitle>
    </CardHeader>
  );
}
