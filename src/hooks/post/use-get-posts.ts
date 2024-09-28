import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  convertRawPostEntityToPostEntity,
  PostEntity,
} from '@/lib/model/entity/post/post.entity';
import { getPostsQuery } from '@/services/post-service';

export function useGetPosts(postTitleQuery: string) {
  const [postsData, setPostsData] = useState<PostEntity[] | null>(null);
  const { getPosts, getPostsLoading } = getPostsQuery();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!postTitleQuery) {
        return;
      }

      try {
        const result = await getPosts([postTitleQuery]);
        if (!result || 'err' in result) {
          toast.error('Error on fetching posts: ' + result?.err);
        } else {
          let postEntities = [];

          for (const rawPostEntity of result) {
            postEntities.push(convertRawPostEntityToPostEntity(rawPostEntity));
          }

          setPostsData(postEntities);
        }
      } catch (error) {
        toast.error('Error on fetching posts: ' + error);
      }
    };

    fetchPosts();
  }, [postTitleQuery]);

  return { postsData, getPostsLoading };
}
