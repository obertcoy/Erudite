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

export const memberColumns: ColumnDef<UserEntity>[] = [
  {
    accessorKey: 'username',
    header: 'Name',
    cell: ({ row }) => {
      const profileImageUrl = row.original.profileImageUrl;
      const username = row.original.username;

      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="size-8">
            <AvatarImage src={profileImageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{username}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: () => {
      return <ManageHubRoleCombobox />;
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex items-center justify-end px-2">Actions</div>
    ),
    cell: () => (
      <div className="flex items-center gap-x-2 justify-end">
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
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];
