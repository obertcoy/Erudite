import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';

interface ProfileAvatarProps {
  username: string;
  profileImageUrl: string;
  internetIdentity: string;
  disabled?: boolean;
}

export default function ProfileAvatar({
  username,
  profileImageUrl,
  internetIdentity,
  disabled = false,
}: ProfileAvatarProps) {
  return disabled ? (
    <Avatar className="h-8 w-8 border">
      <AvatarImage src={profileImageUrl} alt="Avatar" />
      <AvatarFallback className="bg-transparent">
        {username.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  ) : (
    <Link
      to={generateDynamicRoutePath(RouteEnum.USER, {
        userId: internetIdentity,
      })}
    >
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={profileImageUrl} alt="Avatar" />
        <AvatarFallback className="bg-transparent">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
