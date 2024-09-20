import { Button } from '@/components/ui/button';
import ProfileHeaderInformation, { dummyProfile } from './profile-header-information';

export default function ProfileHeader() {
  return (
    <div className="w-full lg:w-3/4 mx-auto">
        <ProfileHeaderInformation data={dummyProfile} isCurrentUser={true} />

      <div className="mt-6">
        <nav className="flex flex-wrap md:gap-x-4 px-4 border-b ">
          {[
            'Recents',
            'Posts',
            'Comments',
            'Awarded',
            'Upvoted',
            'Downvoted',
          ].map((item) => (
            <div key={item} className="relative group py-2">
              <Button variant="ghost" className="w-fit h-full hover:bg-inherit">
                {item}
              </Button>

              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 hidden group-hover:block"></div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
