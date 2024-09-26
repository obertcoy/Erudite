import useServiceContext from '@/hooks/use-service-context';

export function createPostUpdate() {
  const { useUpdateCall: postUpdate } = useServiceContext().postService;
  const hubCanisterId =
    useServiceContext().hubCanisterId;

  const { call: createPost } = postUpdate({
    functionName: 'createPost',
  });
  return { createPost, hubCanisterId };
}
