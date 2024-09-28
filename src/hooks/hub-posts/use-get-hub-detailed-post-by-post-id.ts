import {
  convertRawDetailedPostEntityToDetailedPostEntity,
  DetailedPostEntity,
} from '@/lib/model/entity/post/detailed-post.entity';

import { getHubDetailedPostByPostIdQuery } from '@/services/hub-posts-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useGetVoteByPostId } from '../vote/use-get-vote-by-post-id';
import { VoteEntity } from '@/lib/model/entity/vote/vote.entity';

export default function useGetHubDetailedPostByPostId(postId: string) {
  const [detailedPost, setDetailedPost] = useState<DetailedPostEntity>();
  const {
    getHubDetailedPostByPostID,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  } = getHubDetailedPostByPostIdQuery();

  const { fetchVote } = useGetVoteByPostId();

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
        const detailedPost = convertRawDetailedPostEntityToDetailedPostEntity(
          result.ok,
        );

        const vote = await fetchVote(detailedPost.post.postId);

        if (vote) detailedPost.post.voteByCurrentUser = vote.voteType;

        setDetailedPost(detailedPost);
      }
    };

    fetchHubPosts();
  }, []);

  return { detailedPost, getHubPostsLoading };
}
