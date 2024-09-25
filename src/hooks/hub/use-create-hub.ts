import {
  HubEntity,
  convertRawHubEntityToHubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { HubDto } from '@/lib/model/schema/hub/hub.dto';
import { convertFileToUint8Array } from '@/lib/utils';
import { createHubUpdate } from '@/services/hub-service';
import { toast } from 'sonner';

export function useCreateHub() {
  const { createHub, userHubMembershipCanisterId } = createHubUpdate();

  const execute = async (hubDto: HubDto) => {
    try {
      const hubBannerImage = await convertFileToUint8Array(
        hubDto.hubBannerImage,
      );

      const result = await createHub([
        hubDto.hubName,
        hubDto.hubDescription,
        hubBannerImage,
        hubDto.hubRules,
        userHubMembershipCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error('Error on fetching user: ' + result?.err);
        return null;
      }

      toast.success('Hub created successfuly');

      return convertRawHubEntityToHubEntity(result.ok);
    } catch (err) {
      toast.error('Error: Failed to create hub');
      return null;
    }
  };

  return { execute };
}
