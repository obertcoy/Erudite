import { create } from 'zustand';

export enum FeedFilterState {
  Hot = 0,
  Trending = 1,
  Fresh = 2,
}

export interface UseFeedFilterState {
  filter: FeedFilterState;
  setFilter: (filter: FeedFilterState) => void;
}

export const useFeedFilter = create<UseFeedFilterState>((set) => ({
  filter: FeedFilterState.Hot,
  setFilter: (filter) => set({ filter }),
}));
