import { UserEntity } from '@/lib/model/entity/user/user.entity';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ManageHubRoleCombobox from './manage-hub-role-combobox';
import { UserMembershipEntity } from '@/lib/model/entity/membership.ts/membership.entity';
import ProfileAvatar from '@/components/ui/profile-avatar';
import useRemoveMembership from '@/hooks/membership/use-remove-membership';
import { useMembershipContext } from '@/contexts/membership-context';

export const memberColumns: ColumnDef<UserMembershipEntity>[] = [
  {
    accessorKey: 'username',
    header: 'Name',
    cell: ({ row }) => {
      const profileImageUrl = row.original.user.profileImageUrl;
      const username = row.original.user.username;

      return (
        <div className="flex items-center gap-x-2">
          <ProfileAvatar
            key={username}
            username={username}
            profileImageUrl={profileImageUrl}
            internetIdentity={row.original.user.internetIdentity}
            disabled={true}
          />
          <h1>{username}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row, roles }: any) => {
      return (
        <ManageHubRoleCombobox
          roles={roles}
          currentRole={row.original.membership.userRole}
          userId={row.original.user.internetIdentity}
          hubId={row.original.membership.hubId}
        />
      );
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex items-center justify-end px-2">Actions</div>
    ),
    cell: ({ row }) => {
      const { execute } = useRemoveMembership();
      const { hasPermissionInHub } = useMembershipContext()
      return (
        <div className="flex items-center gap-x-2 justify-end">
          {
            hasPermissionInHub(row.original.membership.hubId, 'canKickMember') &&
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>Kick</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will kick this user from the hub.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await execute(
                        row.original.user.internetIdentity,
                        row.original.membership.hubId,
                      );
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        </div>
      );
    },
  },
];
