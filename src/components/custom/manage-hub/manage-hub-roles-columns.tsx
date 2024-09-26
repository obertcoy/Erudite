import { RoleEntity } from '@/lib/model/entity/hub/role.entity';
import { ColumnDef } from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Settings, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ManageHubAddRoleForm from './manage-hub-add-role-form';

export const rolesColumns: ColumnDef<RoleEntity>[] = [
  {
    accessorKey: 'roleName',
    header: 'Name',
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex items-center justify-end px-2">Actions</div>
    ),
    cell: ({ row }) => {
      const roleEntity = row.original;

      return (
        <div className="flex items-center gap-x-2 justify-end">
          <Dialog>
            <DialogTrigger>
              <Button variant="outline" size="icon">
                <Settings className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit role</DialogTitle>
                <DialogDescription>
                  Edit the role and its permissions.
                </DialogDescription>
              </DialogHeader>
              <ManageHubAddRoleForm roleEntity={roleEntity} />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline" size="icon">
                <Trash className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete the role.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
