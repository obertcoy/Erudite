import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BadgePlus } from 'lucide-react';
import ManageHubAddRoleForm from './manage-hub-add-role-form';

export default function ManageHubAddRoleButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <BadgePlus className="size-4 mr-2" />
          Add Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add role</DialogTitle>
          <DialogDescription>Add a role to the hub.</DialogDescription>
        </DialogHeader>
        <ManageHubAddRoleForm isNew={true} />
      </DialogContent>
    </Dialog>
  );
}
