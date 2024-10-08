import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  RoleEntity,
  RoleEntityWithHubId,
} from '@/lib/model/entity/hub/role.entity';
import { RoleDto, RoleSchema } from '@/lib/model/schema/hub/role.dto';
import { useCreateEditHubRoles } from '@/hooks/hub/use-create-edit-hub-roles';
import { useMembershipContext } from '@/contexts/membership-context';

interface ManageHubAddRoleFormProps {
  isNew?: boolean;
  roleEntity?: RoleEntity;
  hubId: string;
}

export default function ManageHubAddRoleForm({
  roleEntity,
  isNew = false,
  hubId,
}: ManageHubAddRoleFormProps) {
  const form = useForm<RoleDto>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      roleName: roleEntity?.roleName ?? '',
      permissions: {
        canCreateEditRoles: !!roleEntity?.permissions.canCreateEditRoles,
        canDeletePost: !!roleEntity?.permissions.canDeletePost,
        canEditHub: !!roleEntity?.permissions.canEditHub,
        canKickMember: !!roleEntity?.permissions.canKickMember,
      },
      default: !!roleEntity?.default,
    },
  });

  const { execute } = useCreateEditHubRoles();

  const onSubmit = async (hubRoles: RoleDto) => {
    console.log(hubId);

    await execute(hubId ?? '', hubRoles, isNew, roleEntity?.roleName);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-6"
      >
        <FormField
          control={form.control}
          name="roleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormDescription>
                This is the name of the role you want to add.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="Tech Priest"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-4">
          <div className="space-y-2">
            <h1 className="text-sm font-medium">Permissions</h1>
            <p className="text-sm text-muted-foreground">
              These are the permissions that the role will have in the hub.
            </p>
          </div>
          <FormField
            control={form.control}
            name="permissions.canCreateEditRoles"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Create and Edit Roles</FormLabel>
                  <FormDescription>
                    Can create and edit roles in the hub.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.canDeletePost"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Delete Posts</FormLabel>
                  <FormDescription>
                    Can delete posts from the hub.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.canEditHub"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Edit Hub</FormLabel>
                  <FormDescription>Can edit the hub settings.</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.canKickMember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Kick Members</FormLabel>
                  <FormDescription>
                    Can kick members from the hub.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-fit self-end">
          {isNew ? 'Add' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
