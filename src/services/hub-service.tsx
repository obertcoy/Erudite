import useServiceContext from "@/hooks/use-service-context";

export function createHub() {
    const { useUpdateCall: userUpdate } = useServiceContext().userService;
  
    const { call: registerUser, loading: getUserLoading } = userUpdate({
      functionName: 'registerUser',
    });
    return { registerUser, getUserLoading };
  }