import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PostCardVoteControl = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
      >
        <ArrowUp className="size-4" />
      </Button>
      <div className="text-xs font-bold">32K</div>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
};

export default PostCardVoteControl;
