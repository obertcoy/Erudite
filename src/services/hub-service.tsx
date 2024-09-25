import useServiceContext from '@/hooks/use-service-context';

export function createHubUpdate() {
  const { useUpdateCall: hubUpdate } = useServiceContext().hubService;
  const userHubMembershipCanisterId = useServiceContext().userHubMembershipCanisterId

  const { call: createHub } = hubUpdate({
    functionName: 'createHub',
  });
  return { createHub, userHubMembershipCanisterId };
}

export function hubProfileUpdate() {
  const { useUpdateCall: hubUpdate } = useServiceContext().hubService;

  const { call: updateHubProfile } = hubUpdate({
    functionName: 'updateHubProfile',
  });
  return { updateHubProfile };
}

export function createEditHubRolesUpdate() {
  const { useUpdateCall: hubUpdate } = useServiceContext().hubService;

  const { call: createEditHubRoles } = hubUpdate({
    functionName: 'createEditHubRoles',
  });
  return { createEditHubRoles };
}

export function getHubByIdQuery() {
  const { useQueryCall: hubQuery } = useServiceContext().hubService;

  const { call: getHubByID, loading: getHubLoading } = hubQuery({
    functionName: 'getHubByID',
  });
  return { getHubByID, getHubLoading };
}
