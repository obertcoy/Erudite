import useServiceContext from '@/hooks/use-service-context';

export function getHubDetailedPostsQuery() {
  const { useQueryCall: hubPostsQuery } = useServiceContext().hubPostsService;
  const postCanisterId = useServiceContext().postCanisterId;
  const hubCanisterId = useServiceContext().hubCanisterId;
  const userCanisterId = useServiceContext().userCanisterId;
  const { call: getHubDetailedPosts, loading: getHubPostsLoading } =
    hubPostsQuery({
      functionName: 'getHubDetailedPosts',
    });
  return {
    getHubDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  };
}

export function getHubDetailedPostByPostIdQuery() {
  const { useQueryCall: hubPostsQuery } = useServiceContext().hubPostsService;
  const postCanisterId = useServiceContext().postCanisterId;
  const hubCanisterId = useServiceContext().hubCanisterId;
  const userCanisterId = useServiceContext().userCanisterId;
  const { call: getHubDetailedPostByPostID, loading: getHubPostsLoading } =
    hubPostsQuery({
      functionName: 'getHubDetailedPostByPostID',
    });
  return {
    getHubDetailedPostByPostID,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  };
}

export function getUserDetailedPostsQuery() {
  const { useQueryCall: hubPostsQuery } = useServiceContext().hubPostsService;
  const postCanisterId = useServiceContext().postCanisterId;
  const hubCanisterId = useServiceContext().hubCanisterId;
  const userCanisterId = useServiceContext().userCanisterId;
  const { call: getUserDetailedPosts, loading: getHubPostsLoading } =
    hubPostsQuery({
      functionName: 'getUserDetailedPosts',
    });
  return {
    getUserDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  };
}

export function getJoinedHubDetailedPostsQuery() {
  const { useQueryCall: hubPostsQuery } = useServiceContext().hubPostsService;
  const postCanisterId = useServiceContext().postCanisterId;
  const hubCanisterId = useServiceContext().hubCanisterId;
  const userCanisterId = useServiceContext().userCanisterId;
  const userHubMembershipCanisterId =
    useServiceContext().userHubMembershipCanisterId;
  const { call: getJoinedHubDetailedPosts, loading: getHubPostsLoading } =
    hubPostsQuery({
      functionName: 'getJoinedHubDetailedPosts',
    });
  return {
    getJoinedHubDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
    userHubMembershipCanisterId,
  };
}

export function getAllDetailedPostsQuery() {
  const { useQueryCall: hubPostsQuery } = useServiceContext().hubPostsService;
  const postCanisterId = useServiceContext().postCanisterId;
  const hubCanisterId = useServiceContext().hubCanisterId;
  const userCanisterId = useServiceContext().userCanisterId;

  const { call: getAllDetailedPosts, loading: getHubPostsLoading } =
    hubPostsQuery({
      functionName: 'getAllDetailedPosts',
    });
  return {
    getAllDetailedPosts,
    getHubPostsLoading,
    postCanisterId,
    hubCanisterId,
    userCanisterId,
  };
}
