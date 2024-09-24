import Profile from '@/assets/rukia.jpg';
import Banner from '@/assets/bg.jpg';
import {
  Camera,
  Image,
  MessageCircle,
  MoreHorizontal,
  NotebookPen,
  UserPlus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Prestige from '@/components/ui/prestige';
import { Button } from '@/components/ui/button';
import { formatShortNumber, generateDynamicRoutePath } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { RouteEnum } from '@/lib/enum/route-enum';
import { useEditProfileStore } from '@/hooks/use-edit-profile';
import React, { useRef } from 'react';
import User, { UserEntity } from '@/lib/model/entity/user/user.entity';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileHeaderInformationProps {
  data: UserEntity | null;
  isCurrentUser: boolean;
  isEditing?: boolean;
}
const ProfileHeaderInformation = React.memo(
  ({
    data,
    isCurrentUser,
    isEditing = false,
  }: ProfileHeaderInformationProps) => {
    const { setProfileImage, setBannerImage } = useEditProfileStore();

    const handleProfileImageChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        setProfileImage(file);
      }
    };

    const handleBannerImageChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        setBannerImage(file);
      }
    };

    return (
      <div className="flex flex-col">
        {data ? (
          <>
            <div className="relative">
              <BannerImageSection
                isEditing={isEditing}
                onBannerImageChange={handleBannerImageChange}
                bannerImageUrl={data.bannerImageUrl}
              />
              <ProfileImageSection
                isEditing={isEditing}
                onProfileImageChange={handleProfileImageChange}
                profileImageUrl={data.profileImageUrl}
              />
            </div>
            <ProfileDetailsSection data={data} isCurrentUser={isCurrentUser} />
          </>
        ) : (
          <>
            <div className="relative">
              <BannerImageSectionSkeleton />
              <ProfileImageSectionSkeleton />
            </div>
            <ProfileDetailsSectionSkeleton />
          </>
        )}
      </div>
    );
  },
);
interface BannerImageSectionProps {
  isEditing: boolean;
  onBannerImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bannerImageUrl?: string;
}

const BannerImageSection = ({
  isEditing,
  onBannerImageChange,
  bannerImageUrl,
}: BannerImageSectionProps) => {
  const bannerImageInputRef = useRef<HTMLInputElement>(null);
  

  return (
    <div className="h-[348px] overflow-hidden rounded-b-lg">
      {bannerImageUrl ? (
        <img
          src={bannerImageUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-muted w-full h-full object-cover"></div>
      )}

      {isEditing && (
        <>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => bannerImageInputRef.current?.click()}
            className="absolute top-4 right-4"
          >
            <Image className="h-4 w-4" />
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={bannerImageInputRef}
            className="hidden"
            onChange={onBannerImageChange}
          />
        </>
      )}
    </div>
  );
};
interface ProfileImageSectionProps {
  isEditing: boolean;
  onProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  profileImageUrl?: string;
}
const ProfileImageSection = ({
  isEditing,
  onProfileImageChange,
  profileImageUrl,
}: ProfileImageSectionProps) => {
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute bottom-4 left-4 md:left-8">
      <Avatar className="w-40 h-40 rounded-full border-4 border-white overflow-hidden">
        <AvatarImage src={profileImageUrl || Profile} alt="@username" />
        <AvatarFallback>KE</AvatarFallback>
      </Avatar>
      {isEditing && (
        <>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => profileImageInputRef.current?.click()}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Camera className="h-4 w-4" />
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={profileImageInputRef}
            className="hidden"
            onChange={onProfileImageChange}
          />
        </>
      )}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4">
        <Prestige prestige={5245} />
      </div>
    </div>
  );
};
interface ProfileDetailsSectionProps {
  data: User;
  isCurrentUser: boolean;
}

const ProfileDetailsSection = ({
  data,
  isCurrentUser,
}: ProfileDetailsSectionProps) => (
  <div className="mt-4 px-4 md:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-x-4">
    <div>
      <h1 className="text-3xl font-bold text-ellipsis">{data?.username}</h1>
      <p className="text-muted-foreground">
        {formatShortNumber(1500)} followers
      </p>
      <div className="flex items-center mt-2 max-w-lg text-sm break-words">
        {data?.bio}
      </div>
    </div>
    <div className="flex gap-x-2 mt-4 md:mt-0">
      {isCurrentUser ? (
        <Button variant="secondary" asChild>
          <Link
            to={RouteEnum.EDIT_PROFILE}
          >
            <NotebookPen className="mr-2 h-4 w-4" /> Edit Information
          </Link>
        </Button>
      ) : (
        <>
          <Button variant="default">
            <UserPlus className="mr-2 h-4 w-4" /> Follow
          </Button>
          <Button variant="secondary">
            <MessageCircle className="mr-2 h-4 w-4" /> Message
          </Button>
        </>
      )}
      <Button variant="secondary" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default ProfileHeaderInformation;

export const dummyUser: UserEntity = {
  internetIdentity: '10001',
  username: 'Kelvinices Rawr',
  email: 'kelvin@ices.com',
  gender: 'male',
  bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur qui, iste aspernatur accusantium ratione, molestiae esse facere rem quas omnis eius in nisi cumque velit, mollitia voluptatem molestias possimus ut?',
  profileImageUrl: Profile,
  bannerImageUrl: Banner,
};

const BannerImageSectionSkeleton: React.FC = () => (
  <div className="h-[348px] overflow-hidden rounded-b-lg">
    <Skeleton className="w-full h-full" />
  </div>
);

const ProfileImageSectionSkeleton: React.FC = () => (
  <div className="absolute bottom-4 left-4 md:left-8">
    <Skeleton className="w-40 h-40 rounded-full" />
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4">
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
  </div>
);

const ProfileDetailsSectionSkeleton: React.FC = () => (
  <div className="mt-4 px-4 md:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-x-4">
    <div>
      <Skeleton className="h-9 w-48 mb-2" />
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-4 w-64 max-w-lg" />
    </div>
    <div className="flex gap-x-2 mt-4 md:mt-0">
      <Skeleton className="h-10 w-36" />
      <Skeleton className="h-10 w-10" />
    </div>
  </div>
);
