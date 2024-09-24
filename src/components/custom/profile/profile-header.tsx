import { Button } from '@/components/ui/button';
import ProfileHeaderInformation from './profile-header-information';
import { useParams } from 'react-router-dom';
import { getUserQuery } from '@/services/user-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { convertRawUserEntityToUserEntity } from '@/lib/utils';
import { UserEntity } from '@/lib/model/entity/user/user.entity';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchUser } from '@/hooks/use-fetch-user';

export default function ProfileHeader() {
  const { userId } = useParams<{ userId?: string }>();
  const { userData, getUserLoading } = useFetchUser(userId);

  return (
    <div className="w-full lg:w-3/4 mx-auto">
      {getUserLoading ? (
        <Skeleton className="h-[348px] w-full" />
      ) : userData ? (
        <>
          <ProfileHeaderInformation data={userData} isCurrentUser={true} />
          <div className="mt-6">
            <nav className="flex flex-wrap md:gap-x-4 px-4 border-b">
              {[
                'Recents',
                'Posts',
                'Comments',
                'Awarded',
                'Upvoted',
                'Downvoted',
              ].map((item) => (
                <div key={item} className="relative group py-2">
                  <Button
                    variant="ghost"
                    className="w-fit h-full hover:bg-inherit"
                  >
                    {item}
                  </Button>

                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 hidden group-hover:block"></div>
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
