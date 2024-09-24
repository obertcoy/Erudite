import { Card } from '@/components/ui/card';
import CommentCardHeader from './comment-card-header';
import CommentCardContent from './comment-card-content';
import CommentCardFooter from './comment-card-footer';

export default function CommentCard() {
  return (
    <div>
      <Card className="w-full shadow-none border-none">
        <CommentCardHeader />
        <CommentCardContent />
        <CommentCardFooter />
      </Card>
    </div>
  );
}
