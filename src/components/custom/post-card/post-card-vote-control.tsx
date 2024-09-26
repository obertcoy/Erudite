import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { formatShortNumber } from '@/lib/utils';

interface PostCardVoteControlProps {
  numUpVotes: number;
}

export default function PostCardVoteControl({
  numUpVotes,
}: PostCardVoteControlProps) {
  return (
    <div className="flex items-center gap-x-2 bg-muted dark:bg-[#171823] rounded-md">
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
      >
        <ArrowUp className="size-4" />
      </Button>
      <div className="text-xs font-bold">{formatShortNumber(numUpVotes)}</div>
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
}

