import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/hooks/use-search';
import { SearchResultsEntity } from '@/lib/model/entity/search-results.entity';
import { Clock, Loader2 } from 'lucide-react';

export default function SearchResult() {
  const { searchQuery, searchResults, recentSearchQuery, showDropdown } =
    useSearchStore((state) => ({
      searchQuery: state.searchQuery,
      searchResults: state.searchResults,
      recentSearchQuery: state.recentSearchQuery,
      showDropdown: state.showDropdown,
    }));

  // console.log(showDropdown, recentSearchQuery, searchResults);

  return (
    <div
      className={`absolute top-14 w-full h-fit bg-background border-b z-20 ${
        showDropdown ? 'block' : 'hidden'
      }`}
    >
      {!searchResults ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col w-full max-h-5/12 px-4 pt-2">
          {recentSearchQuery.length > 0 && (
            <div className="flex flex-col gap-y-2">
              <h3 className="max-w-[248px] truncate text-sm font-medium text-muted-foreground">
                Recent Search
              </h3>
              <div className="flex flex-col w-full h-fit">
                {recentSearchQuery.map((recentSearch, index) => (
                  <Button
                    key={`recent-${index}`}
                    variant="ghost"
                    className="flex flex-row items-center text-start py-6 gap-x-2 hover:variant-secondary"
                  >
                    <Clock className="h-4 w-4" />
                    <p className="w-full h-fit text-sm font-medium text-foreground">
                      {recentSearch}
                    </p>
                  </Button>
                ))}
              </div>
            </div>
          )}
          <SearchResultsSection searchResults={searchResults} />
        </div>
      )}
    </div>
  );
}

interface SearchResultsSection {
  searchResults: SearchResultsEntity;
}

function SearchResultsSection({ searchResults }: SearchResultsSection) {
  const hubs = searchResults.hubs;
  const users = searchResults.users;
  const posts = searchResults.posts;

  return (
    <>
      {(hubs?.length || users?.length || posts?.length) > 0 && (
        <div className="flex flex-row justify-center py-4 px-4 border-t gap-x-4">
          {/* Hubs Section */}
          {hubs && hubs.length > 0 && (
            <div className="flex flex-col gap-y-2 w-full">
              <h3 className="max-w-[248px] truncate text-sm font-medium text-muted-foreground">
                Hubs
              </h3>
              <div className="flex flex-col w-full h-fit -translate-x-4">
                {hubs.map((hub, index) => (
                  <Button
                    key={`hub-${index}`}
                    variant="ghost"
                    className="flex flex-row items-center text-start py-6 gap-x-2 hover:variant-secondary"
                  >
                    <div className="relative h-8 w-8 rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="#" alt="Avatar" />
                        <AvatarFallback className="bg-transparent">
                          KE
                        </AvatarFallback>
                      </Avatar>{' '}
                    </div>
                    <p className="w-full h-fit text-sm font-medium text-foreground">
                      {hub.hubName}
                    </p>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Users Section */}
          {users && users.length > 0 && (
            <div className="flex flex-col gap-y-2 w-full">
              <h3 className="max-w-[248px] truncate text-sm font-medium text-muted-foreground">
                Users
              </h3>
              <div className="flex flex-col w-full h-fit -translate-x-4">
                {users.map((user, index) => (
                  <Button
                    key={`user-${index}`}
                    variant="ghost"
                    className="flex flex-row items-center text-start py-6 gap-x-2 hover:variant-secondary"
                  >
                    <div className="relative h-8 w-8 rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="#" alt="Avatar" />
                        <AvatarFallback className="bg-transparent">
                          KE
                        </AvatarFallback>
                      </Avatar>{' '}
                    </div>
                    <p className="w-full h-fit text-sm font-medium text-foreground">
                      {user.username}
                    </p>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-y-2 w-full">
              <h3 className="max-w-[248px] truncate text-sm font-medium text-muted-foreground">
                Posts
              </h3>
              <div className="flex flex-col w-full h-fit -translate-x-4">
                {posts.map((post, index) => (
                  <Button
                    key={`post-${index}`}
                    variant="ghost"
                    className="flex flex-row items-center text-start py-6 gap-x-2 hover:variant-secondary"
                  >
                    <div className="relative h-8 w-8 rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="#" alt="Avatar" />
                        <AvatarFallback className="bg-transparent">
                          KE
                        </AvatarFallback>
                      </Avatar>{' '}
                    </div>
                    <p className="w-full h-fit text-sm font-medium text-foreground">
                      {post.title}
                    </p>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
