import { memberColumns } from '@/components/custom/manage-hub/manage-hub-members-columns';
import { ManageHubMembersDataTable } from '@/components/custom/manage-hub/manage-hub-members-data-table';
import { rolesColumns } from '@/components/custom/manage-hub/manage-hub-roles-columns';
import { ManageHubRolesDataTable } from '@/components/custom/manage-hub/manage-hub-roles-data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetHubById } from '@/hooks/hub/use-get-hub';
import useGetUserHubByRole from '@/hooks/membership/use-get-users-in-hub-by-role';
import { UserMembershipEntity } from '@/lib/model/entity/membership.ts/membership.entity';
import { UserEntity } from '@/lib/model/entity/user/user.entity';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const members: UserEntity[] = [
  {
    internetIdentity: '728ed52f',
    bio: 'I am a software engineer',
    username: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    profileImageUrl: 'https://example.com/profile.jpg',
    bannerImageUrl: 'https://example.com/banner.jpg',
    numFollowers: 0,
    numFollowing: 0,
  },
  {
    internetIdentity: '728ed52f',
    bio: 'I am a software engineer',
    username: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    profileImageUrl: 'https://example.com/profile.jpg',
    bannerImageUrl: 'https://example.com/banner.jpg',
    numFollowers: 0,
    numFollowing: 0,
  },
  {
    internetIdentity: '728ed52f',
    bio: 'I am a software engineer',
    username: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    profileImageUrl: 'https://example.com/profile.jpg',
    bannerImageUrl: 'https://example.com/banner.jpg',
    numFollowers: 0,
    numFollowing: 0,
  },
];

export default function ManageHubPage() {
  const { hubId } = useParams();
  const { hubData } = useGetHubById(hubId);

  const [userMemberships, setUserMemberships] = useState<UserMembershipEntity[]>([]);
  const { fetchUserHubByRoles, getUserMembershipsLoading } =
    useGetUserHubByRole(hubData);

  useEffect(() => {
    const fetchMemberships = async () => {
      const memberships = await fetchUserHubByRoles();
      if (memberships) {
        setUserMemberships(memberships); // Update state with fetched memberships
      }
    };

    if (hubData) {
      fetchMemberships();
    }
  }, [hubData]); // Dependency array to re-fetch when hubData changes

  if (!hubData) return null;

  const rolesWithHubId = hubData?.hubRoles.map((role) => ({
    ...role,
    hubId: hubData.hubID,
  }));

  return (
    <main className="w-full flex flex-col gap-y-4 items-center justify-center p-8">
      <div className="container flex flex-col items-center gap-y-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-2xl font-medium">Manage Hub</h1>
          <p className="text-muted-foreground">
            Manage the members and roles of your hub.
          </p>
        </div>
        <Tabs defaultValue="members" className="max-w-4xl w-full">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="w-full">
            <ManageHubMembersDataTable
              columns={memberColumns}
              data={userMemberships}
              roles={hubData.hubRoles}
              refetch={fetchUserHubByRoles}
              isLoading={getUserMembershipsLoading}
            />
          </TabsContent>
          <TabsContent value="roles" className="w-full">
            <ManageHubRolesDataTable
              columns={rolesColumns}
              data={rolesWithHubId}
              hubId={hubData.hubID}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
