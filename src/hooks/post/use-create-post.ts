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
  const { createPost, hubPostsCanisterId } = createPostUpdate();

  const execute = async (postDto: PostDto) => {
    try {
      let postImage: Uint8Array | [] = [];
      if (postDto.postBannerImage) {
        postImage = await compressImageURLToUint8Array(
          URL.createObjectURL(postDto.postBannerImage),
        ) ?? [];
      }

      const toastId = toast.loading('Creating post...');

      const result = await createPost([
        postDto.postTitle,
        postDto.postBody,
        [postImage],
        postDto.hubId,
        hubPostsCanisterId,
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
