import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PostCardVoteControl = () => {
  return (
    <div className="flex items-center gap-x-2 bg-muted dark:bg-[#171823] rounded-md">
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
      >
        <ArrowUp className="size-4" />
      </Button>
      <div className="text-xs font-bold">32K</div>
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-gray-200 hover:dark:bg-gray-800"
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
};

export default PostCardVoteControl;
