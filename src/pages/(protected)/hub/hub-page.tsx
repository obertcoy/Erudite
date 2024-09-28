import FloatingHubDetailsSidebar from '@/components/custom/floating-hub-details-sidebar/floating-hub-details-sidebar';
import PostCard, {
  PostCardSkeleton,
} from '@/components/custom/post-card/post-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FeedFilterState, useFeedFilter } from '@/hooks/use-feed-filter';
import { ChartNoAxesColumnIncreasing, Flame, Rabbit, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetHubById } from '@/hooks/hub/use-get-hub';
import { useParams } from 'react-router';
import React from 'react';
import useCreateMembership from '@/hooks/membership/use-create-membership';
import { useHubContext } from '@/contexts/hub-context';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import useGetHubDetailedPosts from '@/hooks/hub-posts/use-get-hub-detailed-posts';
import { useMembershipContext } from '@/contexts/membership-context';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

export default function HubPage() {
  const { hubId } = useParams();
  const { hubData } = useGetHubById(hubId);
  const { execute } = useCreateMembership();
  const { detailedPosts, getHubPostsLoading } = useGetHubDetailedPosts(
    hubId ?? '',
  );
  const { joinedHubs, isHubJoined, fetchJoinedHubs } = useHubContext();

  const { hasAnyPermissionInHub, hasPermissionInHub } = useMembershipContext();

  const { filter } = useFeedFilter();

  const handleJoin = async () => {
    if (hubId) {
      await execute(hubId);
      fetchJoinedHubs();
    }
  };

  if (!hubData || !joinedHubs) {
    return;
  }

  const isJoined = isHubJoined(hubId ?? hubData.hubID);

  return (
    <main className="w-full flex flex-col gap-y-4  items-center pb-4">
      <div className="w-full flex flex-col border-b shadow-sm dark:shadow-none">
        <div className="flex items-center justify-start w-full bg-gray-200 dark:bg-gray-800 h-64">
          <img
            src={hubData.hubBannerImageUrl}
            alt=""
            onError={(e) => (e.currentTarget.style.display = 'none')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col p-8 gap-y-2">
          <div className="flex items-center gap-x-2">
            <h1 className="text-2xl font-medium">{hubData.hubName}</h1>
            <Badge variant="outline">21K Members</Badge>
          </div>
          <div className="flex items-center gap-x-2">
            {!isJoined ? (
              <Button className="w-fit" onClick={handleJoin}>
                Join
              </Button>
            ) : (
              <>
                {(hasPermissionInHub(hubId ?? hubData.hubID, 'canCreateEditRoles') || hasPermissionInHub(hubId ?? hubData.hubID, 'canEditHub'))  && (
                  <Link
                    to={generateDynamicRoutePath(RouteEnum.MANAGE_HUB, {
                      hubId: hubId ?? hubData.hubID,
                    })}
                  >
                    <Button variant="secondary">
                      <Wrench className="size-4 mr-2" />
                      Manage
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center gap-y-4">
        <div className="flex justify-center gap-x-4">
          <div className="flex flex-col items-center gap-y-4">
            <div className="p-3 flex self-start items-center gap-x-2 bg-background min-w-[682px]">
              {renderFeedFilterTitle(filter)}
            </div>
            {getHubPostsLoading ? (
              [1, 2, 3, 4, 5].map((_, index) => (
                <React.Fragment key={index}>
                  <Separator />

                  <PostCardSkeleton key={index} />
                </React.Fragment>
              ))
            ) : detailedPosts.length === 0 ? (
              <Alert className="w-[651px]">
                <Rabbit className="h-4 w-4" />
                <AlertTitle>No posts yet!</AlertTitle>
                <AlertDescription>
                  Start posting now to see your posts here or join hubs.
                </AlertDescription>
              </Alert>
            ) : (
              detailedPosts.map((post, index) => (
                <React.Fragment key={index}>
                  <Separator />
                  <PostCard key={index} data={post} />
                </React.Fragment>
              ))
            )}
          </div>
          <FloatingHubDetailsSidebar hubData={hubData} />
        </div>
      </div>
    </main>
  );
}
