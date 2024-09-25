import {
  convertAllRawHubEntityToHubEntity,
  HubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { getJoinedHubsQuery } from '@/services/membership-service';
import { useEffect, useState } from 'react';

export default function useGetJoinedHubs(userId: string | undefined) {
  const [joinedHubs, setJoinedHubs] = useState<HubEntity[]>([]);
  const { getJoinedHubs, getJoinedHubsLoading, hubCanisterId } =
    getJoinedHubsQuery();

  useEffect(() => {
    const fetchJoinedHubs = async () => {

      try {
          const result = await getJoinedHubs([[], hubCanisterId]);
                    
          if (!result || 'err' in result) {
            console.log(result?.err);
            
        } else {
          setJoinedHubs(convertAllRawHubEntityToHubEntity(result.ok));
        }
      } catch (error) {}
    };

    fetchJoinedHubs();
  }, [userId]);

  return { joinedHubs, getJoinedHubsLoading };
}
