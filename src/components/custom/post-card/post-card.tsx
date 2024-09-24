import { Card } from '@/components/ui/card';
import PostCardHeader from '@/components/custom/post-card/post-card-header';
import PostCardContent from '@/components/custom/post-card/post-card-content';
import PostCardFooter from '@/components/custom/post-card/post-card-footer';

const PostCard = () => {
  return (
    <Card className="w-full max-w-3xl rounded-md">
      <PostCardHeader />
      <PostCardContent />
      <PostCardFooter />
    </Card>
  );
};

export default PostCard;
