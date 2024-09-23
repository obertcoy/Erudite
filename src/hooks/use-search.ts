import { SearchResultsEntity } from '@/lib/model/entity/search-results-entity';
import { RouteEnum } from '@/lib/enum/route-enum';
import { SearchResultsEnum } from '@/lib/enum/search-results-enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UseSearchStoreState {
  searchQuery: string;
  searchResults: SearchResultsEntity;
  recentSearchQuery: string[];
  showDropdown: boolean;
}

interface UseSearchStoreActions {
  setSearchQuery: (query: string) => void;
  handleSearch: (
    id: string,
    SearchResultsEnum: SearchResultsEnum,
    query: string,
  ) => string;
  fetchSearchResults: () => void;
  toggleDropdown: (show: boolean) => void;
}

type UseSearchStore = UseSearchStoreState & UseSearchStoreActions;

export const useSearchStore = create<UseSearchStore>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      searchResults: {users: [], hubs: [], posts: []},
      showDropdown: false,
      recentSearchQuery: [],

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      handleSearch: (
        id: string,
        searchResultsEnum: SearchResultsEnum,
        query: string,
      ) => {
        let url = '';
        const recentQueries = get().recentSearchQuery;

        if (!query.trim() || !recentQueries) return url;

        set({ recentSearchQuery: [query, ...recentQueries].slice(0, 3) });

        switch (searchResultsEnum) {
          case SearchResultsEnum.HUB:
            url = RouteEnum.HUB + '/' + id;
            break;
          case SearchResultsEnum.USER:
            url = RouteEnum.USER + '/' + id;
            break;
          case SearchResultsEnum.NAVIGATE:
            url = RouteEnum.SEARCH;
            break;
        }

        return url;
      },

      fetchSearchResults: async () => {
        const query = get().searchQuery?.trim();
        const data: SearchResultsEntity = {
          users: [
            { username: 'Roberto', bio: '', email: 'test@email.com', gender: 'male', profileImageUrl: '', bannerImageUrl: '' },
            { username: 'Alice', bio: '', email: 'test@email.com', gender: 'male', profileImageUrl: '', bannerImageUrl: '' },
            { username: 'David', bio: '', email: 'test@email.com', gender: 'male', profileImageUrl: '', bannerImageUrl: '' },
            { username: 'Irvin', bio: '', email: 'test@email.com', gender: 'male', profileImageUrl: '', bannerImageUrl: ''},
            { username: 'Teresa', bio: '', email: 'test@email.com', gender: 'male', profileImageUrl: '', bannerImageUrl: '' },
          ],
          hubs: [
            { hubId: '234', hubName: 'AlamakHub' },
            { hubId: '235', hubName: 'TechTalks' },
            { hubId: '236', hubName: 'CreativeCorner' },
            { hubId: '237', hubName: 'HealthHub' },
            { hubId: '238', hubName: 'EducationZone' },
          ],
          posts: [
            { postId: '345', title: 'Suer coyy ??' },
            { postId: '346', title: 'Latest Tech Trends' },
            { postId: '347', title: 'Creative Design Tips' },
            { postId: '348', title: 'Health and Wellness' },
            { postId: '349', title: 'Educational Resources' },
          ],
        };

        set({ searchResults: data });
      },
      toggleDropdown: (show: boolean) => {
        set({ showDropdown: show });
      },
    }),
    {
      name: 'recent-search',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        recentSearchQuery: state.recentSearchQuery 
      }),
    }
  )
);