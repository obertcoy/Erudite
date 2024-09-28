import useServiceContext from '@/hooks/use-service-context';

export function createPostUpdate() {
  const { useUpdateCall: postUpdate } = useServiceContext().postService;
  const hubPostsCanisterId = useServiceContext().hubPostsCanisterId;

  const { call: createPost } = postUpdate({
    functionName: 'createPost',
  });
  return { createPost, hubPostsCanisterId };
}

export function deletePostUpdate() {
  const { useUpdateCall: postUpdate } = useServiceContext().postService;
  const hubCanisterId = useServiceContext().hubCanisterId;
  const hubPostsCanisterId = useServiceContext().hubPostsCanisterId;
  const userHubMembershipCanisterId =
    useServiceContext().userHubMembershipCanisterId;

  const { call: deletePost } = postUpdate({
    functionName: 'deletePost',
  });
  return {
    deletePost,
    hubCanisterId,
    hubPostsCanisterId,
    userHubMembershipCanisterId,
  };
}