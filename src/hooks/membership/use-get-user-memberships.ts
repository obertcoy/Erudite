import {
  convertAllRawHubEntityToHubEntity,
  HubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import {
  convertAllRawMembershipEntityToMembershipEntity,
  MembershipEntity,
} from '@/lib/model/entity/membership.ts/membership.entity';
import {
  getJoinedHubsQuery,
  getUserMembershipsQuery,
} from '@/services/membership-service';
import { useEffect, useState } from 'react';

export default function useGetUserMemberships(userId?: string) {
  const [userMemberships, setUserMemberships] = useState<MembershipEntity[]>(
    [],
  );
  const { getUserMemberships, getUserMembershipsLoading } =
    getUserMembershipsQuery();

  const fetchUserMemberships = async () => {
    try {
      let passedUserId: [string] | [] = [];
      if (userId) {
        passedUserId = [userId];
      }

      const result = await getUserMemberships([passedUserId]);

      if (!result || 'err' in result) {
        console.log(result?.err);
      } else {

        setUserMemberships(
          convertAllRawMembershipEntityToMembershipEntity(result.ok),
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserMemberships();
  }, [userId]);

  return { userMemberships, getUserMembershipsLoading, fetchUserMemberships };
}
