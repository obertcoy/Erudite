import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileAvatar from '@/components/ui/profile-avatar';
import { useGetAllHubs } from '@/hooks/hub/use-get-all-hubs';

const FloatingFeedSidebarPopularHubs = () => {
  const { hubs, getAllHubsLoading } = useGetAllHubs();

  if (getAllHubsLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="text-sm font-bold">
      <div className="my-4">Explore Hubs</div>
      {hubs.slice(0, 5).map((hub, index) => (  
        <div
          key={index} 
          className="flex items-center gap-x-4 p-3 rounded-md cursor-pointer hover:bg-muted font-normal"
        >
          <ProfileAvatar username={hub.hubName} profileImageUrl={hub.hubBannerImageUrl}/> 
          <div className="flex flex-col">
            <div className="font-medium">{hub.hubName}</div> 
            {/* <div className="text-muted-foreground">{hub.membersCount} Members</div> Assuming `hub` has a `membersCount` property */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingFeedSidebarPopularHubs;
