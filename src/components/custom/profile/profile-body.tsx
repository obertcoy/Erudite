import { Separator } from '@/components/ui/separator';
import ProfileCommentCard from './profile-comment-card';
import { useParams } from 'react-router-dom';
import useGetUserDetailedPosts from '@/hooks/hub-posts/use-get-user-detailed-posts';
import { DetailedPostEntity } from '@/lib/model/entity/post/detailed-post.entity';
import React from 'react';
import PostCard from '../post-card/post-card';
import useGetCommentsByPostId from '@/hooks/post-comments/use-get-comments-by-post-id';
import { UserCommentEntity } from '@/lib/model/entity/comment/comment.entity';

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
    | 'Downvoted', detailedPost:DetailedPostEntity[], userComments:UserCommentEntity[]
) {
  switch (activeTab) {
    case 'Recents':
      return <div>Recents</div>;
    case 'Posts':
      return <div>
        {
          detailedPost.map((post,index) =>(
            <React.Fragment key={index}>
              <Separator/>
              <PostCard key={index} data={post}/>
            </React.Fragment>
          ))
        }
      </div>;
    case 'Comments':
      return (
        <div className="flex flex-col">
        {
          userComments.map((comments,index) =>(
            <React.Fragment key={index}>
              <Separator/>
              <ProfileCommentCard key={index} data={comments}/>
            </React.Fragment>
          ))
        }
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
  const { userId } = useParams<{ userId?: string }>();

  const { detailedPosts, getHubPostsLoading } = useGetUserDetailedPosts(userId!);
  const { userComments, isLoading, fetchComments } = useGetCommentsByPostId(userId!);

  return (
    <div className="w-full lg:w-3/4 mx-auto px-4 mt-8">
      {renderBody(activeTab, detailedPosts,userComments!)}
    </div>
  );
}
