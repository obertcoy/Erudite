import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getUserQuery } from '@/services/user-service';
import { convertRawUserEntityToUserEntity } from '@/lib/utils';
import { UserEntity } from '@/lib/model/entity/user/user.entity';

export function useFetchUser(userId: string | undefined, strict: boolean = true) {
  const [userData, setUserData] = useState<UserEntity | null>(null);
  const { getUser, getUserLoading } = getUserQuery();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        toast('User id is required');
        return;
      }

      try {
        const result = await getUser([[userId], [strict]]);
        if (!result || 'err' in result) {
          toast(result?.err);
        } else {
          setUserData(convertRawUserEntityToUserEntity(result.ok));
        }
      } catch (error) {
        toast('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [userId ]);

  return { userData, getUserLoading };
}
