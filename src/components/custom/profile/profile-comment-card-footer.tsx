import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import CommentCardVoteControl from '@/components/custom/comments-section/comment-card-vote-control';

export default function ProfileCommentCardFooter() {
  return (
    <CardFooter className="flex items-center justify-between ps-8">
      <div className="flex items-center gap-x-2">
        <CommentCardVoteControl />
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Flag className="size-3" />
        </Button>
      </div>
    </CardFooter>
  );
}
