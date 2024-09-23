import useServiceContext from '@/hooks/use-service-context';

export function getUserQuery() {
  const { useQueryCall: userQuery } = useServiceContext().userService;

  const { call: getUser, loading: getUserLoading } = userQuery({
    functionName: 'getUser',
    refetchOnMount: false,
    refetchInterval: 0,
  });
  return { getUser, getUserLoading };
}

export function registerUserUpdate() {
  const { useUpdateCall: userUpdate } = useServiceContext().userService;

  const { call: registerUser, loading: getUserLoading } = userUpdate({
    functionName: 'registerUser',
  });
  return { registerUser, getUserLoading };
}

export function userProfileUpdate() {
  const { useUpdateCall: userUpdate } = useServiceContext().userService;

  const { call: updateUserProfile, loading: getUserLoading } = userUpdate({
    functionName: 'updateUserProfile',
  });
  return { updateUserProfile, getUserLoading };
}
