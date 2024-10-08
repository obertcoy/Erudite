import { createMembershipUpdate } from '@/services/membership-service';
import { toast } from 'sonner';

export default function useCreateMembership() {
  const { createMembership, hubCanisterId } = createMembershipUpdate();

  const execute = async (hubId: string) => {

    console.log("Joining: ", BigInt(hubId), hubCanisterId);
    
    try {
      const toastId = toast.loading('Joining hub...');
      const result = await createMembership([
        [],
        BigInt(hubId),
        "",
        [hubCanisterId],
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Joined hub succesfully', { id: toastId });

      return result.ok;
    } catch (err) {
      toast.error('Error: Failed to join hub');
      return null;
    }
  };

  return { execute };
}
