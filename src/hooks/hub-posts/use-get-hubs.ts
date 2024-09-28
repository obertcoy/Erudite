import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  convertRawHubEntityToHubEntity,
  HubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { getHubsQuery } from '@/services/hub-service';

export function useGetHubs(hubNameQuery: string) {
  const [hubsData, setHubsData] = useState<HubEntity[] | null>(null);
  const { getHubs, getHubsLoading } = getHubsQuery();

  useEffect(() => {
    const fetchHubs = async () => {
      if (!hubNameQuery) {
        return;
      }

      try {
        const result = await getHubs([hubNameQuery]);
        if (!result || 'err' in result) {
          toast.error('Error on fetching hubs: ' + result?.err);
        } else {
          let hubEntities = [];

          for (const rawHubEntity of result) {
            hubEntities.push(convertRawHubEntityToHubEntity(rawHubEntity));
          }

          setHubsData(hubEntities);
        }
      } catch (error) {
        toast.error('Error on fetching hubs: ' + error);
      }
    };

    fetchHubs();
  }, [hubNameQuery]);

  return { hubsData, getHubsLoading };
}
