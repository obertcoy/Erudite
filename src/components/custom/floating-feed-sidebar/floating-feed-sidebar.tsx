import FloatingFeedSidebarFilter from '@/components/custom/floating-feed-sidebar/floating-feed-sidebar-filter';
import FloatingFeedSidebarPopularHubs from './floating-feed-sidebar-popular-hubs';

const FloatingFeedSidebar = () => {
  return (
    <div className="sticky top-[4.5rem] min-w-80 w-80 p-4 h-fit rounded-md bg-gray-100 dark:bg-gray-900">
      <FloatingFeedSidebarFilter />
      <FloatingFeedSidebarPopularHubs />
    </div>
  );
};

export default FloatingFeedSidebar;
