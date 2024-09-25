import { ModeToggle } from '@/components/mode-toggle';
import { SheetMenu } from '../sheet-menu';
import { Loader2, SquarePen } from 'lucide-react';
import { UserNav } from '../user-nav';
import SearchBar from './search-bar';
import { RouteEnum } from '@/lib/enum/route-enum';
import NavbarIcon from './navbar-icon';
import SearchResult from './search-result';
import useAuthContext from '@/hooks/use-auth-context';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
interface NavbarProps {
  title: string;
}
export function Navbar({ title }: NavbarProps) {
  const { user } = useAuthContext();
  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center justify-between gap-x-4 sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>

        <SearchBar />
        <div className="flex items-center gap-x-2">
          {user && (
            <NavbarIcon
              icon={<SquarePen className="h-[1.2rem] w-[1.2rem]" />}
              path={RouteEnum.CREATE_POST}
              tooltip={`Create post`}
            />
          )}

          <ModeToggle />
          {user ? (
            <UserNav data={user} />
          ) : (
            <div className="font-medium">
              <Link to={RouteEnum.LOGIN}>
                <Button>Sign in</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <SearchResult />
    </header>
  );
}
