import { useGetAllHubs } from '@/hooks/hub/use-get-all-hubs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateDynamicRoutePath, truncateText } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import { Link } from 'react-router-dom';

export default function ExploreHubsPage() {
  const { hubs, getAllHubsLoading } = useGetAllHubs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Hubs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getAllHubsLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => <HubSkeleton key={index} />)
          : hubs.map((hub) => (
              <Card key={hub.hubID} className="overflow-hidden">
                <img
                  src={hub.hubBannerImageUrl}
                  alt={`${hub.hubName} banner`}
                  className="w-full h-20 object-cover"
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">
                    {truncateText(hub.hubName, 20)}
                  </CardTitle>
                  <CardDescription className="text-sm h-12 overflow-hidden">
                    {truncateText(hub.hubDescription, 60)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Link
                    to={generateDynamicRoutePath(RouteEnum.HUB, {
                      hubId: hub.hubID,
                    })}
                  >
                    <Button variant="outline" className="w-full text-sm h-8">
                      View Hub <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}

function HubSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-20" />
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-12 w-full mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}
