import { deletePostUpdate } from '@/services/post-service';
import { toast } from 'sonner';

export function useDeletePost() {
  const {
    deletePost,
    hubCanisterId,
    hubPostsCanisterId,
    userHubMembershipCanisterId,
  } = deletePostUpdate();

  const execute = async (postId: string, hubId: string) => {
    try {
      const toastId = toast.loading('Removing post...');

      const result = await deletePost([
        BigInt(postId),
        BigInt(hubId),
        hubCanisterId,
        hubPostsCanisterId,
        userHubMembershipCanisterId,
      ]);

      if (!result || 'err' in result) {
        toast.error(result?.err, { id: toastId });
        return null;
      }

      toast.success('Post removed successfuly', { id: toastId });

      return;
    } catch (err) {
      toast.error('Error: Failed to remove post');
      return;
    }
  };

  return { execute };
}
