import { useMembershipContext } from '@/contexts/membership-context';
import {
  membershipRoleUpdate,
} from '@/services/membership-service';
import { toast } from 'sonner';

export default function useUpdateMembershipRole() {
  const { updateMembershipRole, hubCanisterId } = membershipRoleUpdate();
  const { fetchUserMemberships } = useMembershipContext()

  const execute = async (userId: string, newRole: string, hubId: string) => {
    try {
      const toastId = toast.loading('Updating role...');
      const result = await updateMembershipRole([
        [userId],
        newRole,
        BigInt(hubId),
        hubCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }
      fetchUserMemberships()
      toast.success('Role succesfully updated', { id: toastId });

      return result.ok;
    } catch (err) {
      toast.error('Error: Failed to update role');
      return null;
    }
  };

  return { execute };
}
