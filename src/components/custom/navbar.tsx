import { ModeToggle } from '@/components/mode-toggle';
import { SheetMenu } from './sheet-menu';

interface NavbarProps {
  title: string;
}
import { UserNav } from './user-nav';
import SearchBar from './search-bar';

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <SearchBar />
        <div className="flex items-center  gap-x-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
