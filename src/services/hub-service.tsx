import useServiceContext from '@/hooks/use-service-context';

export function createHubUpdate() {
  const { useUpdateCall: hubUpdate } = useServiceContext().hubService;
  const userHubMembershipCanisterId =
    useServiceContext().userHubMembershipCanisterId;

  const { call: createHub } = hubUpdate({
    functionName: 'createHub',
  });
  return { createHub, userHubMembershipCanisterId };
}

export function hubInformationUpdate() {
  const { useUpdateCall: hubUpdate } = useServiceContext().hubService;

  const { call: updateHubInformation } = hubUpdate({
    functionName: 'updateHubInformation',
  });
  return { updateHubInformation };
}

export function createEditHubRolesUpdate() {
  const { useUpdateCall: hubUpdate } = useServiceContext().hubService;

  const hubCanisterId = useServiceContext().hubCanisterId;
  const userHubMembershipCanisterId = useServiceContext().userHubMembershipCanisterId;

  const { call: createEditHubRoles } = hubUpdate({
    functionName: 'createEditHubRoles',
  });
  return { createEditHubRoles, hubCanisterId, userHubMembershipCanisterId };
}

export function getHubByIdQuery() {
  const { useQueryCall: hubQuery } = useServiceContext().hubService;
  
  const { call: getHubByID, loading: getHubLoading } = hubQuery({
    functionName: 'getHubByID',
  });
  return { getHubByID, getHubLoading };
}

export function getAllHubsQuery() {
  const { useQueryCall: hubQuery } = useServiceContext().hubService;

  const { call: getAllHubs, loading: getAllHubsLoading } = hubQuery({
    functionName: 'getAllHubs',
  });
  return { getAllHubs, getAllHubsLoading };
}
