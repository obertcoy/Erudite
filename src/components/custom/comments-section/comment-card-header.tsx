import { CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserEntity } from '@/lib/model/entity/user/user.entity';
import ProfileAvatar from '@/components/ui/profile-avatar';

interface CommentCardHeaderProps {
  userData: UserEntity;
}

export default function CommentCardHeader({
  userData,
}: CommentCardHeaderProps) {
  return (
    <CardHeader className="p-0 flex flex-col justify-center gap-y-3">
      <div className="flex items-center gap-x-2">
        <ProfileAvatar
          key={userData.internetIdentity}
          username={userData.username}
          profileImageUrl={userData.profileImageUrl}
          internetIdentity={userData.internetIdentity
            
          }
        />
        <div className="flex items-center">
          <div className="text-sm">{userData.username}</div>
          &nbsp;·&nbsp;
          <div className="text-xs text-muted-foreground">2 hours ago</div>
        </div>
      </div>
    </CardHeader>
  );
}
