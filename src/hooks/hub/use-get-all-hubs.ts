import {
  HubEntity,
  RawHubEntity,
  convertAllRawHubEntityToHubEntity,
  convertRawHubEntityToHubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { getAllHubsQuery } from '@/services/hub-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useGetAllHubs() {
  const [hubs, setHubs] = useState<HubEntity[]>([]);
  const { getAllHubs, getAllHubsLoading } = getAllHubsQuery();

  useEffect(() => {
   

    const fetchAllHubs = async () => {
      const result = await getAllHubs();

      if (!result || 'err' in result) {
        toast.error('Error: Failed to fetch hubs');
      } else {
        setHubs(convertAllRawHubEntityToHubEntity(result.ok));
      }
    };

    fetchAllHubs();
  }, []);

  return { hubs, getAllHubsLoading };
}
