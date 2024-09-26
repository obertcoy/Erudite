import {
  PostEntity,
  convertRawPostEntityToPostEntity,
} from '@/lib/model/entity/post/post.entity';
import { PostDto } from '@/lib/model/schema/post/post.dto';
import {
  compressImageURLToUint8Array,
  convertFileToUint8Array,
} from '@/lib/utils';
import { createPostUpdate } from '@/services/post-service';
import { toast } from 'sonner';

export function useCreatePost() {
  const { createPost, hubCanisterId } = createPostUpdate();

  const execute = async (postDto: PostDto) => {
    try {
      let postBannerImage: Uint8Array | [] = [];
      if (postDto.postBannerImage) {
        postBannerImage = await compressImageURLToUint8Array(
          URL.createObjectURL(postDto.postBannerImage),
        ) ?? [];
      }

      const toastId = toast.loading('Creating post...');
      if (!postBannerImage) return;

      const result = await createPost([
        postDto.postTitle,
        postDto.postBody,
        postBannerImage,
        postDto.hubId,
        hubCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Post created successfuly', { id: toastId });

      return convertRawPostEntityToPostEntity(result.ok);
    } catch (err) {
      toast.error('Error: Failed to create post');
      return null;
    }
  };

  return { execute };
}
