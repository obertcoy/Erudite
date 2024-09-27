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

export function membershipRoleUpdate() {
  const { useUpdateCall: membershipUpdate } =
    useServiceContext().userHubMembershipService;
  const hubCanisterId = useServiceContext().hubCanisterId;

  const { call: updateMembershipRole } = membershipUpdate({
    functionName: 'updateMembershipRole',
  });
  return { updateMembershipRole, hubCanisterId };
}


export function removeMembershipUpdate() {
  const { useUpdateCall: membershipUpdate } =
    useServiceContext().userHubMembershipService;
  const hubCanisterId = useServiceContext().hubCanisterId;

  const { call: removeMembership } = membershipUpdate({
    functionName: 'removeMembership',
  });
  return { removeMembership, hubCanisterId };
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

export function getUserMembershipsQuery() {
  const { useQueryCall: membershipQuery } =
    useServiceContext().userHubMembershipService;

  const { call: getUserMemberships, loading: getUserMembershipsLoading } =
    membershipQuery({
      functionName: 'getUserMemberships',
    });

  return { getUserMemberships, getUserMembershipsLoading };
}

export function getUsersInHubByRoleQuery() {
  const { useQueryCall: membershipQuery } =
    useServiceContext().userHubMembershipService;

  const userCanisterId = useServiceContext().userCanisterId;

  const { call: getUsersInHubByRole, loading: getUserMembershipsLoading } =
    membershipQuery({
      functionName: 'getUsersInHubByRole',
    });

  return { getUsersInHubByRole, getUserMembershipsLoading, userCanisterId };
}
