import { VoteDto } from '@/lib/model/schema/vote/vote.dto';
import { createVoteUpdate } from '@/services/vote-service';
import { toast } from 'sonner';

export function useCreateVote() {
  const { createUserPostVote, postCanisterId } = createVoteUpdate();

  const execute = async (voteDto: VoteDto) => {
    try {
      const toastId = toast.loading('Adding vote...');

      const result = await createUserPostVote([
        BigInt(voteDto.postId),
        voteDto.voteType,
        postCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Vote added successfuly', { id: toastId });

      return;
    } catch (err) {
      toast.error('Error: Failed to add vote');
      return null;
    }
  };

  return { execute };
}
