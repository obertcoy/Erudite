import useServiceContext from '@/hooks/use-service-context';

export function createCommentUpdate() {
  const { useUpdateCall: commentUpdate } = useServiceContext().commentService;
  const postCanisterId = useServiceContext().postCanisterId;
  const postCommentsCanisterId = useServiceContext().postCommentsCanisterId;

  const { call: createComment } = commentUpdate({
    functionName: 'createComment',
  });
  return { createComment, postCanisterId, postCommentsCanisterId };
}

export function getUserCommentsQuery() {
  const { useQueryCall: commentsQuery } = useServiceContext().commentService;

  const { call: getUserComment } = commentsQuery({
    functionName: 'getUserComment',
  });
  return { getUserComment };
}