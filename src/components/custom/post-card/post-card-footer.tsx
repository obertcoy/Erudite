import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Flag, MessageCircle, Share2 } from 'lucide-react';
import PostCardVoteControl from '@/components/custom/post-card/post-card-vote-control';
import { PostEntity } from '@/lib/model/entity/post/post.entity';

interface PostCardFooterProps {
  postData: PostEntity;
}

export default function PostCardFooter({ postData }: PostCardFooterProps) {
  return (
    <CardFooter className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <PostCardVoteControl postData={postData} />
        <Button
          variant="outline"
          className="text-xs hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <MessageCircle className="mr-2 size-3" />{' '}
          {postData.numComments.toString()} Comments
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Share2 className="size-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Bookmark className="size-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Flag className="size-3" />
        </Button>
      </div>
    </CardFooter>
  );
}
