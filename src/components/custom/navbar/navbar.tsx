import { ModeToggle } from '@/components/mode-toggle';
import { SheetMenu } from '../sheet-menu';
import { Loader2, SquarePen } from 'lucide-react';
import { UserNav } from '../user-nav';
import SearchBar from './search-bar';
import { RouteEnum } from '@/lib/enum/route-enum';
import NavbarIcon from './navbar-icon';
import SearchResult from './search-result';
interface NavbarProps {
  title: string;
}
export function Navbar({ title }: NavbarProps) {
  // const { userId } = useAuth();
  // const [isFetching, setIsFetching] = useState(true);
  // const [tokens, setTokens] = useState(500);

  // useEffect(() => {
  //   const fetchTransaction = async () => {
  //     try {
  //       // Fetch the token data
  //       let response = await fetch(`/api/service/token/${userId}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch token");
  //       }

  //       const data = await response.json();

  //       if (data.length === 0) {
  //         // If no data, create it
  //         response = await fetch(`/api/service/token/${userId}`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to create token");
  //         }

  //         // Get the result after creation
  //         const createdData = await response.json();
  //         setTokens(createdData.tokenAmount);
  //       } else {
  //         // If data exists, set the token
  //         setTokens(data[0].tokenAmount);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching or creating token:", error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   fetchTransaction();
  // }, [userId]);

return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center justify-between gap-x-4 sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>

        <SearchBar />
        <div className="flex items-center gap-x-2">
          <NavbarIcon
            icon={<SquarePen className="h-[1.2rem] w-[1.2rem]" />}
            path={RouteEnum.CREATE_POST}
            tooltip={`Create post in /${title}`}
          />

          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <SearchResult />
    </header>
  );
}
