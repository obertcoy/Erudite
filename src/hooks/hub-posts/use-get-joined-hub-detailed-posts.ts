import {
    convertAllRawDetailedPostEntityToDetailedPostEntity,
    DetailedPostEntity,
  } from '@/lib/model/entity/post/detailed-post.entity';
  import {
    getJoinedHubDetailedPostsQuery,
  } from '@/services/hub-posts-service';
  import { useEffect, useState } from 'react';
  import { toast } from 'sonner';
  import { useGetVoteByPostId } from '../vote/use-get-vote-by-post-id';
  
  export default function useGetJoinedHubDetailedPosts() {
    const [detailedPosts, setDetailedPosts] = useState<DetailedPostEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true); // State for loading
    const {
      getJoinedHubDetailedPosts,
      postCanisterId,
      hubCanisterId,
      userCanisterId,
      userHubMembershipCanisterId,
    } = getJoinedHubDetailedPostsQuery();
  
    const { fetchVote } = useGetVoteByPostId();
  
    const fetchHubPosts = async () => {
      setIsLoading(true); // Set loading state to true
      const result = await getJoinedHubDetailedPosts([
        postCanisterId,
        hubCanisterId,
        userCanisterId,
        userHubMembershipCanisterId,
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

        return updatedPosts
      }
      setIsLoading(false); // Set loading state to false
    };
  
    // Fetch posts only on mount or when specific conditions change
    useEffect(() => {
      fetchHubPosts();
    }, []); // Empty dependency array to run only on mount
  
    return { detailedPosts, fetchHubPosts, getHubPostsLoading: isLoading };
  }
  