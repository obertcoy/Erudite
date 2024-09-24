import { Button } from '@/components/ui/button';
import { FeedFilterState, useFeedFilter } from '@/hooks/use-feed-filter';
import {
  ChartNoAxesColumnIncreasing,
  Flame,
  SlidersHorizontal,
  Sun,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const FloatingFeedSidebarFilter = () => {
  const { filter, setFilter } = useFeedFilter();

  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="text-sm font-medium flex items-center gap-x-2">
        <SlidersHorizontal className="size-4" />
        Feed Filter
      </div>
      <TooltipProvider>
        <div className="flex items-center gap-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter(FeedFilterState.Hot)}
                className={cn(filter === FeedFilterState.Hot && 'bg-muted')}
              >
                <Flame className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hot posts</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter(FeedFilterState.Trending)}
                className={cn(
                  filter === FeedFilterState.Trending && 'bg-muted',
                )}
              >
                <ChartNoAxesColumnIncreasing className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Trending posts</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter(FeedFilterState.Fresh)}
                className={cn(filter === FeedFilterState.Fresh && 'bg-muted')}
              >
                <Sun className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fresh posts</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FloatingFeedSidebarFilter;
