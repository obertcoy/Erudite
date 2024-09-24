import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface ProfileAvatarProps {

    username: string
    profileImageUrl: string,
    
}

export default function ProfileAvatar({username, profileImageUrl}: ProfileAvatarProps) {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={profileImageUrl} alt="Avatar" />
      <AvatarFallback className="bg-transparent">{username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
