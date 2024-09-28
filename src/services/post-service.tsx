import useServiceContext from '@/hooks/use-service-context';

export function createPostUpdate() {
  const { useUpdateCall: postUpdate } = useServiceContext().postService;
  const hubPostsCanisterId =
    useServiceContext().hubPostsCanisterId;

  const { call: createPost } = postUpdate({
    functionName: 'createPost',
  });
  return { createPost, hubPostsCanisterId };
}

