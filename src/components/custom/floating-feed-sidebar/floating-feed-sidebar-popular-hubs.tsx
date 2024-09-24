import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const FloatingFeedSidebarPopularHubs = () => {
  return (
    <div className="text-sm font-bold">
      <div className="my-4">Popular Hubs</div>
      {['Ad Astra', 'The Codex', 'Warhammer 40K', 'Minecraft', 'GregTech'].map(
        (item) => (
          <div
            key={item}
            className="flex items-center gap-x-4 p-3 rounded-md cursor-pointer hover:bg-muted font-normal"
          >
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-medium">{item}&apos;s&nbsp;Hub</div>
              <div className="text-muted-foreground">22.3k Members</div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default FloatingFeedSidebarPopularHubs;
