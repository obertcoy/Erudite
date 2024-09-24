import useServiceContext from "@/hooks/use-service-context";

export function createHubUpdate() {
    const { useUpdateCall: hubUpdate } = useServiceContext().hubService;
  
    const { call: createHub } = hubUpdate({
      functionName: 'createHub',
    });
    return { createHub };
  }

export function getHubByIdQuery() {
    const { useQueryCall: hubQuery } = useServiceContext().hubService;
  
    const { call: getHubByID, loading: getHubLoading } = hubQuery({
      functionName: 'getHubByID',
    });
    return { getHubByID, getHubLoading };
  }