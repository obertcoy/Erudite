import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { formatShortNumber } from '@/lib/utils';
import { useCreateVote } from '@/hooks/vote/use-create-vote';
import { useUpdateVote } from '@/hooks/vote/use-update-vote';
import { VoteDto, VoteType } from '@/lib/model/schema/vote/vote.dto';
import { useState } from 'react';

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
    Number(postData.numUpVotes) - Number(postData.numDownVotes),
  );

  console.log(optimisticVoteType);

  const handleVote = async (voteDto: VoteDto) => {
    const isVoted = optimisticVoteType !== '';
    const isUpvote = voteDto.voteType === VoteType.UP;

    const previousVote = optimisticVoteType;
    const previousVoteCount = optimisticVoteCount;

    
    if (isVoted && optimisticVoteType == voteDto.voteType) {
      setOptimisticVoteType('');
      setOptimisticVoteCount((prevCount) =>
        isUpvote ? prevCount - 1 : prevCount + 1,
      );
    } else {
      if (optimisticVoteType == VoteType.UP) {
        setOptimisticVoteCount((prevCount) => prevCount - 1);
      } else if (optimisticVoteType == VoteType.DOWN) {
        setOptimisticVoteCount((prevCount) => prevCount + 1);
      }
      setOptimisticVoteType(voteDto.voteType);
      setOptimisticVoteCount((prevCount) =>
        isUpvote ? prevCount + 1 : prevCount - 1,
      );
    }

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
      >
        <ArrowUp className="size-4" />
      </Button>
      <div className="text-xs font-bold">
        {formatShortNumber(Number(optimisticVoteCount))}
      </div>
      <Button
        variant={`${optimisticVoteType == VoteType.DOWN ? 'default' : 'outline'}`}
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
        onClick={async () =>
          handleVote({ postId: postData.postId, voteType: VoteType.DOWN })
        }
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
}
