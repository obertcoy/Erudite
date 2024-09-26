import { CardContent } from '@/components/ui/card';
import MyRichGrandma from '@/assets/my-rich-grandma.webp';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { validateImageURL } from '@/lib/utils';

interface PostCardContentProps {
  postData: PostEntity;
}

export default function PostCardContent({ postData }: PostCardContentProps) {
  console.log(postData.postImageUrl);

  return (
    <CardContent className="flex flex-col justify-center gap-y-3">
      <img
        src={postData.postImageUrl}
        className="rounded-md w-full h-80 object-cover"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <p className="text-sm">{postData.postBody}</p>
    </CardContent>
  );
}
