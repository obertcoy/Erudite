import {
  convertAllRawHubEntityToHubEntity,
  HubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { getJoinedHubsQuery } from '@/services/membership-service';
import { useEffect, useState } from 'react';

export default function useGetJoinedHubs(userId?: string) {
  const [joinedHubs, setJoinedHubs] = useState<HubEntity[]>([]);
  const { getJoinedHubs, getJoinedHubsLoading, hubCanisterId } =
    getJoinedHubsQuery();

  const fetchJoinedHubs = async () => {
    let passedUserId: [string] | [] = [];
    if (userId) {
      passedUserId = [userId];
    }
    try {
      const result = await getJoinedHubs([passedUserId, hubCanisterId]);

      console.log('Result joined hubs: ' + result);

      if (!result || 'err' in result) {
        console.log(result?.err);
      } else {
        setJoinedHubs(convertAllRawHubEntityToHubEntity(result.ok));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchJoinedHubs();
  }, [userId]);

  return { joinedHubs, getJoinedHubsLoading, fetchJoinedHubs };
}
