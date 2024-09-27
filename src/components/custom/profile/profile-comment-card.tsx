import { Card } from '@/components/ui/card';
import ProfileCommentCardHeader from './profile-comment-card-header';
import ProfileCommentCardContent from './profile-comment-card-content';
import ProfileCommentCardFooter from './profile-comment-card-footer';

export default function ProfileCommentCard() {
  return (
    <div>
      <Card className="w-full shadow-none border-none px-4">
        <ProfileCommentCardHeader />
        <ProfileCommentCardContent />
        <ProfileCommentCardFooter />
      </Card>
    </div>
  );
}
