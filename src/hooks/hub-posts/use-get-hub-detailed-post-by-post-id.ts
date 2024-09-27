import {
  convertRawDetailedPostEntityToDetailedPostEntity,
  DetailedPostEntity,
} from '@/lib/model/entity/post/detailed-post.entity';

import { getHubDetailedPostByPostIdQuery } from '@/services/hub-posts-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useGetHubDetailedPostByPostId(postId: string) {
  const [detailedPost, setDetailedPost] = useState<DetailedPostEntity>();
  const {
    getHubDetailedPostByPostID,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  } = getHubDetailedPostByPostIdQuery();

  useEffect(() => {
    const fetchHubPosts = async () => {
      const result = await getHubDetailedPostByPostID([
        BigInt(postId),
        postCanisterId,
        hubCanisterId,
        userCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error('Error: Failed to fetch posts');
      } else {
        setDetailedPost(
          convertRawDetailedPostEntityToDetailedPostEntity(result.ok),
        );
      }
    };

    fetchHubPosts();
  }, []);

  return { detailedPost, getHubPostsLoading };
}
