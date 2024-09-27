import {
  convertAllRawHubEntityToHubEntity,
  HubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import {
  convertAllRawMembershipEntityToMembershipEntity,
  MembershipEntity,
  UserMembershipEntity,
} from '@/lib/model/entity/membership.ts/membership.entity';
import {
  convertAllRawUserEntityToUserEntity,
  convertRawUserEntityToUserEntity,
  UserEntity,
} from '@/lib/model/entity/user/user.entity';
import {
  getJoinedHubsQuery,
  getUserMembershipsQuery,
  getUsersInHubByRoleQuery,
} from '@/services/membership-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useGetUserHubByRole(
  hubData: HubEntity | null | undefined,
) {
  const [userMemberships, setUserMemberships] = useState<
    UserMembershipEntity[]
  >([]);
  const { getUsersInHubByRole, getUserMembershipsLoading, userCanisterId } =
    getUsersInHubByRoleQuery();

  const fetchUserHubByRoles = async () => {
    if (!hubData) return;
    try {
      // Map over all roles and return an array of promises for getUsersInHubByRole
      const promises = hubData.hubRoles.map(async (role) => {
        const result = await getUsersInHubByRole([
          BigInt(hubData.hubID),
          role.roleName,
          userCanisterId,
        ]);

        if (!result || 'err' in result) {
          console.log(result?.err);
          return []; // Return an empty array if there is an error for this role
        } else {
          const users: UserEntity[] = convertAllRawUserEntityToUserEntity(
            result.ok,
          );

          return users.map((user) => ({
            user,
            membership: {
              hubId: hubData.hubID,
              userIdentity: user.internetIdentity,
              userRole: role.roleName,
            } as MembershipEntity,
          }));
        }
      });

      // Use Promise.all to resolve all promises in parallel
      const resolvedMemberships = await Promise.all(promises);

      // Flatten the array of arrays
      const allMemberships = resolvedMemberships.flat();

      setUserMemberships(allMemberships);

      return;
    } catch (error) {
      toast.error('Error: fetching user memberships failed');
    }
  };

  useEffect(() => {
    fetchUserHubByRoles();
  }, [hubData]);

  return { userMemberships, getUserMembershipsLoading, fetchUserHubByRoles };
}
