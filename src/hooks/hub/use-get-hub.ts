import useServiceContext from '@/hooks/use-service-context';
import { convertRawHubEntityToHubEntity, HubEntity } from '@/lib/model/entity/hub/hub.entity';
import { createHubUpdate, getHubByIdQuery } from '@/services/hub-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useGetHubById(hubId: string | undefined) {
  const [hubData, setHubData] = useState<HubEntity | null>(null);
  const { getHubByID, getHubLoading } = getHubByIdQuery(); 

  useEffect(() => {
    const fetchHub = async () => {
      if (!hubId) {
        toast('Error: Hub id is required');
        return;
      }
      try {
        const result = await getHubByID([BigInt(hubId)]);
        if (!result || 'err' in result) {
          toast.error('Error on fetching hub: ' + result?.err);
        } else {
            setHubData(convertRawHubEntityToHubEntity(result.ok));
        }
      } catch (error) {
        toast.error('Error on fetching hub: ' + error);
      }
    };

    fetchHub();
  }, [hubId]);

  return { hubData, getHubLoading };
}
