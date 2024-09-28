import { Separator } from '@/components/ui/separator';
import ProfileCommentCard from './profile-comment-card';
import { useParams } from 'react-router-dom';

interface ProfileBodyProps {
  activeTab:
    | 'Recents'
    | 'Posts'
    | 'Comments'
    | 'Awarded'
    | 'Upvoted'
    | 'Downvoted';
}

function renderBody(
  activeTab:
    | 'Recents'
    | 'Posts'
    | 'Comments'
    | 'Awarded'
    | 'Upvoted'
    | 'Downvoted',
) {
  switch (activeTab) {
    case 'Recents':
      return <div>Recents</div>;
    case 'Posts':
      return <div>Posts</div>;
    case 'Comments':
      return (
        <div className="flex flex-col">
          {[...Array(10)].map((_, i) => (
            <div className="flex flex-col gap-y-8">
              {i !== 0 && <Separator />}
              <ProfileCommentCard />
            </div>
          ))}
        </div>
      );
    case 'Awarded':
      return <div>Awarded</div>;
    case 'Upvoted':
      return <div>Upvoted</div>;
    case 'Downvoted':
      return <div>Downvoted</div>;
    default:
      return null;
  }
}

export default function ProfileBody({ activeTab }: ProfileBodyProps) {
  return (
    <div className="w-full lg:w-3/4 mx-auto px-4 mt-8">
      {renderBody(activeTab)}
    </div>
  );
}
