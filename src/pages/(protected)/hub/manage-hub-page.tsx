import { memberColumns } from '@/components/custom/manage-hub/manage-hub-members-columns';
import { ManageHubMembersDataTable } from '@/components/custom/manage-hub/manage-hub-members-data-table';
import { rolesColumns } from '@/components/custom/manage-hub/manage-hub-roles-columns';
import { ManageHubRolesDataTable } from '@/components/custom/manage-hub/manage-hub-roles-data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoleEntity } from '@/lib/model/entity/hub/role.entity';
import { UserEntity } from '@/lib/model/entity/user/user.entity';

export const roles: RoleEntity[] = [
  {
    roleName: 'Owner',
    permissions: {
      canCreateEditRoles: true,
      canKickMember: true,
      canDeletePost: true,
      canEditHub: true,
    },
  },
  {
    roleName: 'Admin',
    permissions: {
      canCreateEditRoles: true,
      canKickMember: true,
      canDeletePost: true,
      canEditHub: false,
    },
  },
  {
    roleName: 'Member',
    permissions: {
      canCreateEditRoles: false,
      canKickMember: false,
      canDeletePost: false,
      canEditHub: false,
    },
  },
];

export const members: UserEntity[] = [
  {
    internetIdentity: '728ed52f',
    bio: 'I am a software engineer',
    username: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    profileImageUrl: 'https://example.com/profile.jpg',
    bannerImageUrl: 'https://example.com/banner.jpg',
  },
  {
    internetIdentity: '728ed52f',
    bio: 'I am a software engineer',
    username: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    profileImageUrl: 'https://example.com/profile.jpg',
    bannerImageUrl: 'https://example.com/banner.jpg',
  },
  {
    internetIdentity: '728ed52f',
    bio: 'I am a software engineer',
    username: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    profileImageUrl: 'https://example.com/profile.jpg',
    bannerImageUrl: 'https://example.com/banner.jpg',
  },
];

export default function ManageHubPage() {
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
            <ManageHubMembersDataTable columns={memberColumns} data={members} />
          </TabsContent>
          <TabsContent value="roles" className="w-full">
            <ManageHubRolesDataTable columns={rolesColumns} data={roles} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
