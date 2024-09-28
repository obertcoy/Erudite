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

  const { call: registerUser } = userUpdate({
    functionName: 'registerUser',
  });
  return { registerUser };
}

export function userUpdate() {
  const { useUpdateCall: userUpdate } = useServiceContext().userService;

  const { call: updateUser } = userUpdate({
    functionName: 'updateUser',
  });
  return { updateUser };
}
