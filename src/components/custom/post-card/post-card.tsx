import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import PostCardHeader from '@/components/custom/post-card/post-card-header';
import PostCardContent from '@/components/custom/post-card/post-card-content';
import PostCardFooter from '@/components/custom/post-card/post-card-footer';
import { Link } from 'react-router-dom';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { DetailedPostEntity } from '@/lib/model/entity/post/detailed-post.entity';
import { Skeleton } from '@/components/ui/skeleton';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';

interface PostCardProps {
  data: DetailedPostEntity;
}

export default function PostCard({ data }: PostCardProps) {
  return (
    <Link to={generateDynamicRoutePath(RouteEnum.POST, {postId: data.post.postId})}>
      <Card className="w-full max-w-3xl rounded-xl hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer shadow-none border-none">
        <PostCardHeader data={data} />
        <PostCardContent postData={data.post} />
        <PostCardFooter postData={data.post} />
      </Card>
    </Link>
  );
}

export function PostCardSkeleton() {
  return (
    <Card className="flex w-full max-w-3xl rounded-xl hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer shadow-none border-none">
      <CardHeader className="pb-3 flex flex-col justify-center gap-y-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}
