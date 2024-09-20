import { SearchResultsEntity } from '@/lib/model/entity/search-results-entity';
import { RouteEnum } from '@/lib/enum/route-enum';
import { SearchResultsEnum } from '@/lib/enum/search-results-enum';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UseSearchStoreProps {
  searchQuery: string;
  searchResults: SearchResultsEntity;
  recentSearchQuery: string[];
  showDropdown: boolean;
  setSearchQuery: (query: string) => void;
  handleSearch: (
    id: string,
    SearchResultsEnum: SearchResultsEnum,
    query: string,
  ) => string;
  fetchSearchResults: () => void;
  toggleDropdown: (show: boolean) => void;
}

export const useSearchStore = create(
  persist<Partial<UseSearchStoreProps>>(
    (set, get) => ({
      searchQuery: '',
      searchResults: {
        users: [{ userId: '123', username: 'Roberto' }],
        hubs: [{ hubId: '234', hubName: 'AlamakHub' }],
        posts: [{ postId: '345', title: 'Suer coyy ??' }],
      },
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
            { userId: '123', username: 'Roberto' },
            { userId: '124', username: 'Alice' },
            { userId: '125', username: 'Bob' },
            { userId: '126', username: 'Charlie' },
            { userId: '127', username: 'David' },
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
        // if (query.length > 0) {
        //   try {
        //     const response = await fetch(`/api/search?query=${query}`);
        //     const data: SearchResultsEntity = await response.json();
        //     set({ searchResults: data });
        //   } catch (error) {
        //     console.error('Error fetching search results:', error);
        //   }
        // }
      },
      toggleDropdown: (show: boolean) => {
        set({ showDropdown: show });
      },
    }),
    {
      name: 'recent-search',

      // Typescript error
      partialize: (state: Partial<UseSearchStoreProps>) => ({
        recentSearchQuery: state.recentSearchQuery,
      }) as Partial<UseSearchStoreProps>,
    },
  ),
);
