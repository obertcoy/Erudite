import useServiceContext from '@/hooks/use-service-context';

export function createMembershipUpdate() {
  const { useUpdateCall: membershipUpdate } =
    useServiceContext().userHubMembershipService;
    const hubCanisterId = useServiceContext().hubCanisterId;

  const { call: createMembership } = membershipUpdate({
    functionName: 'createMembership',
  });
  return { createMembership, hubCanisterId };
}

export function getJoinedHubsQuery() {
  const { useQueryCall: membershipQuery } =
    useServiceContext().userHubMembershipService;
  const hubCanisterId = useServiceContext().hubCanisterId;

  const { call: getJoinedHubs, loading: getJoinedHubsLoading } =
    membershipQuery({
      functionName: 'getJoinedHubs',
    });

  return { getJoinedHubs, getJoinedHubsLoading, hubCanisterId };
}
