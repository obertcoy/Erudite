import { SearchResultsEntity } from '@/lib/model/entity/search-results.entity';
import { RouteEnum } from '@/lib/enum/route-enum';
import { SearchResultsEnum } from '@/lib/enum/search-results-enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dummyHubs from '@/lib/model/entity/hub/hub.entity';
import { dummyPosts } from '@/lib/model/entity/post/post.entity';

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
      searchResults: { users: [], hubs: [], posts: [] },
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
            {
              internetIdentity: '69',
              username: 'Roberto',
              bio: '',
              email: 'test@email.com',
              gender: 'male',
              profileImageUrl: '',
              bannerImageUrl: '',
            },
            {
              internetIdentity: '12',
              username: 'Alice',
              bio: '',
              email: 'test@email.com',
              gender: 'male',
              profileImageUrl: '',
              bannerImageUrl: '',
            },
            {
              internetIdentity: '23',
              username: 'David',
              bio: '',
              email: 'test@email.com',
              gender: 'male',
              profileImageUrl: '',
              bannerImageUrl: '',
            },
            {
              internetIdentity: '44',
              username: 'Irvin',
              bio: '',
              email: 'test@email.com',
              gender: 'male',
              profileImageUrl: '',
              bannerImageUrl: '',
            },
            {
              internetIdentity: '12',
              username: 'Teresa',
              bio: '',
              email: 'test@email.com',
              gender: 'male',
              profileImageUrl: '',
              bannerImageUrl: '',
            },
          ],
          hubs: dummyHubs,
          posts: dummyPosts,
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
        recentSearchQuery: state.recentSearchQuery,
      }),
    },
  ),
);
