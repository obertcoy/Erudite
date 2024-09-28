import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { formatShortNumber } from '@/lib/utils';
import { useCreateVote } from '@/hooks/vote/use-create-vote';
import { useUpdateVote } from '@/hooks/vote/use-update-vote';
import { VoteDto, VoteType } from '@/lib/model/schema/vote/vote.dto';
import { useState } from 'react';
import { toast } from 'sonner';

interface PostCardVoteControlProps {
  postData: PostEntity;
}

export default function PostCardVoteControl({
  postData,
}: PostCardVoteControlProps) {
  const { execute: executeCreateVote } = useCreateVote();
  const { execute: executeUpdateVote } = useUpdateVote();

  const [optimisticVoteType, setOptimisticVoteType] = useState(
    postData.voteByCurrentUser,
  );
  const [optimisticVoteCount, setOptimisticVoteCount] = useState(
    Number(postData.numUpVotes),
  );
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteDto: VoteDto) => {
    if (isVoting) return;
    setIsVoting(true);

    const isVoted = optimisticVoteType !== '';
    const isUpvote = voteDto.voteType === VoteType.UP;

    const previousVote = optimisticVoteType;
    const previousVoteCount = optimisticVoteCount;

    if (isVoted && optimisticVoteType == voteDto.voteType) {
      toast.error('Cannot undo vote');
      setIsVoting(false);
      return;
    }

    if (isUpvote) {
      setOptimisticVoteCount((prev) => prev + 1);
    } else {
      setOptimisticVoteCount((prev) => prev - 1);
    }

    setOptimisticVoteType(voteDto.voteType);

    try {
      if (isVoted) {
        await executeUpdateVote(voteDto);
      } else {
        await executeCreateVote(voteDto);
      }
    } catch (error) {
      // Rollback optimistic update in case of error
      setOptimisticVoteType(previousVote);
      setOptimisticVoteCount(previousVoteCount);
      toast.error('Failed to register vote');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2 bg-muted dark:bg-[#171823] rounded-md">
      <Button
        variant={`${optimisticVoteType == VoteType.UP ? 'default' : 'outline'}`}
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
        onClick={async () =>
          handleVote({ postId: postData.postId, voteType: VoteType.UP })
        }
        disabled={isVoting}
      >
        <ArrowUp className="size-4" />
      </Button>
      <div className="text-xs font-bold">
        {formatShortNumber(Number(optimisticVoteCount))}
      </div>
      <Button
        variant={`${
          optimisticVoteType == VoteType.DOWN ? 'default' : 'outline'
        }`}
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
        onClick={async () =>
          handleVote({ postId: postData.postId, voteType: VoteType.DOWN })
        }
        disabled={isVoting} // Disable while voting
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
}
