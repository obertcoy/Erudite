import {
  convertRawVoteEntityToVoteEntity,
  VoteEntity,
} from '@/lib/model/entity/vote/vote.entity';
import { getVoteByPostIDQuery } from '@/services/vote-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useGetVoteByPostId(postId?: string) {
  const [vote, setVote] = useState<VoteEntity>();
  const { getVoteByPostID, getVoteLoading } = getVoteByPostIDQuery();

  const fetchVote = async (postId: string) => {
    try {
      const result = await getVoteByPostID([BigInt(postId)]);
      if (!result || 'err' in result) {
        // toast.error('Error on fetching vote: ' + result?.err); Only showing that the user has not vote
        return null;
      } else {
          setVote(convertRawVoteEntityToVoteEntity(result.ok));
          
          console.log(convertRawVoteEntityToVoteEntity(result.ok));
          
        return convertRawVoteEntityToVoteEntity(result.ok);
      }
    } catch (error) {
        toast.error('Error on fetching vote: ' + error);
        return null
    }
  };
  useEffect(() => {
    if (postId) fetchVote(postId);
  }, [postId]);

  return { vote, fetchVote };
}
