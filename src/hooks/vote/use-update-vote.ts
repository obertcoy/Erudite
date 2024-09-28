import { VoteDto } from '@/lib/model/schema/vote/vote.dto';
import { createVoteUpdate, updateVoteUpdate } from '@/services/vote-service';
import { toast } from 'sonner';

export function useUpdateVote() {
  const { updateVoteType, postCanisterId } = updateVoteUpdate();

  const execute = async (voteDto: VoteDto) => {
    try {
      const toastId = toast.loading('Updating vote...');

      const result = await updateVoteType([
        BigInt(voteDto.postId),
        voteDto.voteType,
        postCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Vote updated successfuly', { id: toastId });

      return;
    } catch (err) {
      toast.error('Error: Failed to update vote');
      return null;
    }
  };

  return { execute };
}
