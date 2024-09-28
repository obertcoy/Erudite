import { Card } from '@/components/ui/card';
import PostCardHeader from '@/components/custom/post-card/post-card-header';
import PostCardContent from '@/components/custom/post-card/post-card-content';
import PostCardFooter from '@/components/custom/post-card/post-card-footer';
import FloatingPostDetailsSidebar from '@/components/custom/floating-post-details-sidebar/floating-post-details-sidebar';
import { Link, ScrollRestoration, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RouteEnum } from '@/lib/enum/route-enum';
import CommentsSection from '@/components/custom/comments-section/comments-section';
import useGetHubDetailedPostByPostId from '@/hooks/hub-posts/use-get-hub-detailed-post-by-post-id';
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormDescription,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  CommentDto,
  CommentSchema,
} from '@/lib/model/schema/comment/comment.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateComment } from '@/hooks/comment/use-create-comment';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PostPage() {
  const { postId } = useParams();

  const { detailedPost, getHubPostsLoading } = useGetHubDetailedPostByPostId(
    postId ?? '',
  );
  const { execute } = useCreateComment();

  const [refetchComment, setRefetchComment] = useState(false);

  const form = useForm<CommentDto>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      commentBody: '',
      postId: postId,
    },
  });

  const onSubmit = async (commentDto: CommentDto) => {
    await execute(commentDto);

    setRefetchComment(!refetchComment);
    form.reset();
  };

  return (
    <main className="w-full flex items-center justify-center py-6">
      <div className="container w-full flex justify-center items-start gap-x-4">
        {getHubPostsLoading || !detailedPost ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <div className="flex items-start">
              <Link to={RouteEnum.HOME} className="py-6">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ChevronLeft className="size-4" />
                </Button>
              </Link>
              <div className="flex flex-col items-center  gap-y-2">
                <Card className="w-full max-w-3xl rounded-xl shadow-none border-none">
                  <PostCardHeader data={detailedPost} />
                  <PostCardContent
                    postData={detailedPost.post}
                    key={detailedPost.post.postId}
                  />
                  <PostCardFooter
                    postData={detailedPost.post}
                      key={detailedPost.post.postId}
                      hubId={detailedPost.hub.hubID}
                  />
                </Card>
                <div className="w-full max-w-3xl px-6  flex flex-col gap-y-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="commentBody"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Add a comment</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Write your comment here"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter your comment here. Be respectful and follow
                              community guidelines.
                            </FormDescription>
                            <div className="hidden">
                              {form.formState.errors.commentBody &&
                                toast.error(
                                  form.formState.errors.commentBody.message,
                                )}
                            </div>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="hidden">
                        Submit Comment
                      </Button>
                    </form>
                  </Form>
                  <Separator />
                  <CommentsSection
                    postId={postId ?? ''}
                    refetchComment={refetchComment}
                  />
                </div>
              </div>
            </div>
            <FloatingPostDetailsSidebar hubData={detailedPost.hub} />
          </>
        )}
      </div>
      <ScrollRestoration />
    </main>
  );
}
