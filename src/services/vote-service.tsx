import useServiceContext from '@/hooks/use-service-context';

export function createVoteUpdate() {
  const { useUpdateCall: voteUpdate } =
    useServiceContext().userPostVotesService;

  const postCanisterId = useServiceContext().postCanisterId;

  const { call: createUserPostVote, loading: createVoteLoading } = voteUpdate({
    functionName: 'createUserPostVote',
  });
  return { createUserPostVote, createVoteLoading, postCanisterId };
}

export function updateVoteUpdate() {
  const { useUpdateCall: voteUpdate } =
    useServiceContext().userPostVotesService;

  const postCanisterId = useServiceContext().postCanisterId;

  const { call: updateVoteType, loading: updateVoteLoading } = voteUpdate({
    functionName: 'updateVoteType',
  });
  return { updateVoteType, updateVoteLoading, postCanisterId };
}

export function getVoteByPostIDQuery() {
  const { useQueryCall: voteQuery } = useServiceContext().userPostVotesService;

  const { call: getVoteByPostID, loading: getVoteLoading } = voteQuery({
    functionName: 'getVoteByPostID',
  });
  return { getVoteByPostID, getVoteLoading };
}
