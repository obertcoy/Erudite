import FloatingHubDetailsSidebar from '@/components/custom/floating-hub-details-sidebar/floating-hub-details-sidebar';
import PostCard from '@/components/custom/post-card/post-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FeedFilterState, useFeedFilter } from '@/hooks/use-feed-filter';
import { ChartNoAxesColumnIncreasing, Flame, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const { filter } = useFeedFilter();

  return (
    <main className="w-full flex flex-col gap-y-4  items-center pb-4">
      <div className="w-full flex flex-col border-b shadow-sm dark:shadow-none">
        <div className="flex items-center justify-start w-full bg-gray-200 dark:bg-gray-800 h-64" />
        <div className="flex flex-col p-8 gap-y-2">
          <div className="flex items-center gap-x-2">
            <h1 className="text-2xl font-medium">Adeptus Mechanicus</h1>
            <Badge variant="outline">21K Members</Badge>
          </div>
          <div className="flex items-center gap-x-2">
            <Button className="w-fit">Join</Button>
            <Link to="/hubs/adeptus-mechanicus/settings">
              <Button variant="secondary">
                <Wrench className="size-4 mr-2" />
                Manage
              </Button>
            </Link>
          </div>
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
              <>
                <Separator />
                <PostCard key={item} />
              </>
            ))}
          </div>
          <FloatingHubDetailsSidebar />
        </div>
      </div>
    </main>
  );
}
