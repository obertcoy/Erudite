import FloatingFeedSidebar from '@/components/custom/floating-feed-sidebar/floating-feed-sidebar';
import PostCard, {
  PostCardSkeleton,
} from '@/components/custom/post-card/post-card';
import { Separator } from '@/components/ui/separator';
import useAuthContext from '@/hooks/use-auth-context';
import { FeedFilterState, useFeedFilter } from '@/hooks/use-feed-filter';
import { ChartNoAxesColumnIncreasing, Flame, Rabbit, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useGetJoinedHubDetailedPosts from '@/hooks/hub-posts/use-get-joined-hub-detailed-posts';
import useGetAllDetailedPosts from '@/hooks/hub-posts/use-get-all-detailed-posts';
import { DetailedPostEntity } from '@/lib/model/entity/post/detailed-post.entity';

const renderFeedFilterTitle = (filter: FeedFilterState) => {
  switch (filter) {
    case FeedFilterState.GlobalStream:
      return (
        <>
          <Flame className="size-4" />
          <h1 className="font-bold">Global Stream</h1>
        </>
      );
    case FeedFilterState.FromYourHubs:
      return (
        <>
          <ChartNoAxesColumnIncreasing className="size-4" />
          <h1 className="font-bold">From Your Hubs</h1>
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

  const [joinedHubDetailedPosts, setJoinedHubDetailedPosts] = useState<
    DetailedPostEntity[]
  >([]);
  const [allDetailedPosts, setAllDetailedPosts] = useState<
    DetailedPostEntity[]
  >([]);
  const [loadingJoined, setLoadingJoined] = useState(true);
  const [loadingGlobal, setLoadingGlobal] = useState(true);

  const {
    getHubPostsLoading: getJoinedLoading,
    fetchHubPosts: fetchJoinedHubsDetailedPosts,
  } = useGetJoinedHubDetailedPosts();

  const {
    getHubPostsLoading: getGlobalLoading,
    fetchHubPosts: fetchAllDetailedPosts,
  } = useGetAllDetailedPosts();

  // Fetch posts only on mount or when the user joins a new hub
  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingJoined(true);
      const joinedPosts = await fetchJoinedHubsDetailedPosts();

      if (joinedPosts) {
        setJoinedHubDetailedPosts(joinedPosts);
        setLoadingJoined(false);
      }

      setLoadingGlobal(true);
      const allPosts = await fetchAllDetailedPosts();
      if (allPosts) {
        setAllDetailedPosts(allPosts);
        setLoadingGlobal(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="w-full flex flex-col items-center py-4">
      <div className="container flex flex-col items-center gap-y-4">
        <div className="flex justify-center gap-x-4">
          <div className="flex w-full flex-col items-center gap-y-4">
            <div className="p-3 self-start flex items-center gap-x-2 bg-background min-w-[682px]">
              {renderFeedFilterTitle(filter)}
            </div>
            {filter === FeedFilterState.GlobalStream ? (
              <>
                {loadingGlobal ? (
                  [1, 2, 3, 4, 5].map((_, index) => (
                    <React.Fragment key={index}>
                      <Separator />
                      <PostCardSkeleton key={index} />
                    </React.Fragment>
                  ))
                ) : allDetailedPosts.length === 0 ? (
                  <Alert className="w-[651px]">
                    <Rabbit className="h-4 w-4" />
                    <AlertTitle>No posts yet!</AlertTitle>
                    <AlertDescription>
                      Start posting now to see your posts here or join hubs.
                    </AlertDescription>
                  </Alert>
                ) : (
                  allDetailedPosts.map((post, index) => (
                    <React.Fragment key={index}>
                      <Separator />
                      <PostCard key={index} data={post} />
                    </React.Fragment>
                  ))
                )}
              </>
            ) : (
              <>
                {loadingJoined ? (
                  [1, 2, 3, 4, 5].map((_, index) => (
                    <React.Fragment key={index}>
                      <Separator />
                      <PostCardSkeleton key={index} />
                    </React.Fragment>
                  ))
                ) : joinedHubDetailedPosts.length === 0 ? (
                  <Alert className="w-[651px]">
                    <Rabbit className="h-4 w-4" />
                    <AlertTitle>No posts yet!</AlertTitle>
                    <AlertDescription>
                      Start posting now to see your posts here or join hubs.
                    </AlertDescription>
                  </Alert>
                ) : (
                  joinedHubDetailedPosts.map((post, index) => (
                    <React.Fragment key={index}>
                      <Separator />
                      <PostCard key={index} data={post} />
                    </React.Fragment>
                  ))
                )}
              </>
            )}
          </div>
          <FloatingFeedSidebar />
        </div>
      </div>
    </main>
  );
}
