import {
  HubEntity,
  convertRawHubEntityToHubEntity,
} from '@/lib/model/entity/hub/hub.entity';
import { HubDto } from '@/lib/model/schema/hub/hub.dto';
import {
  compressImageURLToUint8Array,
  convertFileToUint8Array,
} from '@/lib/utils';
import { createHubUpdate } from '@/services/hub-service';
import { toast } from 'sonner';

export function useCreateHub() {
  const { createHub, userHubMembershipCanisterId } = createHubUpdate();

  const execute = async (hubDto: HubDto) => {
    try {
      const hubBannerImage = await compressImageURLToUint8Array(
        URL.createObjectURL(hubDto.hubBannerImage),
      );

      const toastId = toast.loading('Creating hub...');
      if (!hubBannerImage) return;

      const result = await createHub([
        hubDto.hubName,
        hubDto.hubDescription,
        hubBannerImage,
        hubDto.hubRules,
        userHubMembershipCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Hub created successfuly', { id: toastId });

      return convertRawHubEntityToHubEntity(result.ok);
    } catch (err) {
      toast.error('Error: Failed to create hub');
      return null;
    }
  };

  return { execute };
}
