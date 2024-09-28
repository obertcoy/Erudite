import {
  convertAllRawDetailedPostEntityToDetailedPostEntity,
  DetailedPostEntity,
} from '@/lib/model/entity/post/detailed-post.entity';
import { getHubDetailedPostsQuery } from '@/services/hub-posts-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useGetVoteByPostId } from '../vote/use-get-vote-by-post-id';

export default function useGetHubDetailedPosts(hubId: string) {
  const [detailedPosts, setDetailedPosts] = useState<DetailedPostEntity[]>([]);
  const {
    getHubDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  } = getHubDetailedPostsQuery();

  const { fetchVote } = useGetVoteByPostId();
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
        const detailedPosts =
          convertAllRawDetailedPostEntityToDetailedPostEntity(result.ok);

        const updatedPosts = await Promise.all(
          detailedPosts.map(async (data) => {
            const post = data.post;
            const vote = await fetchVote(post.postId);

            if (vote) post.voteByCurrentUser = vote.voteType;

            return data;
          }),
        );

        setDetailedPosts(updatedPosts);
      }
    };

    fetchHubPosts();
  }, []);

  return { detailedPosts, getHubPostsLoading };
}
