import { removeMembershipUpdate } from '@/services/membership-service';
import { toast } from 'sonner';
import useGetUserHubByRole from './use-get-users-in-hub-by-role';

export default function useRemoveMembership() {
    const { removeMembership, hubCanisterId } = removeMembershipUpdate();

  const execute = async (userId: string, hubId: string) => {
    try {
      const toastId = toast.loading('Kicking member...');
      const result = await removeMembership([
        [userId],
        BigInt(hubId),
        hubCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Succesfully removed', { id: toastId });

      return result.ok;
    } catch (err) {
      toast.error('Error: Failed to remove');
      return null;
    }
  };

  return { execute };
}
