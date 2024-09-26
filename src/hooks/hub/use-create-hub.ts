import { HubEntity } from '@/lib/model/entity/hub/hub.entity';
import { HubDto } from '@/lib/model/schema/hub/hub.dto';
import { convertFileToUint8Array } from '@/lib/utils';
import { createHubUpdate } from '@/services/hub-service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useCreateHub(hub: HubDto) {
  const [hubData, setHubData] = useState<HubEntity | null>();
  const { createHub, userHubMembershipCanisterId } = createHubUpdate();

  useEffect(() => {
    const create = async () => {
      try {
        const profileImage = await convertFileToUint8Array(hub.hubProfileImage);

        const result = await createHub([
          hub.hubName,
          hub.hubDescription,
          profileImage,
          userHubMembershipCanisterId,
        ]);
      } catch (err) {
        toast.error('Error: Failed to create hub');
      }
    };

    create();
  }, [hub]);

  return hubData;
}
