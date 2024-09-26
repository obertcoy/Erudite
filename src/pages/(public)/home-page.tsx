import FloatingFeedSidebar from '@/components/custom/floating-feed-sidebar/floating-feed-sidebar';
import PostCard, { PostCardSkeleton } from '@/components/custom/post-card/post-card';
import { Separator } from '@/components/ui/separator';
import useGetUserDetailedPosts from '@/hooks/hub-posts/use-get-user-detailed-posts';
import useAuthContext from '@/hooks/use-auth-context';
import { FeedFilterState, useFeedFilter } from '@/hooks/use-feed-filter';
import { ChartNoAxesColumnIncreasing, Flame, Sun } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

const renderFeedFilterTitle = (filter: FeedFilterState) => {
  switch (filter) {
    case FeedFilterState.Hot:
      return (
        <>
          <Flame className="size-4" />
          <h1 className="font-bold">Hot Posts</h1>
        </>
      );
    case FeedFilterState.Trending:
      return (
        <>
          <ChartNoAxesColumnIncreasing className="size-4" />
          <h1 className="font-bold">Trending Posts</h1>
        </>
      );
    case FeedFilterState.Fresh:
      return (
        <>
          <Sun className="size-4" />
          <h1 className="font-bold">Fresh Posts</h1>
        </>
      );
    default:
      return '';
  }
};

export default function HomePage() {
  const { filter } = useFeedFilter();

  const { user, getIdentity } = useAuthContext();

  const { detailedPosts, getHubPostsLoading } = useGetUserDetailedPosts(
    getIdentity()?.getPrincipal().toString() ?? user?.internetIdentity ?? '',
  ); // ini ngambil yang di post user -> temp

  return (
    <main className="w-full flex flex-col items-center py-4">
      <div className="w-full max-w-[69rem]">
        <div className="p-3 flex items-center gap-x-2 bg-background">
          {renderFeedFilterTitle(filter)}
        </div>
      </div>
      <div className="container flex flex-col items-center gap-y-4">
        <div className="flex justify-center gap-x-4">
          <div className="flex w-full flex-col items-center gap-y-4">
            {getHubPostsLoading
              ? [1, 2, 3, 4, 5].map((_, index) => (
                  <React.Fragment key={index}>
                    <Separator />
                    <PostCardSkeleton key={index} />
                  </React.Fragment>
                ))
              : detailedPosts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Separator />
                    <PostCard key={index} data={post} />
                  </React.Fragment>
                ))}
          </div>
          <FloatingFeedSidebar />
        </div>
      </div>
    </main>
  );
}
