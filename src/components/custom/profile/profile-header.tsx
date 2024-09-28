import { Button } from '@/components/ui/button';
import ProfileHeaderInformation from './profile-header-information';
import { useParams } from 'react-router-dom';
import { getUserQuery } from '@/services/user-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { UserEntity } from '@/lib/model/entity/user/user.entity';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUser } from '@/hooks/user/use-get-user';
import { cn } from '@/lib/utils';
import useAuthContext from '@/hooks/use-auth-context';

interface ProfileHeaderProps {
  activeTab: 'Posts' | 'Comments';
  setActiveTab: (tab: 'Posts' | 'Comments') => void;
}

export default function ProfileHeader({
  activeTab,
  setActiveTab,
}: ProfileHeaderProps) {
  const { userId } = useParams<{ userId?: string }>();
  const { userData, getUserLoading } = useGetUser(userId);

  const { user } = useAuthContext();

  return (
    <div className="w-full lg:w-3/4 mx-auto">
      {getUserLoading ? (
        <Skeleton className="h-[348px] w-full" />
      ) : userData ? (
        <>
          <ProfileHeaderInformation
            data={userData}
            isCurrentUser={userData.internetIdentity == user?.internetIdentity}
          />
          <div className="mt-6">
            <nav className="flex flex-wrap md:gap-x-4 px-4 border-b">
              {['Posts', 'Comments'].map((item) => (
                <div key={item} className="relative group py-2">
                  <Button
                    variant="ghost"
                    className="w-fit h-full hover:bg-inherit"
                    onClick={() => setActiveTab(item as 'Posts' | 'Comments')}
                  >
                    {item}
                  </Button>

                  <div
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-0.5 bg-red-500 group-hover:block',
                      activeTab !== item && 'hidden',
                    )}
                  ></div>
                </div>
              ))}
            </nav>
          </div>
        </>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  );
}
