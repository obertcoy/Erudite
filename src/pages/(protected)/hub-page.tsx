import FloatingHubDetailsSidebar from '@/components/custom/floating-hub-details-sidebar/floating-hub-details-sidebar';
import PostCard from '@/components/custom/post-card/post-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FeedFilterState, useFeedFilter } from '@/hooks/use-feed-filter';
import { ChartNoAxesColumnIncreasing, Flame, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetHubById } from '@/hooks/hub/use-get-hub';
import { useParams } from 'react-router';
import React from 'react';
import useCreateMembership from '@/hooks/membership/use-create-membership';

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

export default function HubPage() {
  const { hubId } = useParams();
  const { hubData } = useGetHubById(hubId);
  const { execute } = useCreateMembership();

  const { filter } = useFeedFilter();

  const handleJoin = async () => {
    if (hubId) await execute(hubId);
  };

  if (!hubData) {
    return;
  }

  return (
    <main className="w-full flex flex-col gap-y-4  items-center pb-4">
      <div className="w-full flex flex-col border-b shadow-sm dark:shadow-none">
        <div className="flex items-center justify-start w-full bg-gray-200 dark:bg-gray-800 h-48">
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
          <Button className="w-fit" onClick={handleJoin}>Join</Button>
        </div>
      </div>
      <div className="w-full max-w-[69rem]">
        <div className="p-3 flex items-center gap-x-2 bg-background">
          {renderFeedFilterTitle(filter)}
        </div>
      </div>
      <div className="container flex flex-col items-center gap-y-4">
        <div className="flex justify-center gap-x-4">
          <div className="flex flex-col items-center gap-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <React.Fragment key={index}>
                <Separator />
                <PostCard key={item} />
              </React.Fragment>
            ))}
          </div>
          <FloatingHubDetailsSidebar hubData={hubData} />
        </div>
      </div>
    </main>
  );
}
