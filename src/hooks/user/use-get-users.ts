import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getUsersQuery } from '@/services/user-service';
import { convertRawUserEntityToUserEntity } from '@/lib/model/entity/user/user.entity';
import { UserEntity } from '@/lib/model/entity/user/user.entity';

export function useGetUsers(usernameQuery: string) {
  const [usersData, setUsersData] = useState<UserEntity[] | null>(null);
  const { getUsers, getUsersLoading } = getUsersQuery();

  useEffect(() => {
    const fetchUser = async () => {
      if (!usernameQuery) {
        toast('Error: Username query is required');
        return;
      }

      try {
        const result = await getUsers([usernameQuery]);
        if (!result || 'err' in result) {
          toast.error('Error on fetching user: ' + result?.err);
        } else {
          let userEntites = [];

          for (const rawUserEntity of result) {
            userEntites.push(convertRawUserEntityToUserEntity(rawUserEntity));
          }

          setUsersData(userEntites);
        }
      } catch (error) {
        toast.error('Error on fetching user: ' + error);
      }
    };

    fetchUser();
  }, [usernameQuery]);

  return { usersData, getUsersLoading };
}
