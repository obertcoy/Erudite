import {
  convertAllRawDetailedPostEntityToDetailedPostEntity,
  DetailedPostEntity,
} from '@/lib/model/entity/post/detailed-post.entity';
import { getHubDetailedPostsQuery } from '@/services/hub-posts-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useGetHubDetailedPosts(hubId: string) {
  const [detailedPosts, setDetailedPosts] = useState<DetailedPostEntity[]>([]);
  const {
    getHubDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  } = getHubDetailedPostsQuery();

  useEffect(() => {
    const fetchHubPosts = async () => {
      const result = await getHubDetailedPosts([
        BigInt(hubId),
        postCanisterId,
        hubCanisterId,
        userCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error('Error: Failed to fetch posts');
      } else {
        setDetailedPosts(
          convertAllRawDetailedPostEntityToDetailedPostEntity(result.ok),
        );
      }
    };

    fetchHubPosts();
  }, []);

  return { detailedPosts, getHubPostsLoading };
}
