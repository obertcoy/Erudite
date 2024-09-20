import useServiceContext from "@/hooks/useServiceContext";


export function getUserQuery() {
    const { useQueryCall: userQuery } = useServiceContext().userService;

    const { call: getUser, loading: getUserLoading } = userQuery({
        functionName: "getUser",
        refetchOnMount: false,
        refetchInterval: 0
    })
    return { getUser, getUserLoading };
}

