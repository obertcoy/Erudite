import useServiceContext from '@/hooks/use-service-context';

export function getCommentsByPostIdQuery() {
  const { useQueryCall: postCommentsQuery } = useServiceContext().postCommentsService;
  const commentCanisterId = useServiceContext().commentCanisterId;

  const { call: getCommentsByPostId } = postCommentsQuery({
    functionName: 'getCommentsByPostID',
  });
  return { getCommentsByPostId, commentCanisterId };
}
