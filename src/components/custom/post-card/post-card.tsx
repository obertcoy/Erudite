import { Card } from '@/components/ui/card';
import PostCardHeader from '@/components/custom/post-card/post-card-header';
import PostCardContent from '@/components/custom/post-card/post-card-content';
import PostCardFooter from '@/components/custom/post-card/post-card-footer';
import { Link } from 'react-router-dom';

const PostCard = () => {
  return (
    <Link to="/posts/i-just-made-my-grandma-rich">
      <Card className="w-full max-w-3xl rounded-xl hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer shadow-none border-none">
        <PostCardHeader />
        <PostCardContent />
        <PostCardFooter />
      </Card>
    </Link>
  );
};

export default PostCard;
