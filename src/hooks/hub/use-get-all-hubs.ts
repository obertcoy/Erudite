import {
  HubEntity,
  RawHubEntity,
  convertRawHubEntityToHubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { getAllHubsQuery } from '@/services/hub-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useGetAllHubs() {
  const [hubs, setHubs] = useState<HubEntity[]>([]);
  const { getAllHubs, getAllHubsLoading } = getAllHubsQuery();

  useEffect(() => {
    const convertAllRawHubs = (raws: RawHubEntity[]) => {
      const converted: HubEntity[] = raws.map((raw) => {
        return convertRawHubEntityToHubEntity(raw);
      });

      return converted;
    };

    const fetchAllHubs = async () => {
      const result = await getAllHubs();

      if (!result || 'err' in result) {
        toast.error('Error: Failed to fetch hubs');
      } else {
        setHubs(convertAllRawHubs(result.ok));
      }
    };

    fetchAllHubs();
  }, []);

  return { hubs, getAllHubsLoading };
}
