import {
  convertAllRawDetailedPostEntityToDetailedPostEntity,
  DetailedPostEntity,
} from '@/lib/model/entity/post/detailed-post.entity';

import { getUserDetailedPostsQuery } from '@/services/hub-posts-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useGetUserDetailedPosts(userId: string) {
  const [detailedPosts, setDetailedPosts] = useState<DetailedPostEntity[]>([]);
  const {
    getUserDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  } = getUserDetailedPostsQuery();

  useEffect(() => {
    const fetchHubPosts = async () => {
      const result = await getUserDetailedPosts([
        [userId],
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
