import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Flag, MessageCircle, Share2, Trash } from 'lucide-react';
import PostCardVoteControl from '@/components/custom/post-card/post-card-vote-control';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { useMembershipContext } from '@/contexts/membership-context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeletePost } from '@/hooks/post/use-remove-post';

interface PostCardFooterProps {
  postData: PostEntity;
  hubId: string;
}

export default function PostCardFooter({
  postData,
  hubId,
}: PostCardFooterProps) {
  const { hasPermissionInHub } = useMembershipContext();
  const { execute } = useDeletePost();

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
        {hasPermissionInHub(hubId, 'canDeletePost') && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="destructive"
                size="icon"
                className="hover:bg-red-200 hover:dark:bg-gray-800"
              >
                <Trash className="size-3 " />
              </Button>{' '}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will remove the post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await execute(postData.postId, hubId);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </CardFooter>
  );
}
