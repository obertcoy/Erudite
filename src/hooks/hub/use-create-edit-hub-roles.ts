import { useMembershipContext } from '@/contexts/membership-context';
import {
  HubEntity,
  convertRawHubEntityToHubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { RoleEntity } from '@/lib/model/entity/hub/role.entity';
import { RuleEntity } from '@/lib/model/entity/hub/rules.entity';
import { HubDto } from '@/lib/model/schema/hub/hub.dto';
import {
  compressImageURLToUint8Array,
  convertFileToUint8Array,
} from '@/lib/utils';
import {
  createEditHubRolesUpdate,
  createHubUpdate,
  getHubByIdQuery,
} from '@/services/hub-service';
import { toast } from 'sonner';

export function useCreateEditHubRoles() {
  const { createEditHubRoles, hubCanisterId, userHubMembershipCanisterId } =
    createEditHubRolesUpdate();

  const { getHubByID } = getHubByIdQuery();
  const { fetchUserMemberships } = useMembershipContext()

  const execute = async (
    hubId: string,
    updatedRole: RoleEntity,
    isNew: boolean,
    oldRoleName?: string,
    isDelete: boolean = false,
  ) => {
    try {
      const toastId = toast.loading('Updating role...');

      const hubResult = await getHubByID([BigInt(hubId)]);

      if (!hubResult || 'err' in hubResult) {
        toast.error(hubResult?.err, { id: toastId });
        return null;
      }

      const hub = convertRawHubEntityToHubEntity(hubResult.ok);

      let hubRoles: RoleEntity[];

      if (isDelete) {
        hubRoles = hub.hubRoles.filter((role) => role.roleName !== oldRoleName);
      } else if (isNew) {
        hubRoles = [...hub.hubRoles, updatedRole];
      } else {
        hubRoles = hub.hubRoles.map((role) =>
          role.roleName === oldRoleName ? updatedRole : role,
        );
      }

      const result = await createEditHubRoles([
        BigInt(hubId),
        hubRoles,
        hubCanisterId,
        userHubMembershipCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      fetchUserMemberships()
      toast.success('Role updated successfuly', { id: toastId });
      return;
    } catch (err) {
      toast.error('Error: Failed to update role');
      console.log(err);

      return null;
    }
  };

  return { execute };
}
