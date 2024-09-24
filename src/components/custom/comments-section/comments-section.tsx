import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import CommentCard from './comment-card';

export default function CommentsSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <MessageCircle className="size-4" />
        <h1 className="font-medium text-lg">Comments</h1>
        <Badge>31K</Badge>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <CommentCard key={item} />
      ))}
    </div>
  );
}
