import { CardContent } from '@/components/ui/card';
import MyRichGrandma from '@/assets/my-rich-grandma.webp';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const PostCardContent = () => {
  return (
    <CardContent className="flex flex-col justify-center gap-y-3">
      <img
        src={MyRichGrandma}
        className="rounded-md w-full h-80 object-cover"
      />
      <p className="text-sm">
        You won&apos;t believe it, but I just turned my grandma into a virtual
        millionaire, thanks to Cookie Clicker! 🍪💰🤑 With some strategic
        upgrades, loads of golden cookies, and a little bit of patience,
        she&apos;s now generating millions of cookies per second. Who knew that
        baking could be this profitable? If you haven't tried it yet, you're
        missing out on the sweetest way to pass the time!
      </p>
    </CardContent>
  );
};

export default PostCardContent;
