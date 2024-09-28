import useServiceContext from '@/hooks/use-service-context';

export function createPostUpdate() {
  const { useUpdateCall: postUpdate } = useServiceContext().postService;
  const hubPostsCanisterId = useServiceContext().hubPostsCanisterId;

  const { call: createPost } = postUpdate({
    functionName: 'createPost',
  });
  return { createPost, hubPostsCanisterId };
}

export function getPostsQuery() {
  const { useQueryCall: postsQuery } = useServiceContext().postService;

  const { call: getPosts, loading: getPostsLoading } = postsQuery({
    functionName: 'getPosts',
    refetchOnMount: false,
    refetchInterval: 0,
  });

  return { getPosts, getPostsLoading };
}
